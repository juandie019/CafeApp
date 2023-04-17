import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductScreen } from '../screens/ProductScreen';
import { ProductsScreen } from '../screens/ProductsScreen';

export type ProductsStackParams = {
    ProductsScreen: undefined,
    ProductScreen: { id?: string, name?: string}
}

const Stack = createNativeStackNavigator();

export const ProductsNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            contentStyle: {
                backgroundColor: 'white',
            },
            headerBlurEffect: 'light',
            headerTitleAlign: 'center',
        }}
    >
        <Stack.Screen
            name="ProductsScreen"
            component={ ProductsScreen }
            options={{ title: 'Productos' }}
        />
        <Stack.Screen
            name="ProductScreen"
            component={ ProductScreen }
        />
    </Stack.Navigator>
  );
};
