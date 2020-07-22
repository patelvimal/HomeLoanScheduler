import React from 'react';
import { Card } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';

const CardLayout = props => {
  return (
    <View style={style.root}>
      <Card
        title={props.title}
        titleStyle={style.title}
        dividerStyle={style.divider}
        containerStyle={style.container}>
        <View
          style={props.removeContentStyle ? style.bottomMargin : style.content}>
          {props.children}
        </View>
      </Card>
    </View>
  );
};

const style = StyleSheet.create({
  root: {
    zIndex: 0,
  //  borderWidth: 2,
    borderColor: 'red',
//    marginTop: 20,
    marginBottom: 0,
  elevation:6,
    margin:0
  },
  title: {
    textTransform: 'capitalize',
    color: 'grey',
    paddingTop: 12,
    fontSize: 16,
    fontWeight:'400',
    textAlign:'left',
    letterSpacing:1,
    //marginTop:-14,
    //borderWidth:2,
    //borderBottomWidth:1,
    borderBottomColor:'#ccc7c7',
    paddingLeft:16,
    backgroundColor:'#fff',
  },
  container: {
    padding: 0,
    margin: 0,
    // TO get rid of border of card uncommment below 2 lines
    elevation: 0,
    borderWidth:0,
    backgroundColor: '#fff'
  },
  content: {
    // marginLeft: 20,
    // marginRight: 20,
    // marginBottom: 20,
    borderWidth:0,
    padding: 20,
    //    backgroundColor:'blue',
  },
  bottomMargin: {
    marginBottom: 25,
  },
  divider: {
    display: 'none',
  },
});
export default CardLayout;
