import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';

const LoanDetail = props => {
  const columns = ['Year','Principal','Interest','Total'];
  const data = props.loanInfo && props.loanInfo.map( row=>
        ([row.year,row.principal,row.interest,row.totalAmount])
    )
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

export default LoanDetail;
