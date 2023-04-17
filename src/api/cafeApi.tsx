import axios from 'axios';
import { getToken } from '../services/storage';

const baseURL = 'http://192.168.1.72:3000/api';

const cafeApi = axios.create({
    baseURL,
});

cafeApi.interceptors.request.use(
    async(config) => {
        const token = await getToken();
        if (token){
            config.headers['x-token'] = token;
        }

        return config;
    }
);

export default cafeApi;