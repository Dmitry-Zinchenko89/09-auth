'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

import css from './SignUpPage.module.css';

export default function SignUpPage() {
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            const user = await registerUser(email, password, {});
            setUser(user);
            router.push('/profile');
        } catch {
            setError('Не вдалося зареєструватися. Спробуйте ще раз.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={css.form}>
            <h1 className={css.title}>Реєстрація</h1>

            <input
                className={css.input}
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                className={css.input}
                type="password"
                name="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            {error && <p className={css.error}>{error}</p>}

            <button type="submit" className={css.button}>
                Зареєструватися
            </button>
        </form>
    );
}