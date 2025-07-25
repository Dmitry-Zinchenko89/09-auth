import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

if (!baseURL) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined in .env.local');
}

export const axiosInstance = axios.create({
    baseURL: `${baseURL}/api`,
    withCredentials: true,
});