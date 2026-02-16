'use client'

import { useNotes } from "@/Context/NotesContext";
import { EllipsisVertical, Trash } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function Sidebar() {
    const { notes, selectedNote, selectNote, isLoading, deleteAllNotes, deleteNote } = useNotes();
    const [showOptions, setShowOptions] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowOptions(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    const handleDelete = async (id: string) => {
        await deleteNote(id);
    }

    return (
        <aside className="w-64 bg-zinc-50 border-r border-zinc-200 h-screen overflow-y-auto">
            <div className="p-4">
                <div className="flex items-center justify-between mb-4 relative" ref={dropdownRef}>
                    <h2 className="text-lg font-medium">Notes</h2>
                    <button onClick={() => setShowOptions(!showOptions)} className="p-1 hover:bg-zinc-200 rounded-md transition-colors">
                        <EllipsisVertical width={20} height={20} className="text-zinc-500" />
                    </button>

                    <AnimatePresence>
                        {showOptions && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 top-8 bg-white border border-zinc-200 rounded-lg shadow-lg py-1 z-10 w-32"
                            >
                                <button
                                    onClick={() => {
                                        if (confirm("Are you sure you want to delete all notes?")) {
                                            deleteAllNotes();
                                        }
                                        setShowOptions(false);
                                    }}
                                    disabled={notes.length < 2}
                                    className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center gap-2 ${notes.length < 2 ? "text-zinc-300 cursor-not-allowed" : "text-red-500 hover:bg-red-50"}`}
                                >
                                    <Trash width={14} height={14} />
                                    Delete All
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>


                {isLoading ? (
                    <div className="text-zinc-500 text-sm">Loading...</div>
                ) : (
                    <div className="flex flex-col gap-2 mt-10">
                        {notes.map((note) => (
                            <div
                                key={note.id}
                                onClick={() => selectNote(note)}
                                className={`flex items-center justify-between text-left p-3 rounded-lg transition-all ${selectedNote?.id === note.id
                                    ? "bg-gradient-to-r from-black to-zinc-700 text-white "
                                    : "hover:bg-black hover:text-white border border-zinc-400"
                                    }`}>
                                <button
                                    className="flex-1 overflow-hidden text-left"
                                    onClick={() => selectNote(note)}
                                >
                                    <div className="font-medium text-sm truncate">{note.title}</div>
                                </button>

                                <button
                                    className="ml-2 p-1 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                                    onClick={() => handleDelete(note.id)}
                                >
                                    <Trash width={16} height={16}
                                        className={`${selectedNote?.id === note.id ? "text-red-500 hover:text-white" : "text-zinc-500 hover:text-white"}`}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </aside>
    )
}