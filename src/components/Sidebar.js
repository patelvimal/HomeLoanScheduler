import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Linking, Alert, Image } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import AppTitle from './AppTitle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeedbackForm from './feedback';

const { width, height } = Dimensions.get('window');

const Sidebar = ({ isOpen, onClose }) => {
  const playStoreLink = 'market://details?id=com.homeloanscheduler';
  const whatsAppLink = 'https://api.whatsapp.com/send?text= *_Home Loan Scheduler_*  \nhttps://play.google.com/store/apps/details?id=com.homeloanscheduler'

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const onShareClick = () => {
    Linking.openURL(whatsAppLink);
  }

  const onRateUsClick = () => {
    Linking.openURL(playStoreLink);
  }

  const onFeedbackClick = () => {
    setShowFeedbackForm(true);
  }
  const onFormClosed = () => {
    setShowFeedbackForm(false);
  }

  return (
    <React.Fragment>
      {isOpen ? (
        <>
          <View
            style={style.overlay}
            onStartShouldSetResponder={onClose}
          />
          <View style={style.root}>
            <View style={style.header}>
              <AppTitle />
              <Text style={style.version}>v1.0.0</Text>
            </View>
            <Image
              source={require('../assets/appLogo.png')}
              style={style.logo}
            />
            <View style={style.container}>
            <Button
                icon={<View style={style.icon}><Icon name="feedback" size={15} color='#fff' /></View>}
                title="Feedback"
                buttonStyle={style.buttonStyle}
                onPress={onFeedbackClick}
              />
              <Button
                icon={<View style={style.icon}><Icon name="share" size={18} color='#fff' /></View>}
                title="Share"
                buttonStyle={style.buttonStyle}
                onPress={onShareClick}
              />
              <Button
                icon={<View style={style.icon}><Icon name="star" size={18} color='#fff' /></View>}
                title="Rate Us"
                buttonStyle={style.buttonStyle}
                iconContainerStyle={style.icon}
                onPress={onRateUsClick}
              />
           
            </View>
            {
              showFeedbackForm && <FeedbackForm onClose={onFormClosed}></FeedbackForm>
            }
          </View>
        </>
      ) : null}
    </React.Fragment>
  );
};

const style = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },
  logo: {
    width: 200,
    height: 200,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1
  },
  root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    top: 0,
    width: width * 0.7,
    height: height,
    zIndex: 1
  },
  header: {
    backgroundColor: 'darkslategrey',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * .15
  },
  version: {
    color: '#fff',
  },
  container: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonStyle: {
    margin: 10,
    backgroundColor: 'darkslateblue'
  },
  buttonContainer: {
    color: 'yellow'
  },
  icon: {
    paddingRight: 10
  }
});
export default Sidebar;
