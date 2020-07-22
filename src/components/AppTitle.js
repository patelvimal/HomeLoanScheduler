import React from 'react';
import { StyleSheet, Text } from 'react-native';

const AppTitle = () => {
  return <Text style={styles.title}>Home Loan Scheduler</Text>;
};

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 21,
  },
});

export default AppTitle;
