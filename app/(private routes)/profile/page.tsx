import Image from 'next/image';
import Link from 'next/link';
import { getProfile } from '@/lib/api/serverApi';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Профіль користувача',
    description: 'Особистий кабінет з інформацією про користувача',
};
export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
    const user = await getProfile();

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Профіль</h1>
            <Image
                src={user.avatarURL ?? '/img/default-avatar.png'}
                alt={user.username}
                width={100}
                height={100}
                style={{ borderRadius: '50%' }}
            />
            <p>Ім’я: {user.username}</p>
            <p>Email: {user.email}</p>

            <Link href="/profile/edit">Редагувати профіль</Link>
        </div>
    );
}