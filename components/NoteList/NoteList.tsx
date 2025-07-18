'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';
import css from './NoteList.module.css';
import Modal from '@/components/Modal/Modal';
import NoteDetails from '@/app/(private routes)/notes/[id]/NoteDetails.client';

interface NoteListProps {
    items: Note[];
}

export default function NoteList({ items }: NoteListProps) {
    const queryClient = useQueryClient();
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this note?')) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <>
            <ul className={css.list}>
                {items.map((note) => (
                    <li key={note.id} className={css.listItem}>
                        <div className={css.clickable}>
                            <h2 className={css.title}>{note.title}</h2>
                            <p className={css.content}>{note.content}</p>
                        </div>

                        <div className={css.footer}>
                            <span className={css.tag}>#{note.tag}</span>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={() => setSelectedId(String(note.id))}
                                    className={css.link}
                                >
                                    View Details
                                </button>
                                <button
                                    onClick={() => handleDelete(String(note.id))}
                                    className={css.button}
                                    disabled={deleteMutation.isPending}
                                >
                                    {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {selectedId && (
                <Modal onClose={() => setSelectedId(null)}>
                    <NoteDetails id={selectedId} />
                </Modal>
            )}
        </>
    );
}