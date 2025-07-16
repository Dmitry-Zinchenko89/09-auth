import axios from 'axios';
import { axiosInstance } from './api';
import type { Note, NewNote } from '@/types/note';
import type { User } from '@/types/user';
import { ResponseGetData } from '@/types/ResponseGetData';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const notehubToken = process.env.NEXT_PUBLIC_TOKEN;

const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${notehubToken}`,
};



interface FetchNotesParams {
    search?: string;
    page?: number;
    tag?: string;
}

export const checkSession = async (): Promise<User | null> => {
    try {
        const res = await axiosInstance.get<User>('/auth/session');
        return res.data;
    } catch {
        return null;
    }
};

export async function fetchNotes({
    search = '',
    page = 1,
    tag,
}: FetchNotesParams): Promise<ResponseGetData> {
    const params: Record<string, string | number> = {
        page,
        perPage: 16,
    };

    if (search) params.search = search;
    if (tag && tag !== 'All') params.tag = tag;

    const { data } = await axios.get<ResponseGetData>('/notes', {
        params,
        headers,
    });

    return data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
    const { data } = await axios.post<Note>('/notes', newNote, { headers });
    return data;
}

export async function deleteNote(noteId: string): Promise<Note> {
    const { data } = await axios.delete<Note>(`/notes/${noteId}`, { headers });
    return data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
    const { data } = await axios.get<Note>(`/notes/${noteId}`, { headers });
    return data;
}



export async function registerUser(
    email: string,
    password: string,
    data: Partial<User>
): Promise<User> {
    const res = await axios.post('/auth/register', {
        email,
        password,
        ...data,
    }, { headers });
    return res.data;
}

export async function loginUser(
    email: string,
    password: string
): Promise<User> {
    const res = await axios.post('/auth/login', {
        email,
        password,
    }, { headers });
    return res.data;
}

export async function logout(): Promise<void> {
    await axios.post('/auth/logout', null, { headers });
}

export async function getSession(): Promise<User | null> {
    try {
        const res = await axios.get('/auth/session', { headers });
        return res.data;
    } catch {
        return null;
    }
}

export async function getCurrentUser(): Promise<User> {
    const res = await axios.get('/users/me', { headers });
    return res.data;
}

export async function updateProfile(data: Partial<User>): Promise<User> {
    const res = await axios.patch('/users/me', data, { headers });
    return res.data;
}