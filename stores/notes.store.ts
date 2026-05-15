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
    editor: any | null;
    setEditor: (editor: any) => void;
    isSidebarOpen: boolean;
    setIsSidebarOpen: (open: boolean) => void;
}

const useNotesStore = create<NotesState>((set) => ({
    notes: [],
    addNote: (note: Note) => set((state) => ({ notes: [...state.notes, note] })),
    deleteNote: (id: string) => set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
    updateNote: (id: string, note: Note) => set((state) => ({ notes: state.notes.map((n) => n.id === id ? note : n) })),
    setNotes: (notes: Note[]) => set({ notes }),
    activeNote: null,
    setActiveNote: (note) => set({ activeNote: note }),
    editor: null,
    setEditor: (editor) => set({ editor }),
    isSidebarOpen: false,
    setIsSidebarOpen: (open) => set({ isSidebarOpen: open }),
}));

export default useNotesStore;