import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import InputSlider from './InputSlider'

const LoanForm = () => {
    return (
        <View>
            <InputSlider label="Outstanding Loan Amount"/>
        </View>
    )
}

const styles = StyleSheet.create({})

export default LoanForm;


