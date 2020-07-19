import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SummaryReport from '../components/SummaryReport';
import { Card, Button } from 'react-native-elements';
import ComparisonTable from './Comparison';
import LoanDetail from './LoanDetails';
import CardLayout from '../components/Card';
import LineChart from '../components/LineCharts';
import BarChart from '../components/BarChart';
import GoogleAds from '../components/googleAds';

const LoanResult = props => {
  const { total, loanSummary, totalWithoutPrepayment } = props.loanInfo;
  const comparisonMessage =
    'A comparison for loan payment. Along with monthly EMI if you pay additional payment then it will show how long will it take to completely pay off the loan.';

  return (
    <View>
      <CardLayout title="Summary">
        <SummaryReport data={total} />
      </CardLayout>
      <CardLayout
        removeContentStyle>
        <GoogleAds />
      </CardLayout>
      <CardLayout
        title="Comparison">
        <Text style={styles.compareText}>{comparisonMessage}</Text>
        <Button
          title="Compare"
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={props.onCompareClick}
        />
      </CardLayout>
      {props.comparison ? (
        <CardLayout
          removeContentStyle>
          <ComparisonTable loanInfo={props.comparison} />
        </CardLayout>
      ) : null}
      <CardLayout
        title="Principal/Interest Distribution Each Year"
        removeContentStyle>
        <BarChart data={loanSummary} />
        <LoanDetail loanInfo={loanSummary} style={styles.loanDetail} />
        <GoogleAds />
      </CardLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 30,
    marginRight: 30,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonTitle: {
    fontSize: 20,
  },
  compareText: {
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
    textAlign: 'center',
  },
  loanDetail: {
    marginTop: 25
  }
});

export default LoanResult;
