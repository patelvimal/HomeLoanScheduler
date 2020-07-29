import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InputSlider from '../components/InputSlider';
import { Button, ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import RupeeIcon from '../components/RupeeIcon';
import * as Animatable from 'react-native-animatable';

const LoanForm = (props) => {
  const selectedLoanType = props.loanType;
  const LOAN_AMOUNT_DEFAULT_VALUE = 30;
  const MONTHLY_EMI_DEFAULT_VALUE = 50;
  const INTEREST_RATE_DEFAULT_VALUE = 9;
  const LOAN_TENURE_DEFAULT_VALUE = 10;
  const MONTHLY_PREPAYMENT_DEFAULT_VALUE = 0;

  const INITIAL_STATE = {
    loanAmount: LOAN_AMOUNT_DEFAULT_VALUE,
    emi: MONTHLY_EMI_DEFAULT_VALUE,
    interestRate: INTEREST_RATE_DEFAULT_VALUE,
    prePayment: MONTHLY_PREPAYMENT_DEFAULT_VALUE,
    loanTenure: LOAN_TENURE_DEFAULT_VALUE,
    calculateEMI: selectedLoanType == 0 ? true : false,
  };
  const ANIMATION_DURATION = 500;
  const [loanInfo, setLoanInfo] = useState(INITIAL_STATE);

  const loanAmountConfig = { min: 5, max: 100, step: 1 };
  const loanTenureConfig = { min: 5, max: 30, step: 1 };
  const interestRateConfig = { min: 5, max: 20, step: .5 };
  const emiConfig = { min: 10, max: 100, step: 1 };
  const prePaymentConfig ={ min: 0, max: 100, step: 1 };

  const loanAmountMarker = generateMarker('L', loanAmountConfig.min, loanAmountConfig.max);
  const emiAmountMarker = generateMarker('K', emiConfig.min, emiConfig.max);
  const intRateMarker = generateMarker('%', interestRateConfig.min,interestRateConfig.max, 2);
  const loanTenureMarker = generateMarker('y', loanTenureConfig.min,loanTenureConfig.max, 2);
  const prePaymentMarker = generateMarker('K', emiConfig.min, emiConfig.max);

  const onChange = (name, newValue) => {
    setLoanInfo(prevState => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const onSubmit = event => {
    if (props.onFormSubmit && typeof props.onFormSubmit === 'function') {
      props.onFormSubmit(loanInfo);
    }
  };

  const updateLoanType = selectedIndex => {
    setLoanType(selectedIndex);
  }

  return (
    <View style={styles.root}>
      <Animatable.View animation="slideInLeft" useNativeDriver={true} duration={ANIMATION_DURATION}>
        <InputSlider
          label= { selectedLoanType == 0 ? "Loan Amount(In lakhs)" : "Outstanding Loan(In lakhs)"}
          min={loanAmountConfig.min}
          max={loanAmountConfig.max}
          step={loanAmountConfig.step}
          value={LOAN_AMOUNT_DEFAULT_VALUE}
          onChange={onChange}
          name="loanAmount"
          markers={loanAmountMarker}
          icon={<RupeeIcon />}
        />
      </Animatable.View>
      {
        selectedLoanType === 0 ?
          <Animatable.View animation="slideInRight" useNativeDriver={true} duration={ANIMATION_DURATION}>
            <InputSlider
              label="Loan Tenure"
              min={loanTenureConfig.min}
              max={loanTenureConfig.max}
              step={loanTenureConfig.step}
              value={LOAN_TENURE_DEFAULT_VALUE}
              onChange={onChange}
              name="loanTenure"
              icon={<Text style={styles.yearIcon}>Years</Text>}
              markers={loanTenureMarker}
            />
          </Animatable.View> :
          <Animatable.View animation="slideInRight" useNativeDriver={true} duration={ANIMATION_DURATION}>
            <InputSlider
              label="EMI Amount"
              min={emiConfig.min}
              max={emiConfig.max}
              step={emiConfig.step}
              value={MONTHLY_EMI_DEFAULT_VALUE}
              onChange={onChange}
              name="emi"
              icon={<RupeeIcon />}
              markers={emiAmountMarker}
            />
          </Animatable.View>
      }
      <Animatable.View animation="slideInLeft" useNativeDriver={true} duration={ANIMATION_DURATION}>
        <InputSlider
          label="Interest Rate"
          min={interestRateConfig.min}
          max={interestRateConfig.max}
          step={interestRateConfig.step}
          value={INTEREST_RATE_DEFAULT_VALUE}
          onChange={onChange}
          name="interestRate"
          type="Decimal"
          icon={<Text style={styles.interestIcon}>%</Text>}
          markers={intRateMarker}
        />
      </Animatable.View>
      <Animatable.View animation="slideInRight"  useNativeDriver={true} duration={ANIMATION_DURATION}>
        <InputSlider
          label="Additional Payment (monthly)"
          min={prePaymentConfig.min}
          max={prePaymentConfig.max}
          step={prePaymentConfig.step}
          value={MONTHLY_PREPAYMENT_DEFAULT_VALUE}
          onChange={onChange}
          name="prePayment"
          icon={<RupeeIcon />}
          markers={prePaymentMarker}
        />
      </Animatable.View>
      <Animatable.View animation="slideInUp"  useNativeDriver={true} duration={ANIMATION_DURATION}> 
        <Text style={styles.message}>Along with EMI how much you can additional you can pay towards Loan Repayment</Text>
        <Button
          icon={<View style={styles.icon}><Icon name="calculator" size={18} color='#fff' /></View>}
          title="Submit"
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={onSubmit}
        /></Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    marginTop: 10,
    borderColor: '#c6c2c2',
    borderRadius: 4,
    backgroundColor: '#fff',
    elevation: 5,
    padding: 10,
    marginBottom:20
  },
  button: {
    margin: 30,
    padding: 10,
    backgroundColor:'darkslateblue'
  },
  buttonGroupContainer: {
    height:50,
    marginBottom:10,
    borderRadius:8
  },
  buttonGroupTextStyle: {
    fontSize: 18,
  },
  selectedGroupButton: {
    backgroundColor:'green',
  },
  buttonTitle: {
    fontSize: 20,
  },
  icon: {
    paddingRight: 10
  },
  iconSymbol: {
    fontSize: 22,
    marginTop: 6,
    color: 'grey'
  },
  yearIcon: {
    fontSize: 14,
    marginTop: 11,
    color: 'grey'
  },
  interestIcon: {
    fontSize: 16,
    marginTop: 10,
    color: 'grey'
  },
  message: {
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
    textAlign: 'center',
  },
});

const generateMarker = (suffix, minValue, maxValue, stepSize) => {
  var list = [];
  maxValue = maxValue || 100;
  stepSize = stepSize || 10;
  minValue = minValue || 0;
  for (var i = minValue; i <= maxValue; i += stepSize) {
    list.push({
      value: i,
      label: i !== 0 ? `${i}${suffix}` : 0,
    });
  }
  return list;
};

export default LoanForm;
