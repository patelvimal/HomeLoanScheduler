import React from 'react';
import { StyleSheet, Text } from 'react-native';

const AppTitle = () => {
  return <Text style={styles.title}>Home Loan EMI Calculator</Text>;
};

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 17,
  },
});

export default AppTitle;
