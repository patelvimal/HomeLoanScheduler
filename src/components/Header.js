import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AppBar = (props) => {
  return (
    <View>
      <Header
        leftComponent={
          <Hamburger onHamburgerClick={() => props.onHamburgerClick()} />
        }
        //leftComponent={{ icon: 'menu', color: '#fff'}}
        centerComponent={<AppTitle />}
        containerStyle={{
          backgroundColor: 'darkslateblue',
          justifyContent: 'space-around',
        }}
      />
    </View>
  );
};

const Hamburger = (props) => {
 
  const onHamburgerClick = () => {props.onHamburgerClick()};
  return <Icon name="menu" color="#fff" size={30} onPress={onHamburgerClick} containerStyle={style.icon}/>;
};

const style = StyleSheet.create({
	icon : {
		fontSize:44,

	}
});

const AppTitle = () => {
  return <Text style={styles.title}>Home Loan EMI Calculator</Text>;
};

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 18,
  },
});
export default AppBar;
