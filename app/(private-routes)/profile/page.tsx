'use client';

import css from './ProfilePage.module.css';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';

export default function ProfilePage() {
    const user = useAuthStore((state) => state.user);

    if (!user) return null;

    return (
        <div className={css.profile}>
            <h1>My Profile</h1>
            <Image
                src={user.avatarURL || '/avatar-placeholder.png'}
                alt="User Avatar"
                width={120}
                height={120}
                className={css.avatar}
            />
            <p>
                <strong>Username:</strong> {user.username}
            </p>
            <p>
                <strong>Email:</strong> {user.email}
            </p>
        </div>
    );
}