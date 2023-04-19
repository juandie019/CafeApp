import React, { useContext, useEffect, useState } from 'react';
import  { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { ProductsContext } from '../context/ProductsContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';

interface Props extends NativeStackScreenProps<ProductsStackParams, 'ProductsScreen'>{}

export const ProductsScreen = ({ navigation } : Props) => {

  const [isRefreshing, setIsRefreshing] = useState(false);

  const { products, loadProducts } = useContext( ProductsContext );

  useEffect( () => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={ 0.5 }
          onPress={ () => navigation.navigate('ProductScreen', {}) }
        >
          <Text style={{ marginRight: 10 }}>Agregar</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  // TODO: Pull to refresh

  const loadProductsOnPull = async () => {
    setIsRefreshing(true);
    await loadProducts();
    setIsRefreshing(false);
  };

  return (
    <View
      style={{
        flex: 1,
        margin: 10,
      }}
    >
        <FlatList
          data={ products }
          keyExtractor={ (p) => p._id}
          renderItem={ ({ item }) => (
            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ () => navigation.navigate('ProductScreen', { id: item._id, name: item.nombre })}
            >
              <Text style={ styles.productName }>{ item.nombre }</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={ () => <View style={ styles.itemSeparator } /> }

          refreshControl={
            <RefreshControl
              refreshing={ isRefreshing }
              onRefresh={ loadProductsOnPull }
            />
          }
        />

    </View>
  );
};

const styles = StyleSheet.create({
    productName: {
      fontSize: 20,
    },

    itemSeparator: {
      borderBottomWidth: 1,
      marginVertical: 5,
      borderBottomColor: 'rgba(0,0,0,0.1)',
    },
});