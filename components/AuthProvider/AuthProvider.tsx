'use client';

import { useEffect, useState } from 'react';

import { useAuthStore } from '@/lib/store/authStore';
import { getSession } from '@/lib/api/clientApi';
import Loader from '../Loader/Loader';

export default function AuthProvider({ children }: { children: React.ReactNode }) {

    const [loading, setLoading] = useState(true);
    const setUser = useAuthStore((state) => state.setUser);

    useEffect(() => {
        const checkSession = async () => {
            const user = await getSession();
            if (user) setUser(user);
            setLoading(false);
        };

        checkSession();
    }, [setUser]);

    if (loading) return <Loader />;

    return <>{children}</>;
}