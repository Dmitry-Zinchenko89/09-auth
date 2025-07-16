'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import css from './NotePreview.module.css';
import { Note } from '@/types/note';

interface NotePreviewProps {
    id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
    const router = useRouter();

    const { data, isLoading, isError } = useQuery<Note>({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
    });

    const handleClose = () => {
        router.back();
    };

    if (isLoading) return <p>Завантаження...</p>;
    if (isError || !data) return <p>Сталася помилка</p>;

    return (
        <div className={css.overlay}>
            <div className={css.modal}>
                <button onClick={handleClose} className={css.closeBtn}>
                    ✕
                </button>
                <h2>{data.title}</h2>
                <p>{data.content}</p>
            </div>
        </div>
    );
}