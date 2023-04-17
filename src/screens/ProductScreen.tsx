import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import  { View, Text } from 'react-native';
import { ProductsStackParams } from '../navigator/ProductsNavigator';

interface Props extends NativeStackScreenProps<ProductsStackParams, 'ProductScreen'>{}

export const ProductScreen = ({ route, navigation }: Props) => {
  const { id, name } = route.params;
  const title = id ? name : 'Nuevo Producto';

  useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, []);

  return (
    <View>
        <Text>{ id }</Text>
        <Text>{ name }</Text>
    </View>
  );
};
