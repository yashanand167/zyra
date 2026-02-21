'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo, useRef } from 'react';
import { Note } from '../types/Notes.type';

interface NotesContextType {
    notes: Note[];
    selectedNote: Note | null;
    isLoading: boolean;
    fetchNotes: () => Promise<void>;
    addNote: (title: string, description: string) => Promise<void>;
    updateNote: (id: string, updates: Partial<Note>) => void;
    updateTitle: (id: string, title: string) => void;
    saveNote: (id: string) => Promise<void>;
    deleteAllNotes: () => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
    selectNote: (note: Note) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
    const [notes, setNotes] = useState<Note[]>([]);
    const notesRef = useRef<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        notesRef.current = notes;
    }, [notes]);

    const selectNote = useCallback((note: Note) => {
        setSelectedNote(note);
    }, []);

    const addNote = useCallback(async (title: string, description: string) => {
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
    }, []);

    const fetchNotes = useCallback(async () => {
        try {
            const response = await fetch('/api/notes');
            if (response.ok) {
                const data = await response.json();
                if (data.length === 0) {
                    await addNote("Untitled Note", "");
                } else {
                    setNotes(data);
                    setSelectedNote((prev) => prev ? prev : data[0]);
                }
            }
        } catch (error) {
            console.error('Failed to fetch notes:', error);
        } finally {
            setIsLoading(false);
        }
    }, [addNote]);

    const deleteNote = useCallback(async (id: string) => {
        try {
            const response = await fetch('/api/notes', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                setNotes((prev) => prev.filter((note) => note.id !== id));
                setSelectedNote((prev) => (prev?.id === id ? null : prev));
            }
        } catch (error) {
            console.error('Failed to delete note:', error);
        }
    }, []);

    const updateNote = useCallback((id: string, updates: Partial<Note>) => {
        setNotes((prev) => {
            const next = prev.map((note) => (note.id === id ? { ...note, ...updates } : note));
            notesRef.current = next; // eagerly update ref for saveNote
            return next;
        });
        setSelectedNote((prev) => (prev?.id === id ? { ...prev, ...updates } : prev));
    }, []);

    const saveNote = useCallback(async (id: string) => {
        const noteToSave = notesRef.current.find((n) => n.id === id);
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
    }, []);

    const updateTitle = useCallback((id: string, title: string) => {
        updateNote(id, { title });
    }, [updateNote]);

    const deleteAllNotes = useCallback(async () => {
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
    }, []);

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
    }, [fetchNotes]);

    const value = useMemo(() => ({
        notes,
        selectedNote,
        isLoading,
        fetchNotes,
        addNote,
        updateNote,
        updateTitle,
        saveNote,
        deleteAllNotes,
        deleteNote,
        selectNote
    }), [notes, selectedNote, isLoading, fetchNotes, addNote, updateNote, saveNote, deleteAllNotes, deleteNote, selectNote]);

    return (
        <NotesContext.Provider value={value}>
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
