import React, { createContext, useReducer, useEffect } from 'react';
import { LoginResponse, Usuario, LoginData } from '../interfaces/appInterfaces';
import { AuthState, authReducer } from './authReducer';
import cafeApi from '../api/cafeApi';
import { getToken, setToken } from '../services/storage';

type AuthContextProps = {
    user: Usuario | null,
    token: string | null,
    errorMessage: string;
    status: 'checking' | 'authenticated' | 'notAuthenticated',

    signUp: () => void;
    signIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ( { children }: any ) => {
    const [state, dispatch] = useReducer(authReducer, authInitialState);

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        const storedToken = await getToken();

        //No hay token
        if (!storedToken) { return dispatch({ type: 'notAuthenticated'}); }

        //Hay token
        try {
            const response = await cafeApi.get<LoginResponse>('/auth');
            const { token, usuario } = response.data;

            dispatch({ type: 'signUp', payload: { token, user: usuario } });
        } catch (error: any) {
            setToken('');
            dispatch({ type: 'notAuthenticated' });
        }
    };

    const signUp = async ( { correo, password }: LoginData) => {
        try {
            const resp = await cafeApi.post<LoginResponse>('/auth/login', { correo, password } );
        } catch (error) {
            console.log(error);
        }
    };
    const signIn = async ( { correo, password }: LoginData ) => {
        try {
            const response = await cafeApi.post<LoginResponse>('/auth/login', { correo, password } );
            const { token, usuario } = response.data;
            setToken(token);
            dispatch({ type: 'signUp', payload: { token, user: usuario } });
        } catch (error: any) {
            dispatch( { type: 'addError', payload: error.response.data.msg || 'Información incorrecta'});
        }
    };
    const logOut = () => {};
    const removeError = () => {
        dispatch({ type: 'removeError' });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                signUp,
                signIn,
                logOut,
                removeError,
            }}
        >
            { children }
        </AuthContext.Provider>
    );
};