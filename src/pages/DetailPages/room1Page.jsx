import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { useSeatControl } from './SeatControl';

const Room1 = () => {
  const seatsPerRow = 6;
  const totalRows = 7;

  const { room1Seats, setRoom1Seats, selectedSeatInfo, setSelectedSeatInfo, selectedSeat, setSelectedSeat } = useSeatControl();
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [seatNumberInput, setSeatNumberInput] = useState('');
  const [reportReasonInput, setReportReasonInput] = useState('');

  const handleSeatReservation = (index) => {
    if (selectedSeat === null) {
      const updatedSeats = [...room1Seats];
      updatedSeats[index] = !updatedSeats[index];
      setRoom1Seats(updatedSeats);
      setSelectedSeatInfo({ room: '제 1열람실', seat: index + 1 });
      setSelectedSeat(index);
    } 
    else if (selectedSeat === index) {
      const updatedSeats = [...room1Seats];
      updatedSeats[index] = !updatedSeats[index];
      setRoom1Seats(updatedSeats);
      setSelectedSeatInfo(null);
      setSelectedSeat(null);
    }
    console.log(selectedSeat);
    console.log(selectedSeatInfo);
  };

  const handleReport = () => {
    setReportModalVisible(true);
  };

  const handleReportConfirmation = () => {
    // Handle the report confirmation logic here
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

      <Text style={styles.title}>제 1열람실</Text>
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
});

export default Room1;
