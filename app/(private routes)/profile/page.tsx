import Image from 'next/image';
import Link from 'next/link';
import { getProfile } from '@/lib/api/serverApi';
import { Metadata } from 'next';
import css from './ProfilePage.module.css';

export const metadata: Metadata = {
    title: 'Профіль користувача',
    description: 'Особистий кабінет з інформацією про користувача',
};

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
    const user = await getProfile();

    return (
        <main className={css.mainContent}>
            <section className={css.profileCard}>
                <div className={css.header}>
                    <h1 className={css.formTitle}>Profile</h1>
                    <Link href="/profile/edit" className={css.editProfileButton}>
                        Edit Profile
                    </Link>
                </div>

                <div className={css.avatarWrapper}>
                    <Image
                        src={user.avatarURL ?? '/img/default-avatar.png'}
                        alt={user.username}
                        width={100}
                        height={100}
                        className={css.avatar}
                    />
                </div>

                <div className={css.profileInfo}>
                    <p><strong>Name:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            </section>
        </main>
    );
}