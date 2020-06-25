import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SummaryReport from './SummaryReport';
import {Card, Button} from 'react-native-elements';
import ComparisonTable from './Comparison';

const LoanResult = props => {
  const {total, loanSummary, totalWithoutPrepayment} = props.loanInfo;
  const comparisonMessage =
    'A comparison for loan payment. Along with monthly EMI if you pay additional payment then it will show how long will it take to completely pay off the loan.';

  return (
    <View>
      <Card title="Summary">
        <SummaryReport data={total} />
        <Button
          title="Compare"
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={props.onCompareClick}
        />
        <Text style={styles.compareText}>{comparisonMessage}</Text>
      </Card>
      <Card title="Comparison For Additional Payment">
          <ComparisonTable loanInfo={props.comparison} />
      </Card>
      {[
        1,
        2,
        3,
        6,
        4,
        58,
        8,
        78,
        78,
        78,
        7,
        97,
        9,
        9,
        41,
        5223234,
        2343434,
        3445,
        48,
        87,
        87,
        415,
        4524,
        5,
      ].map(a => {
        return <Text>{a}</Text>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 0,
    padding: 10,
    marginBottom:10
  },
  buttonTitle: {
    fontSize: 20,
  },
  compareText: {
    backgroundColor: '#fff9c4',
    borderRadius: 10,
    padding: 10,
    fontSize:15,
    textAlign:'center'
},
});

export default LoanResult;
