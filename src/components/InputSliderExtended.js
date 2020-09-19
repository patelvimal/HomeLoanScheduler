import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Input, Slider } from 'react-native-elements';
import Marker from './Marker';
import RupeeIcon from './RupeeIcon';
import { useEffect } from 'react';

const InputSliderExtended = props => {
	const { min, max, step, value, markers, name, maxLength, removeValidation } = props;
	const [inputValue, setValue] = React.useState(value || 0);
	const [sliderValue, setSliderValue] = React.useState(value || 0);
	const integerRegex = /^((?:|1|[1-9]\d?|100)?)$/;
	const decimalRegex = /^((?:|1|[1-9]\d?|100)(?:\.\d{0,2})?)$/;
	const regex = props.type == 'Decimal' ? decimalRegex : decimalRegex;

	const handleSliderChange = value => {
		updateValue(value);
	};

	const handleInputChange = value => {
		if (isNumeric(value)){
			updateValue(value);
		}
	};

	const isNumeric = input => {
		var rgx = /^[0-9]*\.?[0-9]*$/;
		return input.match(rgx);
	}

	useEffect(() => {
		const numericValue = stripThousandSeperator(inputValue);
		const newVal = isNumber(numericValue) ? numericValue : 0;
		setSliderValue(Number(newVal));
	}, [inputValue])


	useEffect(() => {
		const numericValue = stripThousandSeperator(value);
		const formattedValue = addThousandSeperator(numericValue);
		const newVal = isNumber(numericValue) ? numericValue : 0;
		setValue(formattedValue);
		setSliderValue(Number(newVal));
	}, [value])


	const onBlur = () => {
		const numericValue = stripThousandSeperator(inputValue);
		if (numericValue === '' || (numericValue >= min && numericValue <= max)) {
			const formattedValue = addThousandSeperator(numericValue);
			updateValue(formattedValue);
		}
		else {
			removeValidation ? updateValue(numericValue): updateValue(max);
		}

	}

	const updateValue = (value) => {
		const numericValue = stripThousandSeperator(value);
		const newValue = addThousandSeperator(numericValue);
		setValue(newValue);
		invokeCallback(numericValue);
	}

	const invokeCallback = newValue => {
		if (props.onChange && typeof props.onChange === 'function') {
			props.onChange(name, Number(newValue));
		}
	};

	const isNumber = n => {
		return n != '' && typeof n != 'boolean' && !isNaN(n);
	};

	const addThousandSeperator = input => {
		return input.toString().replace(/(\d)(?=(\d{2})+[0-9]$)/g, '$1,');
	}

	const stripThousandSeperator = input => {
		return input.toString().replace(/,/gi,'');
	}

	return (
		<React.Fragment>
			<View style={styles.root}>
				<Text style={styles.label}>{props.label}</Text>
				<View style={styles.inputContainer}>
					{props.icon}
					<Input
						value={String(inputValue)}
						placeholder=""
						keyboardType="numeric"
						onBlur={onBlur}
						maxLength={maxLength || 11}
						errorStyle={styles.errorStyle}
						onChangeText={handleInputChange}
						inputContainerStyle={styles.input}
					/>
				</View>
			</View>
			<View style={sliderStyle.sliderRoot}>
				<Slider
					value={sliderValue}
					onValueChange={handleSliderChange}
					minimumValue={min}
					maximumValue={max}
					step={step}
					trackStyle={sliderStyle.track}
					thumbTintColor="#fff"
					thumbStyle={sliderStyle.thumbStyle}
					maximumTrackTintColor="#64b3ef"
					minimumTrackTintColor="darkslateblue"
				/>
				<Marker values={markers} />
			</View>
		</React.Fragment>
	);
};


const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		marginTop: 10,
		borderWidth: 0,
		borderColor: 'red',
	},
	label: {
		padding: 6,
		marginTop: 4,
		fontSize: 16,
	},
	inputContainer: {
		marginLeft: 40,
		flexDirection: 'row',
		position: 'absolute',
		right: 0
	},
	input: {
		borderWidth: 1,
		borderColor: 'grey',
		borderRadius: 5,
		padding: 0,
		width: 110,
		height: 44
	},
	errorStyle: {
		display: 'none',
	},
});


const sliderStyle = StyleSheet.create({
	sliderRoot: {
		padding: 6,
		borderWidth: 0,
		borderColor: 'lightgrey',
	},
	track: {
		padding: 4,
		borderRadius: 50,
		backgroundColor: '#fff',
		color: '#fff',
	},
	thumbStyle: {
		backgroundColor: '#fff',
		padding: 12,
		borderStyle: 'solid',
		borderColor: '#209ddb',
		borderWidth: 2,
		marginTop: 2,
		borderRadius: 100,
	}
})
export default InputSliderExtended;
