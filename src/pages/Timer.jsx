import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

// 사용자 정의 Hook
const useCounter = (initialValue, ms) => {
  const [count, setCount] = useState(initialValue);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setCount((c) => c - 1); // decrement by 1 second
    }, ms);
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const reset = useCallback(() => {
    setCount(initialValue);
    stop();
  }, [initialValue, stop]);

  return { count, start, stop, reset };
};

export default function SetTimer() {
  // 시, 분, 초를 state로 저장
  const [currentHours, setCurrentHours] = useState(2); // start with 2 hours
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const { count, start, stop, reset } = useCounter(2 * 3600, 1000); // 2 hours in seconds

  // 타이머 기능
  const timer = () => {
    const checkMinutes = Math.floor(count / 60);
    const hours = Math.floor(count / 3600);
    const minutes = checkMinutes % 60;
    const seconds = count % 60;
    setCurrentHours(hours);
    setCurrentMinutes(minutes);
    setCurrentSeconds(seconds);
  };

  // count의 변화에 따라 timer 함수 랜더링
  useEffect(timer, [count]);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        {currentHours < 10 ? `${currentHours}` : currentHours}:
        {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}:
        {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
      </Text>
      <Button title="Start" onPress={start} />
      <Button title="Stop" onPress={stop} />
      <Button title="Reset" onPress={reset} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 44,
    marginBottom: 20,
  },
});
