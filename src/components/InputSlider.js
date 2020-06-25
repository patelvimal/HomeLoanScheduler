import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input, Slider} from 'react-native-elements';

const InputSlider = props => {
  const {min, max, step, defaultValue, marks, suffix, name} = props;
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
        <Input
          value={value}
          placeholder=""
          keyboardType="numeric"
          onChangeText={handleInputChange}
          style={styles.input}
        />
      </View>
      <View style={styles.sliderRoot}>
        <Slider
          value={value}
          onValueChange={handleSliderChange}
          minimumValue={min}
          maximumValue={max}
          step={step}
          trackStyle={styles.track}
          slider={styles.slider}
          thumbTouchSize={styles.thumb}
          thumbTintColor='#fff'
          thumbStyle={styles.thumbStyle}
        />
        <Text>hellos: {value}</Text>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  label: {
    padding: 6,
    marginTop: 4,
    fontSize: 20,
  },
  input: {
    padding: 8,
    fontSize: 18,
    width: 8,
  },
  sliderRoot: {
    padding: 6,
  },
  track: {
    padding:4,
    borderRadius:50,
    borderColor:'red',
    borderWidth:5,
    backgroundColor:'#fff',
    color: '#fff'
  },
  slider:{
    backgroundColor:'darkslateblue',
    color:'darkslateblue'
  },
  thumb:{
    width: 4000, height: 4000
  },
  thumbStyle : {
    backgroundColor:'#fff',
    padding:12,
    borderStyle:'solid',
    borderColor:'#4d4d4d',
    borderWidth:2,
    marginTop:2,
    borderRadius:100
  }
});

export default InputSlider;
