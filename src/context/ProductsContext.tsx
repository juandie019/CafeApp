import React, { createContext, useState, useEffect } from 'react';
import { Producto, ProductosResponse } from '../interfaces/appInterfaces';
import cafeApi from '../api/cafeApi';
import { Asset, ImagePickerResponse } from 'react-native-image-picker';

type ProductsContextProps = {
    products: Producto[];
    loadProducts: () => {};
    addProduct: ( categoryId: string, productName: string) => Promise<Producto>;
    updateProduct:( categoryId: string, productName: string, productId: string ) => Promise<Producto>;
    deleteProduct:( productId: string ) => Promise<void>;
    loadProductById:( productId: string ) => Promise<Producto>;
    uploadImage:( data: any, productId: string ) => Promise<string>; //TODO: cambiar ANY
}

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({ children }: any) => {

    const [products, setProducts] = useState<Producto[]>([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const response = await cafeApi.get<ProductosResponse>('/productos?limite=50');
        setProducts(response.data.productos);
    };

    const addProduct = async ( categoryId: string, productName: string) : Promise<Producto> => {
        const resp = await cafeApi.post<Producto>('/productos', { nombre: productName, categoria: categoryId });
        setProducts([...products, resp.data]);
        return resp.data;
    };

    const updateProduct = async ( categoryId: string, productName: string, productId: string ) : Promise<Producto> => {
        console.log(productId);
        const resp = await cafeApi.put<Producto>(`productos/${productId}`, { nombre: productName, categoria: categoryId });

        setProducts(products.map( prod => {
            return (prod._id === productId)
                ? resp.data
                : prod;
        }));
        return resp.data;
    };

    const deleteProduct = async () => {

    };

    const loadProductById = async ( productId: string ) : Promise<Producto> => {
        const response = await cafeApi.get<Producto>(`productos/${productId}`);
        return response.data;
    };

    const uploadImage = async ( data: Asset, productId: string ) : Promise<string> => {
        const fileToUpload = {
            uri: data.uri,
            type: data.type,
            name: data.fileName,
        };

        const formData = new FormData();
        formData.append('archivo', fileToUpload);

        const response = await cafeApi.put<Producto>(`/uploads/productos/${productId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' }});
        return response.data.img || '';
    };

    return (
        <ProductsContext.Provider
            value={{
                products,
                loadProducts,
                addProduct,
                updateProduct,
                deleteProduct,
                loadProductById,
                uploadImage,
            }}
        >
            { children }
        </ProductsContext.Provider>
    );
};