import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import TableLayout from '../components/TableLayout';

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
    <View style={{flexDirection: 'row'}}>
      <View style={{flex: 1, textAlign: 'center'}}>
        <Text>Monthly Payment</Text>
      </View>
      <View style={{flex: 1, textAlign: 'center'}}>
        <Text>Total Interest</Text>
      </View>
      <View style={{flex: 1}}>
        <Text>Total Amount</Text>
      </View>
      <View style={{flex: 1, textAlign: 'center'}}>
        <Text>Completion Dates</Text>
      </View>
    </View>
  );
};

const ComparisonTable = props => {
  const columns = ['Monthly Payment',"Total       Interest",'Total       Amount','Completion Date'];
  const data = props.loanInfo && props.loanInfo.map(row=>([
    row.prePayment.addThousandSeperator(),
    row.totalInterest.addThousandSeperator(),
    row.totalAmount.addThousandSeperator(),
    row.completionDate]))
  return (
    <TableLayout
      columns = {columns}
      data= {data}
    />
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 0, paddingTop: 0, backgroundColor: '#fff'},
  header: {height: 50, backgroundColor: '#fff',flexDirection: 'row' ,borderBottomWidth:1,borderBottomColor:'darkgray'},
  text: {textAlign: 'center'},
  dataWrapper: {marginTop: 1},
  row: {height: 40, backgroundColor: '#E7E6E1',flexDirection: 'row',borderBottomWidth:1,borderBottomColor:'darkgray'},
});

export default ComparisonTable;
