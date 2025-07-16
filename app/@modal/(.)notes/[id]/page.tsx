import { fetchNoteById } from '@/lib/api/clientApi';
import NotePreview from './NotePreview.client';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import getQueryClient from '@/lib/getQueryClient';

interface Props {
    params: Promise<{ id: string }>
};

export default async function NoteModalPage({ params }: Props) {
    const queryClient = getQueryClient();
    const parsedId = ((await params).id);

    await queryClient.prefetchQuery({
        queryKey: ['note', parsedId],
        queryFn: () => fetchNoteById(parsedId),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreview id={parsedId} />
        </HydrationBoundary>
    );
}