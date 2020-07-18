import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppTitle from '../components/AppTitle';

const AppBar = (props) => {
  return (
    <View>
      <Header
        leftComponent={
          <Hamburger onHamburgerClick={() => props.onHamburgerClick()} />
        }
        centerComponent={<AppTitle />}
        containerStyle={{
          backgroundColor: 'darkslateblue',
          justifyContent: 'center',
          height:60,
          paddingBottom:20
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

export default AppBar;
