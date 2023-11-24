import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ReservationPage = ({ navigation }) => {
    const handle_Reservation1 = () => {
      navigation.navigate('room1');
    };
    const handle_Reservation2 = () => {
        navigation.navigate('room2');
    };
    const handle_Reservation3 = () => {
      navigation.navigate('room3');
    };
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>열람실 좌석 예약</Text>
        <Button title="제 1열람실" onPress={handle_Reservation1} />
        <Button title="제 2열람실" onPress={handle_Reservation2} />
        <Button title="제 3열람실" onPress={handle_Reservation3} />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 100,
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
    },
    room: {
      width: 200,
      height: 120,
    },
    room_btn: {
      textAlign: 'center',
    }
  });

  export default ReservationPage;