import { baseURL } from '@/config';
import axios from 'axios';
import { getToken } from '../utils';
import { IUser, UserRole } from '@/types';

const instance = axios.create({
    baseURL: `${baseURL}/admin`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
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

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await axios.post(
                    `${baseURL}/admin/refresh`,
                    {},
                    { withCredentials: true }
                );

                const newToken = refreshResponse.data.accessToken;

                localStorage.setItem("admin_token", newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return instance(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("admin_token");
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
``;
export const adminLogin = async (username: string, password: string) => {
    const response = await axios.post(`${baseURL}/admin/login`, { username, password });
    return response.data;
};

export const getCandidates = async () => {
    const response = await instance.get('/candidates');
    return response.data;
};

export const createCandidate = async (user: IUser) => {
    const response = await instance.post('/candidates/create', user);
    return response.data;
};

export const deleteCandidate = async (id: string) => {
    const response = await instance.delete(`/candidates/${id}`);
    return response.data;
};