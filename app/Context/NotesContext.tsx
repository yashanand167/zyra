'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Note {
    id: string;
    title: string;
    description: string;
    createdAt: string;
}

interface NotesContextType {
    notes: Note[];
    selectedNote: Note | null;
    isLoading: boolean;
    fetchNotes: () => Promise<void>;
    addNote: (title: string, description: string) => Promise<void>;
    selectNote: (note: Note) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNotes = async () => {
        try {
            const response = await fetch('/api/notes');
            if (response.ok) {
                const data = await response.json();
                setNotes(data);
                if (!selectedNote && data.length > 0) {
                    setSelectedNote(data[0]);
                }
            }
        } catch (error) {
            console.error('Failed to fetch notes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const addNote = async (title: string, description: string) => {
        try {
            const response = await fetch('/api/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description }),
            });

            if (response.ok) {
                const newNote = await response.json();
                setNotes((prev) => [...prev, newNote]);
                setSelectedNote(newNote); 
            }
        } catch (error) {
            console.error('Failed to add note:', error);
        }
    };

    const selectNote = (note: Note) => {
        setSelectedNote(note);
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <NotesContext.Provider value={{ notes, selectedNote, isLoading, fetchNotes, addNote, selectNote }}>
            {children}
        </NotesContext.Provider>
    );
}

export function useNotes() {
    const context = useContext(NotesContext);
    if (context === undefined) {
        throw new Error('useNotes must be used within a NotesProvider');
    }
    return context;
}
