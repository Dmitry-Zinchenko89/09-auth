
import { cookies } from 'next/headers';
import { axiosInstance } from './api';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';
import type { AxiosResponse } from 'axios';


async function getCookieHeader(): Promise<{ Cookie: string }> {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join('; ');

    return { Cookie: cookieHeader };
}

export const getProfile = async (): Promise<User> => {
    const headers = await getCookieHeader();
    const res = await axiosInstance.get<User>('/users/me', { headers });
    return res.data;
};


export const getNoteById = async (noteId: string): Promise<Note> => {
    const headers = await getCookieHeader();
    const res = await axiosInstance.get<Note>(`/notes/${noteId}`, { headers });
    return res.data;
};


export const checkSession = async (): Promise<AxiosResponse<User>> => {
    const headers = await getCookieHeader();
    return axiosInstance.get<User>('/auth/session', { headers });
};
