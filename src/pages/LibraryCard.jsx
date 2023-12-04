import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const LibraryCard = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(true);
  const [timerVisible, setTimerVisible] = useState(false);
  const [timer, setTimer] = useState(7200); // 2 hours in seconds
  const [timerIntervalId, setTimerIntervalId] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleLeaveReturn = () => {
    setIsLeaving(!isLeaving);
    setTimerVisible(false);
    clearTimer();
  };

  const handleLeave = () => {
    toggleLeaveReturn();
    toggleModal();
    if (isLeaving) {
      setTimerVisible(true);
      startTimer();
    } else {
      resetTimer();
    }
  };
  
  const resetTimer = () => {
    setTimer(7200);
    setTimerVisible(false);
    clearTimer();
  };

  const handleCheckOut = () => {
    toggleLeaveReturn();
    toggleModal();
  };

  const startTimer = () => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    setTimerIntervalId(intervalId);
  };

  const clearTimer = () => {
    clearInterval(timerIntervalId);
    setTimerIntervalId(null);
  };

  useEffect(() => {
    if (timer === 0) {
      setTimerVisible(false);
      clearTimer();
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>도서관 모바일 이용증 페이지</Text>

      <TouchableOpacity onPress={toggleModal} style={styles.button}>
        <Text style={styles.buttonText}>QR</Text>
      </TouchableOpacity>

      {timerVisible && <Text style={styles.timerText}>복귀 예정 시간: {formatTime(timer)}</Text>}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleLeave} style={styles.modalButton}>
              <Text style={styles.buttonText}>{isLeaving ? '외출' : '복귀'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCheckOut} style={styles.modalButton}>
              <Text style={styles.buttonText}>퇴실</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    fles: 1,
    backgroundColor: 'rgb(91,91,91)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 250,
  },
  modalButton: {
    backgroundColor: 'rgb(51,51,51)',
    padding: 20,
    borderRadius: 5,
    marginTop: 10,
    width: 150,
  },
  closeButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  timerText: {
    marginTop: 20,
    fontSize: 26,
    color: 'gray',
  },
});

export default LibraryCard;
