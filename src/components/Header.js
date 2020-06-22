import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const Menu = () => {
    return(
        <Icon name='menu'/>
    )
}

const AppBar = () => {
	return (
		<View>
			<Header
				leftComponent={<Menu/>}
				centerComponent={{ text: 'Home Loan EMI Calculator asd', style: { color: '#fff' } }}
  				rightComponent={{ icon: 'home', color: '#fff' }}
			/>
		</View>
	)
}

export default AppBar;