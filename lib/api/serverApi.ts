import { cookies } from 'next/headers';
import { axiosInstance } from './api';
import type { User } from '@/types/user';

export async function getProfile(): Promise<User> {
    const cookie = cookies().toString();
    const res = await axiosInstance.get('/users/me', {
        headers: { Cookie: cookie },
    });
    return res.data;
}