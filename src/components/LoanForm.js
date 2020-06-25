import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InputSlider from './InputSlider';

const LoanForm = () => {
  const LOAN_AMOUNT_DEFAULT_VALUE = 1;
  const MONTHLY_EMI_DEFAULT_VALUE = 50;
  const INTEREST_RATE_DEFAULT_VALUE = 9;
  const LOAN_TENURE_DEFAULT_VALUE = 1;
  const MONTHLY_PREPAYMENT_DEFAULT_VALUE = 0;

  const onChange = (name, newValue) => {
    // setLoanInfo(prevState => ({
    //     ...prevState,
    //     [name]: newValue
    // }))
}


  return (
    <View>
      <InputSlider
        label="Outstanding Loan Amount"
        min={0}
        max={100}
        step={1}
        defaultValue={LOAN_AMOUNT_DEFAULT_VALUE}
        onChange={onChange}
        suffix="L"
        name="loanAmount"
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoanForm;
