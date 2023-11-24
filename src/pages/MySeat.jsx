import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSeatControl } from './DetailPages/SeatControl';

const MySeat = () => {
  const { seats } = useSeatControl();
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    const reservedSeatIndex = seats.findIndex((seat) => seat);
    setSelectedSeat(reservedSeatIndex !== -1 ? reservedSeatIndex + 1 : null);
  }, [seats]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 자리 페이지</Text>
      {selectedSeat !== null && <Text>선택한 자리 번호: {selectedSeat}</Text>}
      {selectedSeat === null && <Text>예약한 자리가 없습니다.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
});

export default MySeat;