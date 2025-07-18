import { axiosInstance } from './api';
import { cookies } from 'next/headers';
import type { ResponseGetData } from '@/types/ResponseGetData';
import type { User } from '@/types/user';

export interface FetchNotesParams {
    search?: string;
    page?: number;
    tag?: string;
}

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

export const getNotes = async ({
    search = '',
    page = 1,
    tag,
}: FetchNotesParams): Promise<ResponseGetData> => {
    const params: Record<string, string | number> = {
        page,
        perPage: 16,
    };

    if (search.trim()) params.search = search.trim();
    if (typeof tag === 'string' && tag.trim() && tag !== 'All') {
        params.tag = tag.trim();
    }

    const headers = await getCookieHeader();

    const { data } = await axiosInstance.get<ResponseGetData>('/notes', {
        params,
        headers,
    });

    return data;
};