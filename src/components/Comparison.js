import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';

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
  const columns = ['Monthly Payment','Total Interest','Total Amount','Completion Date'];
  const data = props.loanInfo && props.loanInfo.map(row=>([row.prePayment,row.totalInterest,row.totalAmount,row.completionDate]))
  return (
    <View style={styles.container}>
      <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
        <Row
          data={columns}
          style={styles.header}
          textStyle={styles.text}
        />
      </Table>
      <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
        {data && data.map((rowData, index) => (
          <Row
            key={index}
            data={rowData}
            style={[styles.row, index % 2 && {backgroundColor: '#F7F6E7'}]}
            textStyle={styles.text}
          />
        ))}
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  header: {height: 50, backgroundColor: '#537791'},
  text: {textAlign: 'center', fontWeight: '100'},
  dataWrapper: {marginTop: -1},
  row: {height: 40, backgroundColor: '#E7E6E1'},
});

export default ComparisonTable;
