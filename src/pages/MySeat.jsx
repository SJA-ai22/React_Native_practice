import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MySeat = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 자리 페이지</Text>
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
