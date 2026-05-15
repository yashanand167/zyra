'use client'

import { Bold, Italic, Underline, ListOrdered, List, Link, CodeXml, Image, FileDown, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import useNotesStore from "@/stores/notes.store"
import DropDownMenu from "./DropDownColor"
import DropDownFont from "./DropDownFont"
import { useEditorState } from "@tiptap/react"

export default function Toolbar() {
    const { editor } = useNotesStore();

    const states = useEditorState({
        editor: editor!,
        selector: (ctx) => ({
            isBold: ctx.editor.isActive('bold'),
            isItalic: ctx.editor.isActive('italic'),
            isUnderline: ctx.editor.isActive('underline'),
            isOrderedList: ctx.editor.isActive('orderedList'),
            isBulletList: ctx.editor.isActive('bulletList'),
            isCodeBlock: ctx.editor.isActive('codeBlock'),
        }),
    });

    if (!editor) return null;

    return (
        <div className="border-b border-border bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-20 overflow-x-auto no-scrollbar">
            <div className="max-w-4xl mx-auto w-full flex items-center gap-4 lg:gap-8 px-4 lg:px-12 py-3 min-w-max">
                <div className="flex items-center gap-2">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`h-8 w-8 transition-colors ${states.isBold ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                    >
                        <Bold size={18} />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`h-8 w-8 transition-colors ${states.isItalic ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                    >
                        <Italic size={18} />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={`h-8 w-8 transition-colors ${states.isUnderline ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                    >
                        <Underline size={18} />
                    </Button>
                </div>

                <div className="h-5 w-[1px] bg-zinc-200 dark:bg-zinc-800" />

                <div className="flex items-center gap-2">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`h-8 w-8 transition-colors ${states.isOrderedList ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                    >
                        <ListOrdered size={18} />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`h-8 w-8 transition-colors ${states.isBulletList ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                    >
                        <List size={18} />
                    </Button>
                </div>

                <div className="h-5 w-[1px] bg-zinc-200 dark:bg-zinc-800" />

                
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
                        <Link size={18} />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={`h-8 w-8 transition-colors ${states.isCodeBlock ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                    >
                        <CodeXml size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
                        <Image size={18} />
                    </Button>
                </div>
                <div className="h-5 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex items-center gap-2">
                    {/* <DropDownFont editor={editor} /> */}
                    <DropDownMenu editor={editor} />
                </div>

                <div className="ml-auto flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 px-3 gap-2 border-zinc-200 dark:border-zinc-800">
                        <FileDown size={14} />
                        <span className="hidden lg:inline text-xs font-medium">Export PDF</span>
                    </Button>
                    <Button size="sm" className="h-8 px-3 gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-black">
                        <Save size={14} />
                        <span className="hidden lg:inline text-xs font-medium">Save Changes</span>
                    </Button>
                </div>

            </div>
        </div>
    )
}