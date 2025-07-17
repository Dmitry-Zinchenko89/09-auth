import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

if (!baseURL) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined in .env.local');
}

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});