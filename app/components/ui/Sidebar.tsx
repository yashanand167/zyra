'use client'

import { useNotes } from "@/app/Context/NotesContext";

export default function Sidebar() {
    const { notes, selectedNote, selectNote, isLoading } = useNotes();

    return (
        <aside className="w-64 bg-zinc-50 border-r border-zinc-200 h-screen overflow-y-auto">
            <div className="p-4">
                <h2 className="text-lg font-medium mb-4">Notes</h2>

                {isLoading ? (
                    <div className="text-zinc-500 text-sm">Loading...</div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {notes.map((note) => (
                            <button
                                key={note.id}
                                onClick={() => selectNote(note)}
                                className={`text-left p-3 rounded-lg transition-colors ${selectedNote?.id === note.id
                                    ? "bg-zinc-200"
                                    : "hover:bg-zinc-100"
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