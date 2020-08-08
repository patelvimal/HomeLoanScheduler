import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native'
import { Overlay, Button, Header } from 'react-native-elements'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');


const FeedbackForm = (props) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState(null);
    const [formSubmit, setFormSubmit] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, [props.show]);

    const toggleOverlay = () => {
        setVisible(!visible);
        props.onClose();
    };

    const onTextChange = (text) => {
        setMessage(text);
    }

    const onSubmit = () => {
        setFormSubmit(true);
        auth()
            .signInAnonymously()
            .then((user) => {
                // console.log(JSON.stringify(user));
                database()
                    .ref('/feedback')
                    .push({
                        logdate: new Date().getTime(),
                        description: message,
                    })
                    .then(() => {
                        setFormSubmit(false);
                        toggleOverlay();
                    });
            })
            .catch(error => {
                if (error.code === 'auth/operation-not-allowed') {
                    console.log('Enable anonymous in your firebase console.');
                }
                console.error(error);
            });

    }

    return (
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlayStyle}>
            <View>
                <Header
                    centerComponent={{ text: 'Share Your Feedback', style: { fontSize: 20,fontWeight:'bold' } }}
                    rightComponent={<Icon name="close" size={30} onPress={toggleOverlay}/>}
                    containerStyle={{
                        backgroundColor: '#add8e6',
                        height: 50,
                        paddingTop: 0
                    }}
                />
            </View>
            <View style={styles.root}>
                <Text style={styles.label}>Please Let us know how to make this App better for you!</Text>
                <TextInput
                    multiline
                    placeholder="Write to us..."
                    numberOfLines={10}
                    onChangeText={onTextChange}
                    maxLength={2000} style={styles.textInput}
                />
                <Button
                    disabled={!message || formSubmit}
                    title="Submit"
                    buttonStyle={styles.buttonStyle}
                    onPress={onSubmit}
                />
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    root: {
        marginHorizontal: 10,
        marginVertical: 10,
        flex: 1,
        backgroundColor: '#fff',
    },
    label: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        fontSize: 17,
        textAlign: 'center',
        backgroundColor: '#eff4f3',
        marginVertical: 15
    },
    overlayStyle: {
        width: width * 0.9,
        height: height * 0.7,
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#4d4d4d',
        marginBottom: 20,
        textAlignVertical: 'top'
    },
    buttonStyle: {
        paddingVertical: 15,
        backgroundColor: 'darkslateblue'
    },
    icon: {
        paddingRight: 10
    },
    iconButton: {
        width: 50,
        height: 40,
        backgroundColor: '#fff',
        alignSelf: 'flex-end'
    }
})
export default FeedbackForm
