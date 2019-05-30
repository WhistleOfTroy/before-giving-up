import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';


export const LongButton = (props) => {
    
    const { title = 'Start', style = {}, textStyle = {}, onPress, darkMode = false } = props;

    return (
        <TouchableOpacity onPress={onPress} style={darkMode ? darkStyles.button : styles.button}>
        <Text style={darkMode ? darkStyles.text : styles.text}>{props.title}</Text>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        width: 310,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'black',
        shadowColor: '#2AC062',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
    },

    text: {
        fontSize: 30,
        textTransform: 'uppercase',
        color: '#FFFFFF',
        fontFamily: 'Courier'
    },
});
const darkStyles = StyleSheet.create({
    button: {
        display: 'flex',
        width: 310,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'white',
        shadowColor: '#2AC062',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
    },

    text: {
        fontSize: 30,
        textTransform: 'uppercase',
        color: 'black',
        fontFamily: 'Courier'
    },
});