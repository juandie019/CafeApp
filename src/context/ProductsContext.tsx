import React, { createContext, useState } from 'react';
import { Producto } from '../interfaces/appInterfaces';

type ProductsContextProps = {
    products: Producto[];
    loadProducts: () => {};
    addProduct: ( categoryId: string, productName: string) => Promise<void>;
    updateProduct:( categoryId: string, productName: string, productId: string ) => Promise<void>;
    deleteProduct:( productId: string ) => Promise<void>;
    loadProductById:( productId: string ) => Promise<void>;
    uploadImage:( data: any, productId: string ) => Promise<void>; //TODO: cambiar ANY
}

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({ children }: any) => {

    const [products, setProducts] = useState<Producto[]>([]);

    const loadProducts = async () => {

    };

    const addProduct = async ( categoryId: string, productName: string) => {
    };

    const updateProduct = async ( categoryId: string, productName: string, productId: string ) => {

    };

    const deleteProduct = async ( productId: string ) => {

    };

    const loadProductById = async ( productId: string ) => {

    };

    const uploadImage = async ( data: any, productId: string ) => {

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