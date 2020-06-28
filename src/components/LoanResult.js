import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SummaryReport from './SummaryReport';
import {Card, Button} from 'react-native-elements';
import ComparisonTable from './Comparison';
import LoanDetail from './LoanDetails';
import CardLayout from './Card';
import LineChart from './LineCharts';
import BarChart from './BarChart';

const LoanResult = props => {
  const {total, loanSummary, totalWithoutPrepayment} = props.loanInfo;
  const comparisonMessage =
    'A comparison for loan payment. Along with monthly EMI if you pay additional payment then it will show how long will it take to completely pay off the loan.';

  return (
    <View>
      <CardLayout title="Summary">
        <SummaryReport data={total} />
        <Button
          title="Compare"
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={props.onCompareClick}
        />
        <Text style={styles.compareText}>{comparisonMessage}</Text>
      </CardLayout>
      {props.comparison ? (
        <CardLayout
          title="Comparison For Additional Payment"
          removeContentStyle>
          <ComparisonTable loanInfo={props.comparison} />
        </CardLayout>
      ) : null}

      <CardLayout
        title="Principal/Interest Distribution Each Year"
        removeContentStyle>
        <LineChart data={loanSummary} />
        <BarChart data={loanSummary} />
        <LoanDetail loanInfo={loanSummary} style={styles.loanDetail}/>
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
    // backgroundColor: '#fff9c4',
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
    textAlign: 'center',
  },
  loanDetail:{
    marginTop:25
  }
});

export default LoanResult;
