import axios from 'axios';
import { cookies } from 'next/headers';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';

const axiosServer = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        Accept: 'application/json',
    },
});

async function getAuthHeaders() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    return accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {};
}


export const getProfile = async (): Promise<User> => {
    const headers = await getAuthHeaders();
    const res = await axiosServer.get<User>('/users/me', { headers });
    return res.data;
};


export const getNoteById = async (noteId: string): Promise<Note> => {
    const headers = await getAuthHeaders();
    const res = await axiosServer.get<Note>(`/notes/${noteId}`, { headers });
    return res.data;
};


export const checkSession = async (): Promise<User | null> => {
    try {
        const headers = await getAuthHeaders();
        const res = await axiosServer.get<User>('/auth/session', { headers });
        return res.data;
    } catch {
        return null;
    }
};