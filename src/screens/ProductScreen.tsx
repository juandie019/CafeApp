import React, { useEffect, useContext } from 'react';
import  { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { Picker } from '@react-native-picker/picker';

import { ProductsContext } from '../context/ProductsContext';
import { useCategories } from '../hooks/useCategories';
import { MainInput } from '../components/MainInput';
import { MainButton } from '../components/MainButton';
import { useForm } from '../hooks/useForm';

import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends NativeStackScreenProps<ProductsStackParams, 'ProductScreen'>{}

export const ProductScreen = ({ route, navigation }: Props) => {
  const { id = '', name = ''} = route.params;

  const { categories, isLoading } = useCategories();
  const { loadProductById, addProduct, updateProduct } = useContext(ProductsContext);

  const { _id, nombre, categoryId, img, onChange, setForm } = useForm({
    _id: id,
    nombre: name,
    categoryId: '',
    img: '',
  });


  useEffect( () => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={ 0.5 }
          onPress={ () => navigation.navigate('ProtectedScreen') }
        >
          <Icon name="person-circle-outline" size={ 30 } />
        </TouchableOpacity>
    ),
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: id ? nombre : 'Nuevo Producto',
    });
  }, [nombre]);

  const loadProduct = async () => {
    if ( id.length === 0) { return; }

    const product = await loadProductById(id);

    setForm({
      _id: id,
      nombre: product.nombre,
      categoryId: product.categoria._id,
      img: product.img || '',
    });
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const saveOrUpdate = () => {
    if ( id.length > 0 ){
      updateProduct(categoryId, nombre, _id);
    } else {
      const tempCategoriaId = categoryId || categories[0]._id;
      addProduct(tempCategoriaId, nombre);
    }
  };

  return (
    <View style={ styles.container }>
      <ScrollView>
        <MainInput
          value={ nombre }
          label="Nombre del Producto"
          placeholder="Ingresa el nombre del producto"
          onInput={ (value) => onChange(value, 'nombre') }
          light
        />
          <Text style={{ marginTop: 15 }}>Selecciona la categoría</Text>
        {
          isLoading &&
          <Picker
            selectedValue={ categoryId }
            onValueChange={ (value) => onChange(value, 'categoryId') }
          >
            {
              categories.map( c => (
                <Picker.Item label={ c.nombre } value={ c._id } key={ c._id } />
              ))
            }
          </Picker>
        }
        <MainButton
          title="Guardar"
          onPress={ saveOrUpdate }
          light
        />

        {
          ( id.length > 0 ) && (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <MainButton
              title="Camara"
              onPress={ ()=>console.log('click') }
              style={{ marginRight: 10}}
              light
            />
            <MainButton
              title="Galería"
              onPress={ ()=>console.log('click') }
              light
            />
          </View>
          )
        }

        {
          ( img.length > 0 ) && (
            <Image
              source={{ uri: img }}
              style={{
                width: '100%',
                height: 300,
                marginTop: 20,
              }}
            />
          )
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      marginTop: 10,
      marginVertical: 10,
      marginHorizontal: 20,
    },
});