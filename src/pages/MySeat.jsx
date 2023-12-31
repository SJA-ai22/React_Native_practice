import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSeatControl } from './DetailPages/SeatControl';

const MySeat = () => {
  const { selectedSeatInfo } = useSeatControl();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 자리 페이지</Text>
      {selectedSeatInfo !== null && <Text style={styles.info}>예약한 자리: {selectedSeatInfo.room}, {selectedSeatInfo.seat}번</Text>}
      {selectedSeatInfo === null && <Text style={styles.info}>예약한 자리가 없습니다.</Text>}
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
  info: {
    fontSize: 18,
    marginBottom: 30
  }
});

export default MySeat;
