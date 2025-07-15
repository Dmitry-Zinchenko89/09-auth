'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { registerUser } from '@/lib/api/clientApi';
import css from './SignUpPage.module.css';

export default function SignUpPage() {
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const user = await registerUser(email, password, { username });
            setUser(user);
            router.push('/profile');
        } catch {
            setError('Failed to register. Try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={css.form}>
            <h2 className={css.title}>Sign Up</h2>

            {error && <p className={css.error}>{error}</p>}

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={css.input}
                required
            />

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
                Register
            </button>
        </form>
    );
}