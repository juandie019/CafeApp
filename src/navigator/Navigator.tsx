import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { ProtectedScreen } from '../screens/ProtectedScreen';

const Stack = createNativeStackNavigator();

export const Navigator = () => {

  const { status } = useContext( AuthContext);

  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            contentStyle: {
                backgroundColor: 'white',
            },
        }}
    >
      {
        ( status !== 'authenticated')
        ? (
          <>
            <Stack.Screen name="LoginScreen" component={ LoginScreen } />
            <Stack.Screen name="RegisterScreen" component={ RegisterScreen } />
          </>
        )
        : (
          <Stack.Screen name="ProtectedScreen" component={ ProtectedScreen } />
        )
      }
    </Stack.Navigator>
  );
};
