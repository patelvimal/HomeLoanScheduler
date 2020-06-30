import React from 'react';
import {Text, StyleSheet} from 'react-native';

const RupeeIcon = props => {
  return <Text style={styles.root}>{'\u20B9'}</Text>;
};

const styles = StyleSheet.create({
    root : {
        fontSize:22,
        marginTop:6,
        color:'grey'
    }
});
export default RupeeIcon;
