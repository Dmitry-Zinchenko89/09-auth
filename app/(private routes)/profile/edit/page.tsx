'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import css from './EditProfilePage.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { updateProfile } from '@/lib/api/clientApi';

export default function EditProfilePage() {
    const router = useRouter();
    const user = useAuthStore(state => state.user);
    const setUser = useAuthStore(state => state.setUser);

    const [username, setUsername] = useState(user?.username || '');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const updatedUser = await updateProfile({ username });
            setUser(updatedUser);
            router.push('/profile');
        } catch (error) {
            console.error('Failed to update profile', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        router.push('/profile');
    };

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>
                <Image
                    src={user?.avatarURL || '/avatar-placeholder.png'}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                />

                <form className={css.profileInfo} onSubmit={handleSubmit}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            type="text"
                            className={css.input}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <p>Email: {user?.email}</p>

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton} disabled={isLoading}>
                            Save
                        </button>
                        <button type="button" className={css.cancelButton} onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
