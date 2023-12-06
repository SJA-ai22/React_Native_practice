import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { useSeatControl } from './SeatControl';
import * as Location from 'expo-location';

const Room2 = () => {
  const seatsPerRow = 6;
  const totalRows = 5;

  const { room2Seats, setRoom2Seats, selectedSeatInfo, setSelectedSeatInfo, selectedSeat, setSelectedSeat } = useSeatControl();
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [seatNumberInput, setSeatNumberInput] = useState('');
  const [reportReasonInput, setReportReasonInput] = useState('');
  const [location, setLocation] = useState(null);

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

  // 도서관 좌표
  const targetRegion = {
    latitude: 37.236816, // 위도
    longitude: 127.073321, // 경도
  };

  // 도서관을 벗어날 때의 조건
  const isOutsideTargetRegion =
    location &&
    (location.coords.latitude < targetRegion.latitude - 0.001 ||
      location.coords.latitude > targetRegion.latitude + 0.001 ||
      location.coords.longitude < targetRegion.longitude - 0.001 ||
      location.coords.longitude > targetRegion.longitude + 0.001);

  const handleSeatReservation = (index) => {
    if (selectedSeat === null) {
      const updatedSeats = [...room2Seats];
      updatedSeats[index] = !updatedSeats[index];
      setRoom2Seats(updatedSeats);
      setSelectedSeatInfo({ room: '제 2열람실', seat: index + 1 });
      setSelectedSeat(index);
    } 
    else if (selectedSeat === index) {
      const updatedSeats = [...room2Seats];
      updatedSeats[index] = !updatedSeats[index];
      setRoom2Seats(updatedSeats);
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
              { backgroundColor: room2Seats[index] ? 'red' : 'green' },
            ]}
            onPress={() => handleSeatReservation(index)}
            disabled={selectedSeat !== null && selectedSeat !== index}
          >
            <Text style={styles.seatNumber}>{index + 1}</Text>
            <Text style={styles.reservationText}>
              {room2Seats[index] ? '예약 취소' : '예약'}
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

      <Text style={styles.title}>제 2열람실</Text>
      {renderSeats()}

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
  warning_wrap:{
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
});

export default Room2;