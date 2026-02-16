'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Note } from '../types/Notes.type';

interface NotesContextType {
    notes: Note[];
    selectedNote: Note | null;
    isLoading: boolean;
    fetchNotes: () => Promise<void>;
    addNote: (title: string, description: string) => Promise<void>;
    updateNote: (id: string, updates: Partial<Note>) => void;
    saveNote: (id: string) => Promise<void>;
    deleteAllNotes: () => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
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
                if (data.length === 0) {
                    await addNote("Untitled Note", "");
                } else {
                    setNotes(data);
                    if (!selectedNote) {
                        setSelectedNote(data[0]);
                    }
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

    const deleteNote = async (id: string) => {
        try {
            const response = await fetch('/api/notes', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                setNotes((prev) => prev.filter((note) => note.id !== id));
                if (selectedNote?.id === id) {
                    setSelectedNote(null);
                }
            }
        } catch (error) {
            console.error('Failed to delete note:', error);
        }
    };

    const updateNote = (id: string, updates: Partial<Note>) => {
        setNotes((prev) =>
            prev.map((note) => (note.id === id ? { ...note, ...updates } : note))
        );
        if (selectedNote?.id === id) {
            setSelectedNote((prev) => (prev ? { ...prev, ...updates } : null));
        }
    };

    const saveNote = async (id: string) => {
        const noteToSave = notes.find((n) => n.id === id);
        if (!noteToSave) return;

        try {
            const response = await fetch('/api/notes', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(noteToSave),
            });

            if (!response.ok) {
                throw new Error('Failed to save note');
            }
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    const deleteAllNotes = async () => {
        try {
            const response = await fetch('/api/notes?deleteAll=true', {
                method: 'DELETE',
            });

            if (response.ok) {
                setNotes([]);
                setSelectedNote(null);
            }
        } catch (error) {
            console.error('Failed to delete all notes:', error);
        }
    };

    const selectNote = (note: Note) => {
        setSelectedNote(note);
    };

    // Load from localStorage on mount (if API fails or is empty? Or just precedence?)
    // Actually, request said "before the notes should be in local storage".
    // So we sync state to localStorage.
    useEffect(() => {
        if (notes.length > 0) {
            localStorage.setItem('zyra-notes', JSON.stringify(notes));
        }
    }, [notes]);

    // On load, we could try to load from localStorage first for instant load
    useEffect(() => {
        const saved = localStorage.getItem('zyra-notes');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.length > 0) {
                    setNotes(parsed);
                }
            } catch (e) {
                console.error("Failed to parse local notes", e);
            }
        }
        fetchNotes();
    }, []);

    return (
        <NotesContext.Provider value={{ notes, selectedNote, isLoading, fetchNotes, deleteNote, addNote, updateNote, saveNote, deleteAllNotes, selectNote }}>
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
