import React from 'react';
import { View, Text, StyleSheet, Platform, TextInput, KeyboardTypeOptions, TextInputChangeEventData, NativeSyntheticEvent } from 'react-native';

type AutoCapitalize = 'characters' | 'none' | 'sentences' | 'words' | undefined;

interface Props {
    value?: string,
    label?: string,
    placeholder?: string,
    keyboardType?: KeyboardTypeOptions,
    autoCapitalize?: AutoCapitalize,
    onInput: (value: string, prop?: string ) => void;
    onEnter?: () => void;
    autoCorrect?: boolean,
    secureTextEntry?: boolean
    light?: boolean,
}

export const MainInput = ({ value = '' , label, placeholder = '', onInput, onEnter, keyboardType = 'default' , autoCapitalize = 'none', autoCorrect, secureTextEntry, light }: Props) => {
  return (
    <View>
        { ( label ) && <Text style={ [ styles.label, (light) && styles.labelLight ] }>{ label }</Text> }
        <TextInput
            value={ value }
            placeholder={ placeholder }
            onChangeText={ (newValue) => onInput(newValue)}
            onSubmitEditing={ (onEnter) && (() => onEnter())}
            keyboardType={ keyboardType }
            autoCapitalize={ autoCapitalize }
            autoCorrect={ autoCorrect }
            secureTextEntry={ secureTextEntry }
            placeholderTextColor={ light ? 'rgba(0,0,0, 0.4)' : 'rgba(255,255,255, 0.4)' }
            underlineColorAndroid={ light ? 'black' : 'white' }
            selectionColor={ light ? 'black' : 'white' }
            style={[
                styles.inputField,
                ( Platform.OS === 'ios' ) && styles.inputFieldIOS,
                (light) && styles.inputLight,
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

    labelLight: {
        color: 'black',
    },

    inputField: {
        color: 'white',
        fontSize: 20,
    },

    inputFieldIOS: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
    },

    inputLight: {
        color: 'black',
    },
});