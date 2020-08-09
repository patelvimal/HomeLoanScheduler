import React from 'react';
import {Text, StyleSheet} from 'react-native';

const RupeeIconWithText = ({ style, text }) => {
  const message = `${text} \u20B9`;
  return <Text style={style ? style : styles.root}>{message}</Text>;
};

const styles = StyleSheet.create({
    root : {
        fontSize:22,
        marginTop:6,
        color:'grey'
    }
});
export default RupeeIconWithText;
