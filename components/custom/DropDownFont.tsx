"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Type, ChevronDown } from "lucide-react";
import { Editor, useEditorState } from "@tiptap/react";

interface Props {
    editor: Editor | null;
}

const FONTS = [
    { label: "Default", value: "", preview: "Default Font" },
    { label: "Inter", value: "Inter", preview: "Modern Sans" },
    { label: "Comic Sans", value: '"Comic Sans MS", "Comic Sans"', preview: "Playful" },
    { label: "Serif", value: "serif", preview: "Classic Serif" },
    { label: "Monospace", value: "monospace", preview: "Code Mono" },
    { label: "Cursive", value: "cursive", preview: "Script Cursive" },
    { label: "CSS Variable", value: "var(--title-font-family)", preview: "Theme Font" },
    { label: "Exo 2", value: '"Exo 2"', preview: "Futuristic" },
];

export default function DropDownFont({ editor }: Props) {
    const states = useEditorState({
        editor: editor!,
        selector: ctx => {
            if (!ctx.editor) return {} as Record<string, boolean>;
            return FONTS.reduce((acc, font) => {
                if (font.value === "") return acc;
                acc[font.label] = ctx.editor.isActive('textStyle', { fontFamily: font.value });
                return acc;
            }, {} as Record<string, boolean>);
        },
    });

    if (!editor) return null;

    const handleFontChange = (font: string) => {
        if (font === "") {
            editor.chain().focus().unsetFontFamily().run();
        } else {
            editor.chain().focus().setFontFamily(font).run();
        }
    };

    const activeFont = FONTS.find(f => f.value !== "" && states[f.label]) || FONTS[0];

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap"
                rel="stylesheet"
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <motion.button
                        whileTap={{ scale: 0.96 }}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur px-3 py-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900 min-w-[120px]"
                    >
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                            <Type size={14} />
                        </div>
                        <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 truncate flex-1 text-left">
                            {activeFont.label}
                        </span>
                        <ChevronDown size={14} className="text-zinc-400" />
                    </motion.button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent 
                    align="start" 
                    className="w-64 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl p-2 overflow-hidden"
                >
                    <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                        Font Family
                    </div>
                    {FONTS.map((f) => {
                        const isActive = f.value === "" 
                            ? !Object.values(states).some(Boolean)
                            : states[f.label];
                        
                        return (
                            <DropdownMenuItem
                                key={f.label}
                                onClick={() => handleFontChange(f.value)}
                                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm cursor-pointer transition-all mb-0.5 last:mb-0 ${
                                    isActive 
                                    ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100" 
                                    : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100"
                                }`}
                            >
                                <div className="flex flex-col">
                                    <span style={{ fontFamily: f.value }} className="text-base">
                                        {f.label}
                                    </span>
                                    <span className="text-[10px] opacity-60 tracking-tight">
                                        {f.preview}
                                    </span>
                                </div>
                                {isActive && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <Check size={16} className="text-zinc-900 dark:text-zinc-100" />
                                    </motion.div>
                                )}
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}