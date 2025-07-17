'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession, getCurrentUser } from '@/lib/api/clientApi';

interface Props {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [isLoading, setIsLoading] = useState(true);
    const { setUser, clearUser } = useAuthStore();

    useEffect(() => {
        const initAuth = async () => {
            try {
                const session = await checkSession();

                if (session) {
                    const user = await getCurrentUser();
                    setUser(user);
                } else {
                    clearUser();
                }
            } catch (error) {
                console.error('AuthProvider: Session check failed', error);
                clearUser();
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, [setUser, clearUser]);

    if (isLoading) return <div>Loading...</div>;

    return <>{children}</>;
};