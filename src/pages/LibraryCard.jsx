import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const LibraryCard = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLeave = () => {
    // 외출 버튼 눌렀을 때 실행되는 로직
    toggleModal();
  };

  const handleCheckOut = () => {
    // 퇴실 버튼 눌렀을 때 실행되는 로직
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>도서관 모바일 이용증 페이지</Text>

      <TouchableOpacity onPress={toggleModal} style={styles.button}>
        <Text style={styles.buttonText}>QR</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleLeave} style={styles.modalButton}>
              <Text style={styles.buttonText}>외출</Text>
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
});

export default LibraryCard;
