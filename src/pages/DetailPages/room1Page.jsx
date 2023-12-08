import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button, } from 'react-native';
import { useSeatControl } from './SeatControl';
import * as Location from 'expo-location';

const Room1 = () => {
  const seatsPerRow = 6;
  const totalRows = 7;

  const {room1Seats,setRoom1Seats,selectedSeatInfo,setSelectedSeatInfo,selectedSeat,setSelectedSeat,} = useSeatControl();
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [seatNumberInput, setSeatNumberInput] = useState('');
  const [reportReasonInput, setReportReasonInput] = useState('');
  const [location, setLocation] = useState(null);
  const [remainingTimes, setRemainingTimes] = useState(Array(totalRows * seatsPerRow).fill(null));
  const [remainingTimeModalVisible, setRemainingTimeModalVisible] = useState(false);
  const [timer, setTimer] = useState(null);
  const [showExtensionButton, setShowExtensionButton] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  useEffect(() => {
    // 위치 권한 요청
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('위치 권한이 거부되었습니다.');
        return;
      }

      // 위치 정보 가져오기
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const targetRegion = {
    latitude: 37.239522, // 위도
    longitude: 127.083350, // 경도
  };

  const isOutsideTargetRegion =
    location &&
    (location.coords.latitude < targetRegion.latitude - 0.001 ||
      location.coords.latitude > targetRegion.latitude + 0.001 ||
      location.coords.longitude < targetRegion.longitude - 0.001 ||
      location.coords.longitude > targetRegion.longitude + 0.001);

  const startTimer = () => {
    setTimer(1 * 60 * 60); // 1 hour in seconds
  };

  const resetTimer = () => {
    setTimer(null);
    setShowExtensionButton(false);
  };

  useEffect(() => {
    let interval;
    if (timer !== null) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            setShowExtensionButton(prevTimer <= 59 * 60);
            if (prevTimer === 59 * 60) {
              setShowWarningModal(true);
            }
            return prevTimer - 1;
          } else {
            return null;
          }
        });
      }, 1000);
    }
  
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      resetTimer();
      setSelectedSeatInfo(null);
      setSelectedSeat(null);
    }
  }, [timer]);

  const handleSeatReservation = (index) => {
    if (selectedSeat === null && !room1Seats[index]) {
      const updatedSeats = [...room1Seats];
      updatedSeats[index] = true;
      setRoom1Seats(updatedSeats);
      setSelectedSeatInfo({ room: '제 1열람실', seat: index + 1 });
      setSelectedSeat(index);
      startTimer(); // Start the timer when a seat is reserved
    } else if (selectedSeat === index) {
      const updatedSeats = [...room1Seats];
      updatedSeats[index] = false;
      setRoom1Seats(updatedSeats);
      resetTimer(); // Reset the timer when the reservation is canceled
      setSelectedSeatInfo(null);
      setSelectedSeat(null);
    }
  };

  const handleReport = () => {
    setReportModalVisible(true);
  };

  const handleReportConfirmation = () => {
    console.log('Seat Number:', seatNumberInput);
    console.log('Report Reason:', reportReasonInput);
    setReportModalVisible(false);
  };

  const handleRemainingTime = () => {
    setRemainingTimeModalVisible(true);
  };

  const handleCloseRemainingTimeModal = () => {
    setRemainingTimeModalVisible(false);
  };

  const handleExtension = () => {
    startTimer(); // Reset the timer to 1 hour
    setShowExtensionButton(false); // Hide the extension button
  };

  const renderRemainingTimeModal = () => {
    if (showWarningModal) {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.Time_modalContent}>
              <Text>잔여시간이 59분 이하입니다.</Text>
              <Button title="확인" onPress={() => setShowWarningModal(false)} />
            </View>
          </View>
        </Modal>
      );
    } else {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={remainingTimeModalVisible}
        >
          <View style={styles.modalContainer}>
            <View style={styles.Time_modalContent}>
              <Text style={{fontSize: 20}}>잔여 시간</Text>
                <View style={styles.remainingTimeRow}>
                  <Text>13번:</Text>
                  <Text>2분 04초</Text>
                </View>
                <View style={styles.remainingTimeRow}>
                  <Text>7번:</Text>
                  <Text>3분 40초</Text>
                </View>
                <View style={styles.remainingTimeRow}>
                  <Text>32번:</Text>
                  <Text>14분 27초</Text>
                </View>
                <View style={styles.remainingTimeRow}>
                  <Text>23번:</Text>
                  <Text>17분 25초</Text>
                </View>
                <View style={styles.remainingTimeRow}>
                  <Text>19번:</Text>
                  <Text>21분 34초</Text>
                </View>
              <Button title="닫기" onPress={handleCloseRemainingTimeModal} />
            </View>
          </View>
        </Modal>
      );
    }
  };

  const renderSeats = () => {
    const seatRows = [];
    for (let i = 0; i < totalRows; i++) {
      const seatRow = [];
      for (let j = 0; j < seatsPerRow; j++) {
        const index = i * seatsPerRow + j;
        seatRow.push(
          <TouchableOpacity
            key={index}
            style={[
              styles.seatContainer,
              { backgroundColor: room1Seats[index] ? 'red' : 'green' },
            ]}
            onPress={() => handleSeatReservation(index)}
            disabled={selectedSeat !== null && selectedSeat !== index}
          >
            <Text style={styles.seatNumber}>{index + 1}</Text>
            <Text style={styles.reservationText}>
              {room1Seats[index] ? '예약 취소' : '예약'}
            </Text>
          </TouchableOpacity>
        );
      }
      seatRows.push(
        <View key={i} style={styles.seatRow}>
          {seatRow}
        </View>
      );
    }
    return seatRows;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.reportButton} onPress={handleReport}>
        <Text style={styles.reportButtonText}>신고</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.timeButton} onPress={handleRemainingTime}>
        <Text style={styles.timeButtonText}>좌석별 잔여시간</Text>
      </TouchableOpacity>

      <Text style={styles.title}>제 1열람실</Text>
      {renderSeats()}
      {renderRemainingTimeModal()}
      {timer !== null && (
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {`잔여시간: ${Math.floor(timer / 3600)}시간 ${Math.floor(
              (timer % 3600) / 60
            )}분 ${timer % 60}초`}
          </Text>
          {showExtensionButton && (
            <TouchableOpacity style={styles.extensionButton} onPress={handleExtension}>
              <Text style={styles.extensionButtonText}>연장</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={reportModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>좌석 번호:</Text>
            <TextInput
              style={styles.input}
              value={seatNumberInput}
              onChangeText={(text) => setSeatNumberInput(text)}
            />

            <Text>신고 이유:</Text>
            <TextInput
              style={styles.input}
              value={reportReasonInput}
              onChangeText={(text) => setReportReasonInput(text)}
            />

            <Button title="확인" onPress={handleReportConfirmation} />
          </View>
        </View>
      </Modal>

      {isOutsideTargetRegion && selectedSeatInfo !== null && (
        <View style={styles.warning_wrap}>
          <Text style={styles.warning}>도서관을 벗어났습니다!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  seatContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 8,
    margin: 2,
  },
  seatNumber: {
    fontSize: 18,
    color: 'white',
  },
  reservationText: {
    fontSize: 12,
    color: 'white',
  },
  seatRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reportButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
  },
  reportButtonText: {
    fontSize: 16,
    color: 'white',
  },
  timeButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 8,
  },
  timeButtonText: {
    fontSize: 16,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  warning_wrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  warning: {
    color: 'red',
    fontSize: 30,
  },
  Time_modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '60%',
  },
  remainingTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 3,
  },
  timerContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  timerText: {
    fontSize: 20,
    color: 'black',
  },
  extensionButton: {
    width: 100,
    alignItems: 'center',
    backgroundColor: 'black',
    marginTop: 20,
    borderRadius: 5,
  },
  extensionButtonText: {
    fontSize: 20,
    color: 'white',
    padding: 10,
  }
});

export default Room1;
