'use client'

import { useNotes } from "@/app/Context/NotesContext";
import { EllipsisVertical, Trash } from "lucide-react";

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
                            <div
                                key={note.id}
                                className={`flex items-center justify-between text-left p-3 rounded-lg transition-all ${selectedNote?.id === note.id
                                    ? "bg-gradient-to-r from-black to-zinc-700 text-white "
                                    : "hover:bg-black hover:text-white border border-zinc-200"
                                    }`}>
                                <button
                                    className="flex-1 overflow-hidden text-left"
                                    onClick={() => selectNote(note)}
                                >
                                    <div className="font-medium text-sm truncate">{note.title}</div>
                                </button>

                                <button
                                    className="ml-2 p-1 rounded-lg hover:bg-red-500 hover:text-white transition-all"
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