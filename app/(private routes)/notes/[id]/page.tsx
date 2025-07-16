import type { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api/clientApi';
import NoteDetails from './NoteDetails.client';

type Props = {
    params: Promise<{ id: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const note = await fetchNoteById((await params).id);

    return {
        title: `${note.title} | NoteHub`,
        description: note.content.slice(0, 150),
    };
}

export default async function NotePage({ params }: Props) {
    return <NoteDetails id={(await params).id} />;
}