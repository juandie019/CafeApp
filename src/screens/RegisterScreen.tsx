import React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm } from '../hooks/useForm';

import { authStyles } from '../theme/authTheme';
import { gstyles } from '../theme/globalStyles';

import { MainButton } from '../components/MainButton';
import { MainInput } from '../components/MainInput';
import { WhiteLogo } from '../components/WhiteLogo';

interface Props extends NativeStackScreenProps<any, any>{}

export const RegisterScreen = ({ navigation }: Props) => {

  const { name, email, password, onChange } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const onRegister = () => {
    console.log(email, password);
    Keyboard.dismiss();
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#5856D6' }}
        behavior={ (Platform.OS === 'ios') ? 'padding' : undefined }
      >
        <View style={ gstyles.formContainer }>

          {/* white logo */}
          <WhiteLogo />

          <Text style={ gstyles.title }>Registrarme </Text>

          <MainInput
            value={ name }
            label="Nombre"
            onInput={ (newValue) => onChange(newValue, 'name')}
            placeholder="Nombre completo"
            autoCapitalize="words"
          />
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
            onEnter={ onRegister }
          />
          <MainButton
            title="Registrarme"
            onPress={ onRegister }
          />

          <MainButton
            title="Regresar"
            onPress={ () => navigation.replace('LoginScreen') }
            style={{ ...gstyles.fab, marginTop: 0 }}
          />
        </View>
      </KeyboardAvoidingView>
     </>
  );
};
