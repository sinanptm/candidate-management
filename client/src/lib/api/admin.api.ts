import { baseURL } from '@/config';
import axios from 'axios';
import { getToken } from '../utils';
import IUser, { UserRole } from '@/types';

const instance = axios.create({
    baseURL,
    withCredentials: true,
});

instance.interceptors.request.use(
    (config) => {
        const token = getToken(UserRole.Admin);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const adminLogin = async (username: string, password: string) => {
    const response = await instance.post('/admin/login', { username, password });
    return response.data;
};

export const getCandidates = async () => {
    const response = await instance.get('/admin/candidates');
    return response.data;
};

export const createCandidate = async (user: IUser) => {
    const response = await instance.post('/admin/candidates/create', user);
    return response.data;
}; 

export const deleteCandidate = async (id: string) => {
    const response = await instance.delete(`/admin/candidates/${id}`);
    return response.data;
}