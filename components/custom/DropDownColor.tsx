"use client";

import { Editor, useEditorState } from "@tiptap/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { Check, Palette, RotateCcw } from "lucide-react";

interface Props {
    editor: Editor | null;
}

const TEXT_COLORS = [
    { label: "Default", value: "", bg: "bg-zinc-200 dark:bg-zinc-800" },
    { label: "Red", value: "#ef4444", bg: "bg-red-500" },
    { label: "Orange", value: "#f97316", bg: "bg-orange-500" },
    { label: "Amber", value: "#f59e0b", bg: "bg-amber-500" },
    { label: "Yellow", value: "#eab308", bg: "bg-yellow-500" },
    { label: "Lime", value: "#84cc16", bg: "bg-lime-500" },
    { label: "Green", value: "#22c55e", bg: "bg-green-500" },
    { label: "Emerald", value: "#10b981", bg: "bg-emerald-500" },
    { label: "Teal", value: "#14b8a6", bg: "bg-teal-500" },
    { label: "Cyan", value: "#06b6d4", bg: "bg-cyan-500" },
    { label: "Sky", value: "#0ea5e9", bg: "bg-sky-500" },
    { label: "Blue", value: "#3b82f6", bg: "bg-blue-500" },
    { label: "Indigo", value: "#6366f1", bg: "bg-indigo-500" },
    { label: "Violet", value: "#8b5cf6", bg: "bg-violet-500" },
    { label: "Purple", value: "#a855f7", bg: "bg-purple-500" },
    { label: "Fuchsia", value: "#d946ef", bg: "bg-fuchsia-500" },
    { label: "Pink", value: "#ec4899", bg: "bg-pink-500" },
    { label: "Rose", value: "#f43f5e", bg: "bg-rose-500" },
];

export default function DropDownColor({ editor }: Props) {
    const states = useEditorState({
        editor: editor!,
        selector: ctx => ({
            currentColor: ctx.editor?.getAttributes("textStyle").color ?? "",
        }),
    });

    if (!editor) return null;

    const handleColorChange = (color: string) => {
        if (!color) {
            editor.chain().focus().unsetColor().run();
            return;
        }
        editor.chain().focus().setColor(color).run();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <motion.button
                    whileTap={{ scale: 0.96 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur px-3 py-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        <Palette size={14} />
                    </div>
                    
                    <motion.div
                        layout
                        className="h-4 w-4 rounded-full border border-black/10 dark:border-white/10"
                        style={{
                            backgroundColor: states.currentColor || "#a1a1aa",
                        }}
                    />
                </motion.button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="start"
                className="w-64 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl p-4"
            >
                <div className="flex items-center justify-between mb-4 px-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Text Color</span>
                    <button 
                        onClick={() => handleColorChange("")}
                        className="text-[10px] flex items-center gap-1 font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                        <RotateCcw size={10} />
                        Reset
                    </button>
                </div>

                <div className="grid grid-cols-6 gap-2">
                    {TEXT_COLORS.map((color, i) => {
                        const active = (!color.value && !states.currentColor) || states.currentColor === color.value;

                        return (
                            <motion.button
                                key={i}
                                whileHover={{ scale: 1.2, zIndex: 10 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                onClick={() => handleColorChange(color.value)}
                                className={`relative flex h-8 w-8 items-center justify-center rounded-xl transition-all ${color.bg} ${
                                    active ? "ring-2 ring-offset-2 ring-zinc-900 dark:ring-zinc-100 dark:ring-offset-zinc-950" : "ring-0"
                                }`}
                                title={color.label}
                            >
                                {active && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <Check size={14} className="text-white" />
                                    </motion.div>
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}