import React, { useContext, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, Keyboard, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm } from '../hooks/useForm';

import { gstyles } from '../theme/globalStyles';

import { MainButton } from '../components/MainButton';
import { MainInput } from '../components/MainInput';
import { WhiteLogo } from '../components/WhiteLogo';
import { AuthContext } from '../context/AuthContext';

interface Props extends NativeStackScreenProps<any, any>{}

export const RegisterScreen = ({ navigation }: Props) => {

  const { signUp, errorMessage, removeError } = useContext(AuthContext);

  const { name, email, password, onChange } = useForm({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (errorMessage.length === 0) { return; }

    Alert.alert(
      'Error al registrarte',
      errorMessage,
      [
        { text: 'Ok', onPress: removeError},
      ]
    );
  }, [errorMessage]);

  const onRegister = () => {
    Keyboard.dismiss();
    signUp({ nombre: name, correo: email, password });
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
