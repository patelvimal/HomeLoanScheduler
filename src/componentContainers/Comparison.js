import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import TableLayout from '../components/TableLayout';
import * as Animatable from 'react-native-animatable';

const ComparisonTable = props => {
  return (
    <View>
      {props.loanInfo &&
        props.loanInfo.map((row, index) => (
          <Animatable.View animation="slideInDown"  useNativeDriver={true}>
            <View
              style={styles.row}
              key={index}>
                <View style={[styles.column, styles.date]}>
                  <Text style={[styles.dateText, styles.yearText]}>{row.completionYear}</Text>
                  <Text style={[styles.dateText]}>{row.completionMonth}</Text>
                </View>
                <View style={[styles.column, styles.payment]}>
                  <Text style={[styles.dateText, styles.paymentLabel]}>Payment</Text>
                  <Text style={[styles.dateText, styles.paymentText]}>{row.prePayment.addThousandSeperator()}</Text>
                </View>
                <View style={[styles.column, styles.amount]}>
                  <Text style={[styles.amountText]}>Interest : {row.totalInterest.addThousandSeperator()}</Text>
                  <Text style={[styles.amountText]}>Amount : {row.totalAmount.addThousandSeperator()}</Text>
                </View>
            </View>
          </Animatable.View>
        ))}
    </View>
  );
};



const styles = StyleSheet.create({
  row: {
    flex: 1,
    //  alignSelf: 'stretch',
    flexDirection: 'row',
    // flexWrap: 'wrap',
    marginBottom: 15,
    borderWidth:1,
    borderTopColor:'#dddddd'
  },
  column: {
    // flex:1,
    borderWidth: 0,
    height: 85,
    margin:2,
    padding:2,
    justifyContent: 'center',
    borderRadius:5,
    backgroundColor:'#fcfbf9',
    // alignSelf: 'stretch'
  },
  date: {
    // borderWidth:0,
    width: '20%',
    height: 85,
    justifyContent: 'center'
  },
  payment: {
    width: '25%',
    backgroundColor:'yellow',
    borderRadius:5
  },
  amount: {
    width: '50%',
  },
  dateText: {
    textAlign: 'center',
    color: 'grey',
  },
  monthText: {

  },
  yearText: {
    fontSize: 26,
    color:'#4d4d4d'
  },
  paymentText: {
    fontSize: 26,
    fontWeight:'bold',
    color:'#4f4e4e'
  },
  amountText: {
    fontSize: 17,
    lineHeight: 30,
    paddingLeft: 10
  }
});

export default ComparisonTable;
