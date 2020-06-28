import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Overlay} from 'react-native-elements';

const {width, height} = Dimensions.get('window');

const ModelDialog = () => {
  return (
    <View style={style.root}>
      <Text>Hello from Overlay!</Text>
    </View>
  );
};
const Sidebar = ({isOpen}) => {
  return (
    <React.Fragment>
      {isOpen ? (
          <>
          
          <View style={style.overlay}>
          </View>
          <View style={style.root}>
            <Text>Hello from Overlay!</Text>
          </View>
          </>
      ) : null}
    </React.Fragment>
  );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'black',
    opacity:.5

  },
  overlay:{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  root: {
    flex: 1,
    backgroundColor: 'yellow',
    position: 'absolute',
    left: 0,
    top: 0,
    width: width * 0.5,
    height: height,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
});
export default Sidebar;
