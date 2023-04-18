import { useState, useEffect } from 'react';
import { Categoria, CategoriesResponse } from '../interfaces/appInterfaces';
import cafeApi from '../api/cafeApi';

export const useCategories = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<Categoria[]>([]);

    useEffect(() => {
        getCategories();
    }, []);


    const getCategories = async () => {
        const response = await cafeApi.get<CategoriesResponse>('/categorias');

        setCategories(response.data.categorias);
        setIsLoading(true);
    };

    return {
        categories,
        isLoading
    };
};
