'use client'

import { type Editor } from '@tiptap/react'
import {
    Bold,
    Italic,
    Underline,
    Download,
    Save
} from 'lucide-react'
import TextColor from './TextColor'

import { useNotes } from '../Context/NotesContext'
import { useState } from 'react'

type Props = {
    editor: Editor | null
}

export function Toolbar({ editor }: Props) {
    const { saveNote, selectedNote } = useNotes();
    const [isSaving, setIsSaving] = useState(false);

    if (!editor) {
        return null
    }

    const handleSave = async () => {
        if (selectedNote) {
            setIsSaving(true);
            await saveNote(selectedNote.id);
            setIsSaving(false);
        }
    }

    return (
        <div className="flex items-center justify-between w-full mt-4 mb-3">
            <div className="flex items-center gap-1 border border-zinc-200 bg-white rounded-xl p-1 w-fit">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`p-2 rounded-lg transition-all hover:bg-zinc-100 ${editor.isActive('bold') ? 'bg-black text-white hover:bg-black/90' : 'text-zinc-500 hover:text-black'
                        }`}
                    title="Bold"
                >
                    <Bold className="w-4 h-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={`p-2 rounded-lg transition-all hover:bg-zinc-100 ${editor.isActive('italic') ? 'bg-black text-white hover:bg-black/90' : 'text-zinc-500 hover:text-black'
                        }`}
                    title="Italic"
                >
                    <Italic className="w-4 h-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={!editor.can().chain().focus().toggleUnderline().run()}
                    className={`p-2 rounded-lg transition-all hover:bg-zinc-100 ${editor.isActive('underline') ? 'bg-black text-white hover:bg-black/90' : 'text-zinc-500 hover:text-black'
                        }`}
                    title="Underline"
                >
                    <Underline className="w-4 h-4" />
                </button>

                <div className="w-[1px] h-5 bg-zinc-200 mx-1"></div>

                <TextColor editor={editor} />
            </div>

            <div className=''>
                <button>
                    Bullets
                </button>
            </div>

            <div className='flex flex-row items-center gap-3'>
                <button
                    className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-700 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 hover:text-black hover:border-zinc-300 transition-all active:scale-95'
                >
                    <Download className="w-4 h-4" />
                    Export PDF
                </button>

                <button
                    onClick={handleSave}
                    disabled={isSaving || !selectedNote || selectedNote.description.length === 0}
                    className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-black rounded-xl hover:bg-zinc-800 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                    <Save className="w-4 h-4" />
                    {isSaving ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    )
}
