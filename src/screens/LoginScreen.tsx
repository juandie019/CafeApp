import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Background } from '../components/Background';
import { MainButton } from '../components/MainButton';
import { MainInput } from '../components/MainInput';
import { WhiteLogo } from '../components/WhiteLogo';
import { authStyles } from '../theme/authTheme';
import { gstyles } from '../theme/globalStyles';

export const LoginScreen = () => {

  const [value, setValue] = useState('');

  return (
    <>
      {/* background */}
      <Background />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={ (Platform.OS === 'ios') ? 'padding' : undefined }
      >
        <View style={ gstyles.formContainer }>

          {/* white logo */}
          <WhiteLogo />

          <Text style={ gstyles.title }>Login</Text>

          <MainInput
            value={ value }
            label="Email"
            onInput={ (newValue) => setValue(newValue)}
            placeholder="Ingrese su correo"
            keyboardType="email-address"
          />
          <MainInput
            label="Email"
            onInput={ (newValue) => setValue(newValue)}
            placeholder="****"
            keyboardType="visible-password"
          />
          <MainButton
            title="Iniciar Sesión"
            onPress={ () => console.log('click')}
          />

          <View style={ authStyles.newUserContainer }>
            <TouchableOpacity
              activeOpacity={ 0.8 }
              onPress={ () => console.log('pres')}
            >
              <Text style={ gstyles.buttonText }>Nueva cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
     </>
  );
};
