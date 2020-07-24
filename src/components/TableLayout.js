import React from 'react';
import {Card} from 'react-native-elements';
import {StyleSheet, View, Text} from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import  Icon from 'react-native-vector-icons/MaterialIcons';

const TableLayout = props => {
  return (
    <View>
      {props.data &&
          props.data.map((row, index) => (
            <View 
              key={index}
              style={styles.container}>
              <Text style={styles.leftLabel}>{row.year}</Text>
              <View style={styles.timelineContainer}>
                <Icon name="fiber-manual-record" style={styles.icon}></Icon>
                <View style={styles.line}></View>
              </View>
              <View style={styles.rightLabelContainer}>
                <Text style={styles.rightLabel}>Principal : {row.principal.addThousandSeperator()}</Text>
                <Text style={styles.rightLabel}>Interest : {row.interest.addThousandSeperator()}</Text>
                </View>
              <View style={styles.totalCol}>
                <Text style={styles.totalText}>Total {"\n"} {row.totalAmount.addThousandSeperator()}</Text>
              </View> 
            </View>
          ))}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth:0,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  leftLabel:{
    borderWidth:0,
    width:'20%',
    textAlign:'center',
    lineHeight:70,
    fontSize: 16
  },
  timelineContainer : {
    borderWidth:0,
    width:'7%'
  },
  rightLabelContainer: {
    //flexDirection: 'column'
    borderWidth:0,
    width:'40%',
    justifyContent:'center',
    height:70,
  },
  totalText: {
    lineHeight:23,
    fontSize:18,
    textAlign:'center',
    color:'grey',
    
  },
  totalCol: {
    width:'25%',
    borderWidth:0,
    justifyContent:'center',
    height:70,
  },
  rightLabel: {
    // width:'50%',
    lineHeight:22,
    flexWrap:'wrap',
    fontSize:16
  },
  line: {
    height:70, 
    width:3,
    backgroundColor:'darkslateblue'
  },
  icon : {
    fontSize:30,
    position:'absolute',
    left:-14,
    top:21,
    zIndex:10,
    borderWidth:0,
    color:'darkslateblue',
  },
  
  header: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#efefea',
    borderBottomColor: '#b2b1a9',
    borderBottomWidth: 2,
    borderStyle: 'dashed'
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
