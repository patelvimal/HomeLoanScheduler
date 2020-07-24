import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import RupeeIcon from './RupeeIcon';

const SummaryReport = props => {
  const {total, completionDate, principal, interest, emi} = props.data;
  return (
    <View>
      <View style={styles.emiInfo}>
        <Text style={styles.emiLabel}>Monthly EMI</Text>
        <View style={styles.emiValue}>
            <RupeeIcon style={styles.rupeeIconBig}/>
            <Text style={styles.emiValueText}>{emi.addThousandSeperator()}</Text>
        </View>
      </View>
      <View style={styles.completionInfo}>
        <Text style={styles.completionLabel}>Completion Date</Text>
        <View style={styles.completionValue}>
            <Text style={styles.completionValueText}>{completionDate}</Text>
        </View>
      </View>
      <ListItem
        title="Total Interest"
        rightTitle={interest.addThousandSeperator()}
        rightIcon={<RupeeIcon style={styles.rupeeIcon} />}
        rightTitleStyle={styles.labelValue}
      />
      <ListItem
        title="Total Amount"
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
    marginTop: 0,
    color: 'grey',
  },
  emiLabel: {
    fontSize: 22,
    color:'forestgreen',
    fontWeight:'bold'
  },
  rupeeIconBig: {
    fontSize:43,
    paddingRight:15,
    color:'darkmagenta',
  },
  emiValue: {
    flexDirection:'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  emiValueText : {
    fontSize:45,
    color:'darkmagenta',
    fontWeight:'bold'
  },
  emiInfo : {
    // flexDirection:'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginBottom:20,
    backgroundColor: '#ffeb3b8f',
    borderRadius: 10,
    padding:10
  },
  completionLabel: {
    fontSize: 20,
    color:'forestgreen',
    fontWeight:'bold'
  },
  completionInfo : {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginBottom:20,
    elevation:0,
    borderWidth:0
  },
  completionValueText : {
    fontSize:40,
    color:'darkmagenta',
    fontWeight:'bold'
  },
})
export default SummaryReport;
