'use client'

import useNotesStore from "@/stores/notes.store"
import { useState, useEffect } from "react";
import { CornerUpLeft, CornerUpRight, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

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
        <header className="flex items-center justify-between px-8 py-4 border-b border-border bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md sticky top-0 z-10">
            <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Active Note</span>
                <h1 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {activeNote?.title || "Untitled Note"}
                </h1>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                    {isSaved ? (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-medium">Saved</span>
                        </div>
                    ) : (
                        <Button 
                            onClick={handleOnClickSave}
                            size="sm"
                            className="bg-amber-500 hover:bg-amber-600 text-white border-none shadow-sm h-8 px-4"
                        >
                            Save Changes
                        </Button>
                    )}
                </div>

                <div className="h-6 w-[1px] bg-zinc-200 dark:bg-zinc-800" />

                <div className="flex items-center gap-1.5">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
                        <CornerUpLeft size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
                        <CornerUpRight size={18} />
                    </Button>
                    
                    <div className="mx-1.5 h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                    >
                        {mounted && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
                        {!mounted && <div className="w-4 h-4" />}
                    </Button>
                </div>
            </div>
        </header>
    )
}