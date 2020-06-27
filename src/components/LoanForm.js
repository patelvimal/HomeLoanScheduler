import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InputSlider from './InputSlider';
import {Button} from 'react-native-elements';

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
    <View>
      <InputSlider
        label="Outstanding Loan Amount"
        min={0}
        max={100}
        step={1}
        defaultValue={LOAN_AMOUNT_DEFAULT_VALUE}
        onChange={onChange}
        name="loanAmount"
        markers={loanAmountMarker}
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
        hideIcon={true}
        suffix=""
        markers={loanTenureMarker}
      />
      <InputSlider
        label="Interest Rate"
        min={0}
        max={20}
        step={0.1}
        defaultValue={INTEREST_RATE_DEFAULT_VALUE}
        onChange={onChange}
        name="interestRate"
        type="Decimal"
        suffix="%"
        markers={intRateMarker}
      />
      <InputSlider
        label="Monthly Prepayment"
        min={0}
        max={100}
        step={1}
        defaultValue={MONTHLY_PREPAYMENT_DEFAULT_VALUE}
        onChange={onChange}
        suffix="K"
        name="prePayment"
        markers={emiAmountMarker}
      />
      {/* <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={onSubmit}
        title="Calculate"
      /> */}
      <Button
        title="Calculate"
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        onPress={onSubmit}
      />
      {/* <Button/>
      <Button
          title="Calculate"
          style={styles.button}
          onPress={() => Alert.alert('Simple Button pressed')}
        /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin:30,
    padding:10,
    
  },
  buttonTitle:{
    fontSize: 20,
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
