import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Room1 = () => {
  const [seats, setSeats] = useState(Array(20).fill(false));

  const handleSeatReservation = (index) => {
    const updatedSeats = [...seats];
    updatedSeats[index] = !updatedSeats[index];
    setSeats(updatedSeats);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>제 1열람실</Text>
      {seats.map((isReserved, index) => (
        <View key={index} style={styles.seatContainer}>
          <Text style={styles.seatNumber}>{index + 1}</Text>
          <Button
            title={isReserved ? '예약 취소' : '예약'}
            onPress={() => handleSeatReservation(index)}
          />
        </View>
      ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  seatNumber: {
    fontSize: 18,
  },
});

export default Room1;
