import { baseURL } from '@/config';
import axios from 'axios';
import { getToken } from '../utils';
import { UserRole } from '@/types';

const instance = axios.create({
    baseURL,
    withCredentials: true,
});

axios.interceptors.request.use((config) => {
    const token = getToken(UserRole.Admin);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const adminLogin = async (username: string, password: string) => {
    const response = await instance.post('/admin/login', { username, password });
    return response.data;
};

export const adminGetCandidates = async () => {
    const response = await instance.get('/admin/candidates');
    return response.data;
};
