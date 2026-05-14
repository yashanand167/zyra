import { create } from "zustand";

interface Note {
    id: string;
    title: string;
    description: string;
    createdAt: string;
}

interface NotesState {
    notes: Note[];
    addNote: (note: Note) => void;
    deleteNote: (id: string) => void;
    updateNote: (id: string, note: Note) => void;

    setNotes: (notes: Note[]) => void;
    activeNote: Note | null;
    setActiveNote: (notes:Note) => void;
}

const useNotesStore = create<NotesState>((set) => ({
    notes: [],
    addNote: (note: Note) => set((state) => ({ notes: [...state.notes, note] })),
    deleteNote: (id: string) => set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
    updateNote: (id: string, note: Note) => set((state) => ({ notes: state.notes.map((n) => n.id === id ? note : n) })),
    setNotes: (notes: Note[]) => set({ notes }),
    activeNote: null,
    setActiveNote: (note) => set({ activeNote: note }),
}));

export default useNotesStore;