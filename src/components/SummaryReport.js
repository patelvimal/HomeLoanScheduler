import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';

const SummaryReport = props => {
  const {total, completionDate, principal, interest, emi} = props.data;
  return (
    <View>
      <ListItem
        title="Monthly EMI"
        rightTitle={emi.addThousandSeperator()}
        containerStyle={styles.emiInfo}
        rightTitleStyle={styles.labelValue}
      />
      <ListItem
        title="Total Interest"
        rightTitle={interest.addThousandSeperator()}
        rightTitleStyle={styles.labelValue}
      />
      <ListItem
        title="Total Amount"
        rightTitle={total.addThousandSeperator()}
        rightTitleStyle={styles.labelValue}
      />
      <ListItem
        title="Completion Date"
        rightTitle={completionDate}
        rightTitleStyle={styles.labelValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    emiInfo:{
        backgroundColor: '#ffeb3b8f',
        borderRadius: 10
    },
    labelValue:{
        color: '#545454',
        fontWeight:'bold',
        alignItems:'flex-start',
        textAlign:'left'
    }
})
export default SummaryReport;
