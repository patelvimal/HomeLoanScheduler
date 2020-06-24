import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input, Slider} from 'react-native-elements';

const InputSlider = props => {
  const {min, max, step, defaultValue, marks, suffix, name} = props;
  const [value, setValue] = React.useState(defaultValue || 0);
  const integerRegex = /^((?:|1|[1-9]\d?|100)?)$/;
  const decimalRegex = /^((?:|1|[1-9]\d?|100)(?:\.\d{0,2})?)$/;
  const regex = props.type == 'Decimal' ? decimalRegex : integerRegex;

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    invokeCallback(newValue);
  };

  const handleInputChange = event => {
	const {value} = event.target;
	setValue('asdasdasdasdasdasd');
    // if (value === '' || (regex.test(value) && (value >= min && value <= max))) {
    //   const newValue =
    //     value === ''
    //       ? ''
    //       : value.indexOf('.') == value.length - 1
    //       ? value
    //       : Number(value);
    //   setValue(newValue);
    //   invokeCallback(newValue);
    // }
  };

  const invokeCallback = newValue => {
    if (props.onChange && typeof props.onChange === 'function') {
      props.onChange(name, newValue);
    }
  };

  return (
    <React.Fragment>
      <View style={styles.root}>
        <Text style={styles.label}>{props.label}</Text>
        <Input placeholder="" type="number" onChange={handleInputChange} style={styles.input} />
      </View>
      <View>
        <Slider value={50} onValueChange={value => setValue({value})} />
        <Text>hello: {value}</Text>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
	root:{
		flexDirection:'row'
	},
	label: {
		padding: '6px 0',
		marginTop: 4,
		fontSize: 20
	},
	input: {
		padding: '8px',
		fontSize: 18,
		width: 80,
	}
});

export default InputSlider;
