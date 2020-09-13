import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import RupeeIcon from './RupeeIcon';

import * as Animatable from 'react-native-animatable';
import RupeeIconWithText from './RupeeIconWithText';

const SummaryReport = props => {
  const {total, completionDate, principal, interest, emi,loanType} = props.data;
  return (
    <View>
      <Animatable.View animation="slideInDown" useNativeDriver={true}>
        {
          loanType == 0 ? 
            <View style={styles.emiInfo}>
              <Text style={styles.emiLabel}>Monthly EMI</Text>
              <View style={styles.emiValue}>
                 <RupeeIconWithText style={styles.rupeeIconBig} text={emi.addThousandSeperator()}/>
              </View>
            </View>
          : null
        }
      </Animatable.View>
      <Animatable.View animation="slideInDown" useNativeDriver={true}>
        {
          props.interestSaved !== 0 ? 
            <View style={styles.emiInfo}>
              <Text style={styles.emiLabel}>Total Interest Saving</Text>
              <View style={styles.emiValue}>
                 <RupeeIconWithText style={styles.rupeeIconBig} text={props.interestSaved.addThousandSeperator()}/>
              </View>
            </View>
          : null
        }
      </Animatable.View>
      <Animatable.View animation="slideInUp"  useNativeDriver={true}>
        <View style={ loanType == 1 ? styles.emiInfo : styles.completionInfo}>
          <Text style={styles.completionLabel}>Completion Date</Text>
          <View style={styles.completionValue}>
              <Text style={styles.completionValueText}>{completionDate}</Text>
          </View>
        </View>
      </Animatable.View>
      <ListItem
        title="Total Interest"
        containerStyle={styles.item}
        rightTitle={interest.addThousandSeperator()}
        rightIcon={<RupeeIcon style={styles.rupeeIcon} />}
        rightTitleStyle={styles.labelValue}
      />
      <ListItem
        title="Total Amount"
        containerStyle={styles.item}
        rightTitle={total.addThousandSeperator()}
        rightIcon={<RupeeIcon style={styles.rupeeIcon} />}
        rightTitleStyle={styles.labelValue}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  highlight: {
    backgroundColor: '#ffeb3b8f',
    borderRadius: 10,
    marginBottom: 10,
  },
  labelValue: {
    color: '#545454',
    fontWeight: 'bold',
    alignItems: 'flex-end',
  },
  rupeeIcon: {
    fontSize: 22,
    marginTop: -12,
    color: 'grey',
  },
  emiLabel: {
    fontSize: 20,
    color:'forestgreen',
    fontWeight:'bold',
    textAlign:'center',
  },
  rupeeIconBig: {
    fontSize:40,
    paddingRight:0,
    paddingTop:0,
    color:'darkmagenta',
    fontWeight:'bold',
    flex:1,
    textAlign:'center'
  },
  emiValue: {
    alignItems: 'center',
    justifyContent:'center',
    borderWidth:0,
    flexDirection: 'row', 
  },
  emiValueText : {
    borderWidth:0,
    fontSize:35,
    //width:160,
    color:'darkmagenta',
    fontWeight:'bold'
  },
  emiInfo : {
    borderWidth:0,
    marginBottom:20,
    backgroundColor: '#ffeb3b8f',
    borderRadius: 10,
    padding:10
  },
  completionLabel: {
    fontSize: 19,
    color:'forestgreen',
    fontWeight:'bold',
    textAlign: 'center',
  },
  completionInfo : {
    marginBottom:20,
    elevation:0,
    borderWidth:0
  },
  completionValueText : {
    fontSize:34,
    color:'darkmagenta',
    fontWeight:'bold',
    textAlign: 'center',
  },
  item:{
    height:10
  },
  
})
export default SummaryReport;
