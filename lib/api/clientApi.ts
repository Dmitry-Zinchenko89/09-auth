import { axiosInstance } from './api';
import type { User } from '@/types/user';


export const registerUser = async (
    email: string,
    password: string,
    data: Partial<User>
): Promise<User> => {
    const res = await axiosInstance.post('/auth/register', {
        email,
        password,
        ...data,
    });
    return res.data;
};


export const loginUser = async (
    email: string,
    password: string
): Promise<User> => {
    const res = await axiosInstance.post('/auth/login', {
        email,
        password,
    });
    return res.data;
};


export const getSession = async (): Promise<User | null> => {
    try {
        const res = await axiosInstance.get('/auth/session');
        return res.data;
    } catch {
        return null;
    }
};


export const updateProfile = async (data: Partial<User>): Promise<User> => {
    const res = await axiosInstance.patch('/users/me', data);
    return res.data;
};