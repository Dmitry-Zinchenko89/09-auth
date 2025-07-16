'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';

type Props = {
    id: string;
};

export default function NoteDetails({ id }: Props) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError || !data) return <p>Error loading note</p>;

    return (
        <article>
            <h2>{data.title}</h2>
            <p>{data.content}</p>
            <p>#{data.tag}</p>
        </article>
    );
}