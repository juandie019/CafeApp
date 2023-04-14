import React from 'react';
import { View, Text, StyleSheet, Platform, TextInput, KeyboardTypeOptions, TextInputChangeEventData, NativeSyntheticEvent } from 'react-native';

type AutoCapitalize = 'characters' | 'none' | 'sentences' | 'words' | undefined;

interface Props {
    value?: string,
    label?: string,
    placeholder?: string,
    keyboardType?: KeyboardTypeOptions,
    autoCapitalize?: AutoCapitalize,
    onInput: (value: string ) => void;
    autoCorrect?: boolean,
}

export const MainInput = ({ value = '' , label, placeholder = '', onInput, keyboardType = 'default' , autoCapitalize = 'none', autoCorrect = false }: Props) => {
  return (
    <View>
        { ( label ) && <Text style={ styles.label }>Email</Text> }
        <TextInput
            value={ value }
            placeholder={ placeholder }
            onChangeText={ (newValue) => onInput(newValue)}
            keyboardType={ keyboardType }
            autoCapitalize={ autoCapitalize }
            autoCorrect={ autoCorrect }
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            selectionColor="white"
            style={[
                styles.inputField,
                ( Platform.OS === 'ios' ) && styles.inputFieldIOS,
            ]}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    label: {
        marginTop: 25,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },

    inputField: {
        color: 'white',
        fontSize: 20,
    },

    inputFieldIOS: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
    },
});