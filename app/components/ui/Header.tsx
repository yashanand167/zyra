'use client'

import { Logo } from "@/public/Logo";
import { motion } from "motion/react"
import { useNotes } from "@/app/Context/NotesContext";
import { Plus, Save } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const { selectedNote, addNote, saveNote, notes } = useNotes();
    const [isSaving, setIsSaving] = useState(false);

    const handleNewNote = async () => {
        await addNote("Untitled Note", "Start writing...");
    }

    const handleSaveNote = async () => {
        if (selectedNote) {
            setIsSaving(true);
            await saveNote(selectedNote.id);
            setIsSaving(false);
        }
    }

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-zinc-50 border-b border-zinc-200">

            <div className="flex flex-row items-center gap-1 font-medium">
                <span className="text-zinc-500">My Notes/</span>
                <span className="text-zinc-700">
                    {notes.length === 0 ? "No notes formed yet" : (selectedNote?.title || "Select a note")}
                </span>
            </div>

            <div className="flex gap-4 ml-auto">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSaveNote}
                    disabled={!selectedNote || isSaving}
                    className={`flex flex-row items-center gap-2 px-6 py-3 bg-transparent border border-black text-black hover:bg-black hover:text-white transition-all text-sm rounded-[14px] ${(!selectedNote || isSaving) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <Save size={20} />
                    {isSaving ? "Saving..." : "Save"}
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNewNote}
                    className="flex flex-row items-center gap-2 px-6 py-3 bg-transparent border border-black text-black hover:bg-gradient-to-r hover:from-black hover:to-zinc-600 hover:text-white hover:border-transparent transition-all text-sm rounded-[14px]"
                >
                    <Plus size={20} />
                    New Note
                </motion.button>
            </div>
        </header>
    )
}