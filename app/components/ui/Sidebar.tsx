'use client'

import { useNotes } from "@/app/Context/NotesContext";
import { EllipsisVertical } from "lucide-react";

export default function Sidebar() {
    const { notes, selectedNote, selectNote, isLoading } = useNotes();

    return (
        <aside className="w-64 bg-zinc-50 border-r border-zinc-200 h-screen overflow-y-auto">
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Notes</h2>
                    <EllipsisVertical width={20} height={20} className="text-zinc-500" />
                </div>


                {isLoading ? (
                    <div className="text-zinc-500 text-sm">Loading...</div>
                ) : (
                    <div className="flex flex-col gap-2 mt-10">
                        {notes.map((note) => (
                            <button
                                key={note.id}
                                onClick={() => selectNote(note)}
                                className={`text-left p-3 rounded-lg transition-all ${selectedNote?.id === note.id
                                    ? "bg-gradient-to-r from-black to-zinc-700 text-white "
                                    : "hover:bg-black hover:text-white"
                                    }`}
                            >
                                <div className="font-medium text-sm truncate">{note.title}</div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </aside>
    )
}