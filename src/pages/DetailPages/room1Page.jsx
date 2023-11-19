import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSeatControl } from './SeatControl';

const Room1 = () => {
  const seatsPerRow = 6;
  const totalRows = 7;

  const { seats, setSeats } = useSeatControl();
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatReservation = (index) => {
    if (selectedSeat === null) {
      const updatedSeats = [...seats];
      updatedSeats[index] = !updatedSeats[index];
      setSeats(updatedSeats);
      setSelectedSeat(index);
    } else if (selectedSeat === index) {
      const updatedSeats = [...seats];
      updatedSeats[index] = !updatedSeats[index];
      setSeats(updatedSeats);
      setSelectedSeat(null);
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
              { backgroundColor: seats[index] ? 'red' : 'green' },
            ]}
            onPress={() => handleSeatReservation(index)}
            disabled={selectedSeat !== null && selectedSeat !== index}
          >
            <Text style={styles.seatNumber}>{index + 1}</Text>
            <Text style={styles.reservationText}>
              {seats[index] ? '예약 취소' : '예약'}
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
      <Text style={styles.title}>제 1열람실</Text>
      {renderSeats()}
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
});

export default Room1;
