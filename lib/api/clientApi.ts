import { axiosInstance } from './api';
import type { Note, NewNote } from '@/types/note';
import type { User } from '@/types/user';
import { ResponseGetData } from '@/types/ResponseGetData';

interface FetchNotesParams {
    search?: string;
    page?: number;
    tag?: string;
}


export async function getSession(): Promise<User | null> {
    try {
        const res = await axiosInstance.get<User>('/auth/session');
        return res.data;
    } catch {
        return null;
    }
}

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

    const { data } = await axiosInstance.get<ResponseGetData>('/notes', {
        params,
    });

    return data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
    const { data } = await axiosInstance.post<Note>('/notes', newNote);
    return data;
}

export async function deleteNote(noteId: string): Promise<Note> {
    const { data } = await axiosInstance.delete<Note>(`/notes/${noteId}`);
    return data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
    const { data } = await axiosInstance.get<Note>(`/notes/${noteId}`);
    return data;
}

export async function registerUser(
    email: string,
    password: string,
    data: Partial<User>
): Promise<User> {
    const res = await axiosInstance.post('/auth/register', {
        email,
        password,
        ...data,
    });
    return res.data;
}

export async function loginUser(
    email: string,
    password: string
): Promise<User> {
    const res = await axiosInstance.post('/auth/login', {
        email,
        password,
    });
    return res.data;
}

export async function logout(): Promise<void> {
    await axiosInstance.post('/auth/logout');
}

export async function getCurrentUser(): Promise<User> {
    const res = await axiosInstance.get('/users/me');
    return res.data;
}

export async function updateProfile(data: Partial<User>): Promise<User> {
    const res = await axiosInstance.patch('/users/me', data);
    return res.data;
}
