import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Slider } from 'react-native-elements'

const InputSlider = () => {

    const [value, setValue] = useState(0)
    return (
        <View>
            <Text>Sampleasd</Text>
            <Input
                placeholder=''
                leftIcon={{ name: 'home' }}
                type='number'
            />
            <Slider
                value={50}
                onValueChange={(value) => setValue({ value })}
            />
        </View>
    )
}
const styles = StyleSheet.create({})

export default InputSlider


