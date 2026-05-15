import { Bold, Italic, Underline, ListOrdered, List, Link, CodeXml, Image } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type Editor } from '@tiptap/react'

export default function Toolbar({ editor }: { editor: Editor | null }) {
    if (!editor) return null;

    return (
        <div className="border-b border-border bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-20">
            <div className="max-w-4xl mx-auto w-full flex items-center gap-8 px-12 py-3">
                <div className="flex items-center gap-2">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`h-8 w-8 transition-colors ${editor.isActive('bold') ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                    >
                        <Bold size={18} />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`h-8 w-8 transition-colors ${editor.isActive('italic') ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                    >
                        <Italic size={18} />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={`h-8 w-8 transition-colors ${editor.isActive('underline') ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                    >
                        <Underline size={18} />
                    </Button>
                </div>

                <div className="h-5 w-[1px] bg-zinc-200 dark:bg-zinc-800" />

                <div className="flex items-center gap-2">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`h-8 w-8 transition-colors ${editor.isActive('orderedList') ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                    >
                        <ListOrdered size={18} />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`h-8 w-8 transition-colors ${editor.isActive('bulletList') ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
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
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={`h-8 w-8 transition-colors ${editor.isActive('codeBlock') ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                    >
                        <CodeXml size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
                        <Image size={18} />
                    </Button>
                </div>
            </div>
        </div>
    )
}