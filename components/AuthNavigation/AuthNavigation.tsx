'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
    const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            clearIsAuthenticated();
            window.location.href = '/sign-in';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (isAuthenticated && user) {
        return (
            <>
                <li className={css.navigationItem}>
                    <Link href="/profile" prefetch={false} className={css.navigationLink}>
                        Profile
                    </Link>
                </li>
                <li className={css.navigationItem}>
                    <p className={css.userEmail}>{user.email}</p>
                    <button onClick={handleLogout} className={css.logoutButton}>
                        Logout
                    </button>
                </li>
            </>
        );
    }

    return (
        <>
            <li className={css.navigationItem}>
                <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
                    Login
                </Link>
            </li>
            <li className={css.navigationItem}>
                <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
                    Sign up
                </Link>
            </li>
        </>
    );
}