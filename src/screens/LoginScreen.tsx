import React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm } from '../hooks/useForm';

import { authStyles } from '../theme/authTheme';
import { gstyles } from '../theme/globalStyles';

import { Background } from '../components/Background';
import { MainButton } from '../components/MainButton';
import { MainInput } from '../components/MainInput';
import { WhiteLogo } from '../components/WhiteLogo';

interface Props extends NativeStackScreenProps<any, any>{}

export const LoginScreen = ({ navigation }: Props) => {

  const { email, password, onChange } = useForm({
    email: '',
    password: '',
  });

  const onLogin = () => {
    console.log(email, password);
    Keyboard.dismiss();
  };

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
            value={ email }
            label="Email"
            onInput={ (newValue) => onChange(newValue, 'email')}
            placeholder="Ingrese su correo"
            keyboardType="email-address"
          />
          <MainInput
            value={ password }
            label="Constraseña"
            onInput={ (newValue) => onChange(newValue, 'password')}
            placeholder="****"
            secureTextEntry
            onEnter={ onLogin }
          />
          <MainButton
            title="Iniciar Sesión"
            onPress={ onLogin }
          />

          <View style={ authStyles.newUserContainer }>
            <TouchableOpacity
              activeOpacity={ 0.8 }
              onPress={ () => navigation.replace('RegisterScreen')}
            >
              <Text style={ gstyles.buttonText }>Nueva cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
     </>
  );
};
