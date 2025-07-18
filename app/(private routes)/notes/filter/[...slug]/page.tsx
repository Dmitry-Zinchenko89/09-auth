import type { Metadata } from 'next';
import { getNotes } from '@/lib/api/serverApi'; // 💥 тут серверная версия
import NotesClient from './Notes.client';

type Props = {
    params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const tag = slug ? decodeURIComponent(slug.join('/')) : undefined;

    return {
        title: `Notes tagged with "${tag}" – NoteHub`,
        description: `Список нотаток із тегом "${tag}" у застосунку NoteHub.`,
        openGraph: {
            title: `Notes tagged with "${tag}" – NoteHub`,
            description: `Список нотаток із тегом "${tag}" у застосунку NoteHub.`,
            url: `https://notehub-your-url.com/notes/filter/${tag}`,
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'NoteHub preview image',
                },
            ],
        },
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;

    const tag =
        Array.isArray(slug) && slug.length > 0
            ? decodeURIComponent(slug.join('/'))
            : undefined;

    const page = 1;
    const search = '';

    const data = await getNotes({ page, search, tag }); // ✅ теперь используется серверная функция

    return <NotesClient tag={tag} initialData={data} />;
}