'use client'

import useNotesStore from "@/stores/notes.store"
import { useState, useEffect } from "react";
import { CornerUpLeft, CornerUpRight, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Header() {
    const { activeNote } = useNotesStore();

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const [isSaved, setIsSaving] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleOnClickSave = () => {

    }

    return (
        <header className="flex items-center justify-between p-5 border-b border-l border-r border-border">
            <h1 className="text-gray-500">{activeNote?.title || "No Note Selected"}</h1>

            <div>
                {isSaved ? <p>Saved</p> : <button className="text-amber-500">Save Changes</button>}
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                        <CornerUpLeft size={20} />
                    </button>

                    <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                        <CornerUpRight size={20} />
                    </button>
                </div>

                <div className="w-[1px] h-6 bg-border" />

                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                >
                    {mounted && (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
                    {!mounted && <div className="w-5 h-5" />}
                </button>
            </div>
        </header>
    )
}