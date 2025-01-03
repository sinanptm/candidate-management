import { baseURL } from '@/config';
import axios from 'axios';
import { getToken } from '../utils';
import { IUser, UploadTypes, UserRole } from '@/types';

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

export const getUserProfile = async (): Promise<IUser> => {
    const response = await instance.get("/profile");
    return response.data;
};

export const updateUserProfile = async (user: IUser): Promise<IUser> => {
    const response = await instance.put("/profile", user);
    return response.data;
};

export const createPresignedUrl = async (type: UploadTypes): Promise<{ key: string, url: string; }> => {
    const response = await instance.patch("/create-url", { type });
    return response.data;
};

export const updateFile = async (type: UploadTypes, key: string):Promise<IUser> => {
    const response = await instance.put("/update-file", { key, type });
    return response.data;
};

export   const uploadFile = async (file: File, url: string) => {
    try {
        const response = await axios.put(url, file, {
            headers: {
                'Content-Type': file.type,  
            }
        });
        
        if (response.status !== 200) {
            throw new Error('Upload failed');
        }
        
        return response;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};
