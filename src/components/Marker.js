import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Marker = props => {
  return (
    <View style={styles.marker}>
      {props.values.map((item,index) => {
        return <Text key={index} style={styles.markerItem}>{item.label}</Text>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  marker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  markerItem: {
    padding: 1,
    flex: 1,
    color:'#4d4d4d',
    fontSize:12
  },
});

export default Marker;
