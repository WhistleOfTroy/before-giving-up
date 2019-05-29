import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';


export const LongButton = (props) => {
    
    const { title = 'Start', style = {}, textStyle = {}, onPress } = props;

    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Text style={[styles.text, textStyle]}>{props.title}</Text>
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