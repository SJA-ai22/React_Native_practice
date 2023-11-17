import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LibraryCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>도서관 모바일 이용증 페이지</Text>
      {/* Add your content for the LibraryCard page */}
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

export default LibraryCard;
