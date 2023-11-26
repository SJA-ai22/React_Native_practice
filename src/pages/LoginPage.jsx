import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const LoginPage = ({ navigation }) => {
  const [infoId, setInfoId] = useState('');
  const [password, setPassword] = useState('');

  const infoIdCheck = (id) => {
    return id !== '' && id.length >= 5;
  };

  const passwordCheck = (pw) => {
    // Your existing password validation logic remains the same
    const regex = /^[A-Za-z0-9`~!@#\$%\^&*(){}[\]_=\+\\|;:'"<>,./?]{5,20}$/;
    return pw !== '' && pw !== 'undefined' && regex.test(pw);
  };

  const buttonStyle = infoIdCheck(infoId) && passwordCheck(password)
    ? { color: 'black', fontSize: 17, backgroundColor: '#9EA4AA', padding: 10 }
    : { color: 'gray', fontSize: 17, backgroundColor: '#9EA4AA', padding: 10 };

  const handleLogin = () => {
    if (infoIdCheck(infoId) && passwordCheck(password)) {
      navigation.navigate('HomePage');
    } else {
      alert('로그인 실패');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <TextInput
        style={styles.input}
        placeholder="인포 ID"
        value={infoId}
        onChangeText={setInfoId}
      />
      <View style={styles.warning}>
        {infoIdCheck(infoId) ? (
          <Text style={{ color: 'green' }}>ID 형식이 올바릅니다</Text>
        ) : (
          <Text style={{ color: 'red' }}>올바른 ID를 입력해주세요.</Text>
        )}
      </View>
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.warning}>
        {passwordCheck(password) ? (
          <Text style={{ color: 'green' }}>비밀번호 형식이 올바릅니다</Text>
        ) : (
          <Text style={{ color: 'red' }}>비밀번호 형식이 올바르지 않습니다.</Text>
        )}
      </View>
      <TouchableOpacity style={styles.submit_wrap} onPress={handleLogin}>
        <Text style={[styles.submit_btn, buttonStyle]}>확인</Text>
      </TouchableOpacity>
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
    fontSize: 30,
    marginBottom: 30,
  },
  input: {
    height: 40,
    width: '60%',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 12,
    padding: 8,
  },
  warning: {
    marginBottom: 20,
  },
  submit_wrap: {
    width: 100,
  },
  submit_btn: {
    textAlign: 'center',
  }
});

export default LoginPage;
