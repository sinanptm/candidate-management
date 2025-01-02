import { baseURL } from '@/config';
import axios from 'axios';
import { getToken } from '../utils';
import {  UserRole } from '@/types';

const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = getToken(UserRole.User);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.request.use(
    (config) => {
        const token = getToken(UserRole.User);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await axios.post(
                    `${baseURL}/refresh`,
                    {},
                    { withCredentials: true }
                );

                const newToken = refreshResponse.data.accessToken;

                localStorage.setItem("user_token", newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return instance(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("user_token");
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const userLogin = async (email: string, password: string) => {
    const response = await axios.post(`${baseURL}/login`, { email, password });
    return response.data;
};
