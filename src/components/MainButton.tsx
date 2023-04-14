import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { gstyles } from '../theme/globalStyles';

interface Props {
    title: string,
    onPress?: () => void;
}

export const MainButton = ({ title, onPress }: Props) => {
  return (
    <View style={ styles.buttonContainer }>
        <TouchableOpacity
          activeOpacity={ 0.8 }
          style={ styles.button }
          onPress={ onPress }
        >
          <Text style={ gstyles.buttonText }>{ title }</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50,
    },

    button: {
        borderWidth: 2,
        borderColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
    },

});
