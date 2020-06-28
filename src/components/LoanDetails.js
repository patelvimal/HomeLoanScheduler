import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Table, TableWrapper, Row} from 'react-native-table-component';
import TableLayout from './TableLayout';

const LoanDetail = props => {
  const columns = ['Year', 'Principal', 'Interest', 'Total'];
  const data =
    props.loanInfo &&
    props.loanInfo.map(row => [
      row.year,
      row.principal.addThousandSeperator(),
      row.interest.addThousandSeperator(),
      row.totalAmount.addThousandSeperator(),
    ]);
  return (
    <View style={props.style}>
      <TableLayout columns={columns} data={data} />
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

export default LoanDetail;
