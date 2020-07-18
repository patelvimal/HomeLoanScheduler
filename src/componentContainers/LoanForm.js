import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InputSlider from '../components/InputSlider';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import RupeeIcon from '../components/RupeeIcon';

const LoanForm = (props) => {
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
    calculateEMI: true,
  };
  const [loanInfo, setLoanInfo] = useState(INITIAL_STATE);
  const loanAmountMarker = generateMarker('L');
  const emiAmountMarker = generateMarker('K');
  const intRateMarker = generateMarker('%', 20, 2);
  const loanTenureMarker = generateMarker('', 30, 2);

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

  return (
    <View style={styles.root}>
      <InputSlider
        label="Outstanding Loan Amount"
        min={0}
        max={100}
        step={1}
        defaultValue={LOAN_AMOUNT_DEFAULT_VALUE}
        onChange={onChange}
        name="loanAmount"
        markers={loanAmountMarker}
        icon={<RupeeIcon/>}
      />
      <InputSlider
        hide={!loanInfo.calculateEMI}
        label="Loan Tenure"
        min={0}
        max={30}
        step={1}
        defaultValue={LOAN_TENURE_DEFAULT_VALUE}
        onChange={onChange}
        name="loanTenure"
        icon={<Text style={styles.yearIcon}>Years</Text>}
        markers={loanTenureMarker}
      />
      <InputSlider
        label="Interest Rate"
        min={1}
        max={20}
        step={.5}
        defaultValue={INTEREST_RATE_DEFAULT_VALUE}
        onChange={onChange}
        name="interestRate"
        type="Decimal"
        icon={<Text style={styles.interestIcon}>%</Text>}
        markers={intRateMarker}
      />
      <InputSlider
        label="Additional Payment (monthly)"
        min={0}
        max={100}
        step={1}
        defaultValue={MONTHLY_PREPAYMENT_DEFAULT_VALUE}
        onChange={onChange}
        name="prePayment"
        icon={<RupeeIcon/>}
        markers={emiAmountMarker}
      />
      <Button
        icon={<View style={styles.icon}><Icon name="calculator" size={18} color='#fff' /></View>}
        title="Calculate"
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        onPress={onSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginLeft:10,
    marginRight:10
  },
  button: {
    margin:30,
    padding:10,
    
  },
  buttonTitle:{
    fontSize: 20,
  },
  icon : {
    paddingRight:10
  },
  iconSymbol: {
    fontSize: 22,
    marginTop: 6,
    color: 'grey'
  },
  yearIcon :{
    fontSize: 14,
    marginTop: 11,
    color: 'grey'
  },
  interestIcon : {
    fontSize: 16,
    marginTop: 10,
    color: 'grey'
  }

});

const generateMarker = (suffix, maxValue, stepSize) => {
  var list = [];
  maxValue = maxValue || 100;
  stepSize = stepSize || 10;
  for (var i = 0; i <= maxValue; i += stepSize) {
    list.push({
      value: i,
      label: i !== 0 ? `${i}${suffix}` : 0,
    });
  }
  return list;
};

export default LoanForm;
