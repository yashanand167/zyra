import { PanelRightOpen, Search, Plus, Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import useNotesStore from "@/stores/notes.store";

export default function Sidebar() {
    const { notes, activeNote, setActiveNote } = useNotesStore();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <aside className="w-64 h-screen border-r border-border bg-zinc-50/50 dark:bg-zinc-900/50 flex flex-col">
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-black dark:bg-white rounded-md flex items-center justify-center">
                        <span className="text-white dark:text-black text-xs font-bold">Z</span>
                    </div>
                    <h1 className="font-semibold text-sm tracking-tight text-zinc-900 dark:text-zinc-100">Zyra</h1>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
                    <PanelRightOpen size={16} />
                </Button>
            </div>

            <div className="px-3 py-2">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search notes..."
                        className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4">
                <div className="flex items-center justify-between mb-2 px-2">
                    <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">All notes</h2>
                </div>
                <div className="space-y-1">
                    {notes?.map((note) => (
                        <Button key={note.id} variant="ghost" onClick={() => setActiveNote(note)} className="w-full justify-start gap-2 h-9 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 px-3">
                            <span className="text-sm font-medium">{note.title}</span>
                        </Button>
                    ))}
                </div>
            </div>

            <div className="p-4 border-t border-border mt-auto space-y-2">
                <Button className="w-full justify-start gap-2 h-9 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-black text-white shadow-sm transition-all active:scale-[0.98]">
                    <Plus size={16} />
                    <span className="text-sm font-medium">Add Note</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 h-9 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 px-3">
                    <Settings size={16} />
                    <span className="text-sm font-medium">Settings</span>
                </Button>
            </div>
        </aside>
    )
}