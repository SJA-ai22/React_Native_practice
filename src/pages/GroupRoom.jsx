import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const GroupRoom = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const studyRooms = Array.from({ length: 6 }, (_, index) => index + 1);
  const timeSlots = Array.from({ length: 22 * 2 }, (_, index) => index * 30 + 13 * 60); // 13:00부터 24:00까지 30분 간격으로 22개의 슬롯

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>그룹 스터디실 예약</Text>

      <ScrollView horizontal>
        <View style={styles.roomContainer}>
          {studyRooms.map((room) => (
            <TouchableOpacity
              key={room}
              style={[styles.roomButton, selectedRoom === room && styles.selectedRoom]}
              onPress={() => handleRoomSelection(room)}
            >
              <Text style={styles.roomText}>{room}실</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ScrollView horizontal>
        <View style={styles.timeContainer}>
          {timeSlots.map((time) => (
            <TouchableOpacity
              key={time}
              style={[styles.timeButton, selectedTime === time && styles.selectedTime]}
              onPress={() => handleTimeSelection(time)}
            >
              <Text style={styles.timeText}>{`${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Text style={styles.selectedInfo}>
        {selectedRoom && selectedTime && `선택된 스터디실: ${selectedRoom}실, 선택된 시간: ${Math.floor(selectedTime / 60)}시 ${selectedTime % 60}분`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  roomContainer: {
    flexDirection: 'row',
  },
  roomButton: {
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    height: 50,
  },
  selectedRoom: {
    backgroundColor: 'lightblue',
  },
  roomText: {
    fontSize: 18,
  },
  timeContainer: {
    flexDirection: 'row',
  },
  timeButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 100,
  },
  selectedTime: {
    backgroundColor: 'lightgreen',
  },
  timeText: {
    fontSize: 16,
  },
  selectedInfo: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default GroupRoom;