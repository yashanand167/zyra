'use client'

import { Logo } from "@/public/Logo";
import { motion } from "motion/react"
import { useNotes } from "@/app/Context/NotesContext";
import { Plus } from "lucide-react";

export default function Header() {
    const { selectedNote, addNote, notes } = useNotes();

    const handleNewNote = async () => {
        // await addNote("Untitled Note", "Start writing...");
    }

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-zinc-50 border-b border-zinc-200">

            <div className="flex flex-row items-center gap-1 font-medium">
                <span className="text-zinc-500">My Notes/</span>
                <span className="text-zinc-700">
                    {notes.length === 0 ? "No notes formed yet" : (selectedNote?.title || "Select a note")}
                </span>
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNewNote}
                className="flex flex-row items-center gap-4 px-6 py-3 bg-transparent border border-black text-black hover:bg-gradient-to-r hover:from-black hover:to-zinc-600 hover:text-white hover:border-transparent transition-all text-sm rounded-[14px] ml-auto"
            >
                <Plus size={20} />
                New Note
            </motion.button>
        </header>
    )
}