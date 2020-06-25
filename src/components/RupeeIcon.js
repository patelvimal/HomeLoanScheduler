import React from 'react';
import {Text, StyleSheet} from 'react-native';

const RupeeIcon = props => {
  return <Text style={styles.root}>{'\u20B9'}</Text>;
};

const styles = StyleSheet.create({
    root : {
        fontSize:30,
        marginTop:2
    }
});
export default RupeeIcon;
