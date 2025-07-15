'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './SignInPage.module.css';

export default function SignInPage() {
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const user = await loginUser(email, password);
            setUser(user);
            router.push('/profile');
        } catch {
            setError('Failed to sign in. Try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={css.form}>
            <h2 className={css.title}>Sign In</h2>

            {error && <p className={css.error}>{error}</p>}

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={css.input}
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={css.input}
                required
            />

            <button type="submit" className={css.button}>
                Sign In
            </button>
        </form>
    );
}