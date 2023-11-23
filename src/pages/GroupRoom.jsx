import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const GroupRoom = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const studyRooms = Array.from({ length: 6 }, (_, index) => index + 1);
  // 13:00부터 24:00까지 30분 간격으로 23개의 슬롯
  const timeSlots = Array.from({ length: 23 }, (_, index) => index * 30 + 13 * 60);

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
  };

  const handleTimeSelection = (time) => {
    const selectedIndex = timeSlots.indexOf(time);
    if (!selectedRoom) {
      alert('스터디실을 먼저 선택하세요.');
      return;
    }
    else{
      if (selectedIndex !== -1) {
        if (selectedTime && selectedTime.length > 0) {
          const start = selectedTime[0];
          const end = time;
          if (selectedTime[0] === time) {
            setSelectedTime(null);
          } 
          if (end > start) {
            const range = timeSlots.slice(timeSlots.indexOf(start), timeSlots.indexOf(end) + 1);

            if (range.length <= 6) {
                setSelectedTime(range);
            } 
            else {
              alert('최대 3시간만 선택 가능합니다.');
            }
          } 
          else {
            alert('시작 시간보다 나중 시간을 선택하세요.');
          }
        } else {
          setSelectedTime([time]);
        }
      }
    }
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
              style={[styles.timeButton, selectedTime && selectedTime.includes(time) && styles.selectedTime]}
              onPress={() => handleTimeSelection(time)}>
              <Text style={styles.timeText}>{`${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Text style={styles.selectedInfo}>
        {selectedRoom && selectedTime &&  `스터디실: ${selectedRoom}실,  예약 시간: ${Math.floor(selectedTime[0] / 60)}시 ${selectedTime[0] % 60}분 - ${Math.floor(selectedTime[selectedTime.length - 1] / 60)}시 ${selectedTime[selectedTime.length - 1] % 60}분`}
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