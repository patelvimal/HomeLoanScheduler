import React from 'react';
import {Card} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';

const CardLayout = props => {
  return (
    <Card
      title={props.title}
      containerStyle={style.container}
      dividerStyle={style.divider}
      titleStyle={style.title}>
        <View style={props.removeContentStyle ? style.bottomMargin : style.content}>
          {props.children}
        </View>
    </Card>
  );
};

const style = StyleSheet.create({
  title: {
    textTransform: 'capitalize',
    backgroundColor: '#fff9c4',
    borderBottomColor: '#b2b1a9',
    borderBottomWidth: 2,
    borderStyle: 'dashed',
    padding: 12,
    margin: 0,
    fontSize: 17,
  },
  container: {
    padding: 0,
    margin: 0,
    // TO get rid of border of card uncommment below 2 lines
    // elevation:0,
    // backgroundColor:'#fff'
  },
  content : {
    marginLeft:20,
    marginRight:20,
    marginBottom:20,
    borderWidth:0,
    borderColor:'red'
  },
  bottomMargin: {
    marginBottom:20,
  },
  divider:{
    display:'none'
  }
  
});
export default CardLayout;
