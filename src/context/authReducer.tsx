import { Usuario } from '../interfaces/appInterfaces';

export interface AuthState {
    user: Usuario | null,
    token: string | null,
    errorMessage: string;
    status: 'checking' | 'authenticated' | 'notAuthenticated',
}

type AuthAction =
    | { type: 'signUp', payload: { token: string, user: Usuario } }
    | { type: 'logOut' }
    | { type: 'notAuthenticated' }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }

export const authReducer = ( state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'addError':
            return {
                ...state,
                status: 'notAuthenticated',
                token: null,
                errorMessage: action.payload,
            };

        case 'removeError':
            return {
                ...state,
                errorMessage: '',
            };

        case 'signUp':
            return {
                ...state,
                errorMessage: '',
                user: action.payload.user,
                token: action.payload.token,
                status: 'authenticated',
            };

        case 'notAuthenticated':
        case 'logOut':
            return {
                ...state,
                status: 'notAuthenticated',
                token: null,
                user: null,
            };
        default:
            return state;
    }
};