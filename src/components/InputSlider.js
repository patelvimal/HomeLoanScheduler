import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Input, Slider} from 'react-native-elements';
import Marker from './Marker';
import RupeeIcon from './RupeeIcon';

const InputSlider = props => {
  const {min, max, step, defaultValue, markers, suffix, name} = props;
  const [value, setValue] = React.useState(defaultValue || 0);
  const integerRegex = /^((?:|1|[1-9]\d?|100)?)$/;
  const decimalRegex = /^((?:|1|[1-9]\d?|100)(?:\.\d{0,2})?)$/;
  const regex = props.type == 'Decimal' ? decimalRegex : integerRegex;

  const handleSliderChange = value => {
    setValue(value);
    invokeCallback(value);
  };

  const handleInputChange = textValue => {
    setValue(textValue);
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
        <View style={styles.inputContainer}>
          <RupeeIcon />
          <Input
            value={value}
            placeholder=""
            keyboardType="numeric"
            errorStyle={styles.errorStyle}
            onChangeText={handleInputChange}
            inputContainerStyle={styles.input}
          />
        </View>
      </View>
      <View style={sliderStyle.sliderRoot}>
        <Slider
          value={value}
          onValueChange={handleSliderChange}
          minimumValue={min}
          maximumValue={max}
          step={step}
          trackStyle={sliderStyle.track}
          thumbTintColor="#fff"
          thumbStyle={sliderStyle.thumbStyle}
          maximumTrackTintColor="#64b3ef"
          minimumTrackTintColor="#209ddb"
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
    marginTop: 2,
    fontSize: 20,
  },
  inputContainer:{
    marginLeft:45,
    flexDirection:'row',
    position:'absolute',
    right:0
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    padding: 0,
    width: 90,
    height:44
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
export default InputSlider;
