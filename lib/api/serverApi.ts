
import { axiosInstance } from './api';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';
import type { AxiosResponse } from 'axios';

function getCookieHeader(): { Cookie: string } {
    const cookie = new Headers().get('cookie') || '';
    return { Cookie: cookie };
}

export const getProfile = async (): Promise<User> => {
    const headers = getCookieHeader();
    const res = await axiosInstance.get<User>('/users/me', { headers });
    return res.data;
};

export const getNoteById = async (noteId: string): Promise<Note> => {
    const headers = getCookieHeader();
    const res = await axiosInstance.get<Note>(`/notes/${noteId}`, { headers });
    return res.data;
};

export const checkSession = async (): Promise<AxiosResponse<User>> => {
    const headers = getCookieHeader();
    return axiosInstance.get<User>('/auth/session', { headers });
};