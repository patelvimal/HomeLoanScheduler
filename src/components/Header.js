import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const AppBar = () => {
	return (
		<View>
			<Header
				leftComponent={{ icon: 'menu', color: '#fff'}}
				centerComponent={<AppTitle/>}
				containerStyle={{
					backgroundColor: 'darkslateblue',
					justifyContent: 'space-around',
				}}
			/>
		</View>
	)
}

const AppTitle = ()=> {
	return (
		<Text style={styles.title}>Home Loan EMI Calculator</Text>
	)
}

const styles = StyleSheet.create({
	title : {
		color:'#fff',
		fontSize:18
	}
})
export default AppBar;