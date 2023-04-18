import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { gstyles } from '../theme/globalStyles';

interface Props {
    title: string,
    style ?: StyleProp<ViewStyle>
    light: boolean,
    onPress: () => void;
}

export const MainButton = ({ title, style, light, onPress }: Props) => {
  return (
    <View style={{
      ...styles.buttonContainer,
      ...style as any,
    }}>
        <TouchableOpacity
          activeOpacity={ 0.5 }
          style={[styles.button, (light) && styles.buttonLight ]}
          onPress={ onPress }
        >
          <Text style={[ gstyles.buttonText, (light) && styles.buttonTextLight ]}>{ title }</Text>
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

    buttonLight: {
      borderColor: 'black',
    },

    buttonTextLight: {
      color: 'black',
    },
});
