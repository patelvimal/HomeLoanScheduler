import React from 'react';
import {Card} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';

const TableLayout = props => {
  const {columns, data} = props;
  return (
    <View style={styles.container}>
      <Table>
        <Row data={columns} style={styles.header} textStyle={styles.text} />
      </Table>
      <Table>
        {data &&
          data.map((rowData, index) => (
            <Row
              key={index}
              data={rowData}
              style={[styles.row, index % 2 && {backgroundColor: '#edece6'}]}
              textStyle={styles.text}
            />
          ))}
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 0, paddingTop: 0, backgroundColor: '#fff'},
  header: {
    height: 50,
    backgroundColor: '#ede4b1',
    flexDirection: 'row',
    borderBottomWidth: 1,
    //borderBottomColor: 'darkgray',
    borderBottomColor: 'rgb(185, 184, 184)',
    fontWeight:'bold'
  },
  text: {textAlign: 'center'},
  dataWrapper: {marginTop: 1},
  row: {
    height: 40,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'darkgray',
  },
});

export default TableLayout;
