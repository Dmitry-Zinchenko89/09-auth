import { axiosInstance } from './api';
import type { User } from '@/types/user';
import type { Note, NewNote } from '@/types/note';
import type { ResponseGetData } from '@/types/ResponseGetData';

// ---------- AUTH ----------
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

// ---------- NOTES ----------
interface FetchNotesParams {
    search?: string;
    page?: number;
    tag?: string;
}

export const fetchNotes = async ({
    search = '',
    page = 1,
    tag,
}: FetchNotesParams): Promise<ResponseGetData> => {
    const params: Record<string, string | number> = {
        page,
        perPage: 12,
    };

    if (search) params.search = search;
    if (tag && tag !== 'All') params.tag = tag;

    const { data } = await axiosInstance.get<ResponseGetData>('/notes', {
        params,
    });

    return data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
    const { data } = await axiosInstance.post<Note>('/notes', newNote);
    return data;
};

export const deleteNote = async (noteId: number): Promise<Note> => {
    const { data } = await axiosInstance.delete<Note>(`/notes/${noteId}`);
    return data;
};

export const fetchNoteById = async (noteId: number): Promise<Note> => {
    const { data } = await axiosInstance.get<Note>(`/notes/${noteId}`);
    return data;
};
