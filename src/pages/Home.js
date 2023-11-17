import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomePage = ({ navigation }) => {
  const handleSeatReservation = () => {
    navigation.navigate('ReservePage');
  };

  const handleMyPlace = () => {
    navigation.navigate('MySeat');
  };

  const handleLibraryCard = () => {
    navigation.navigate('LibraryCard');
  };

  const handleAnnouncements = () => {
    // 공지사항 페이지로 이동
    // navigation.navigate('Announcements');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>홈페이지</Text>
      <Button title="열람실 좌석 예약" onPress={handleSeatReservation} />
      <Button title="내 자리" onPress={handleMyPlace} />
      <Button title="도서관 모바일 이용증" onPress={handleLibraryCard} />
      <Button title="공지사항" onPress={handleAnnouncements} />
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

export default HomePage;
