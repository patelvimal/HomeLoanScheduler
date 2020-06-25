import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';

const renderRow = row => {
  return (
    <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row'}}>
      <View style={{flex: 1, alignSelf: 'stretch'}}>
        <Text>{row.prePayment}</Text>
      </View>
      <View style={{flex: 1, alignSelf: 'stretch'}}>
        <Text>{row.totalInterest.addThousandSeperator()}</Text>
      </View>
      <View style={{flex: 1, alignSelf: 'stretch'}}>
        <Text>{row.totalAmount.addThousandSeperator()}</Text>
      </View>
      <View style={{flex: 1, alignSelf: 'stretch'}}>
        <Text>{row.completionDate}</Text>
      </View>
    </View>
  );
};

const RenderHeader = () => {
  return (
  <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row'}}>
    <View style={{flex: 1, alignSelf: 'stretch'}}>
      <Text>Monthly Payment</Text>
    </View>
    <View style={{flex: 1, alignSelf: 'stretch'}}>
      <Text>Total Interest</Text>
    </View>
    <View style={{flex: 1, alignSelf: 'stretch'}}>
      <Text>Total Amount</Text>
    </View>
    <View style={{flex: 1, alignSelf: 'stretch'}}>
      <Text>Completion Date</Text>
    </View>
  </View>);
};

const ComparisonTable = props => {
  const data = [12, 2, 3, 2];
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <RenderHeader/>
      {props.loanInfo &&
        props.loanInfo.map((row, index) => {
          return renderRow(row);
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  emiInfo: {
    backgroundColor: '#ffeb3b8f',
    borderRadius: 10,
  },
  labelValue: {
    color: '#545454',
    fontWeight: 'bold',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
});
export default ComparisonTable;
