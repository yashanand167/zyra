'use client'

import { type Editor } from '@tiptap/react'
import {
    Bold,
    Italic,
    Underline,
    Download,
    Save,
    Logs,
    Heading1
} from 'lucide-react'
import TextColor from './TextColor'

import { useNotes } from '../../Context/NotesContext'
import { useState } from 'react'
import { toast } from 'sonner'

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
            toast.success("Note saved successfully", {
                className: "border border-green-500 bg-green-50 text-green-700",
            });
            setIsSaving(false);
            return true;
        }
        return false;
    }

    const handleExportPDF = async () => {
        if (selectedNote?.description.trim().length === 0) {
            toast.error("You have no content to export ", {
                className: "border border-red-500 bg-red-50 text-red-700",
            });
            return;
        }

        // await handleSave();

        //export as PDF functionality
    }

    return (
        <div className="flex items-center justify-between w-full mt-4 mb-3">
            <div className="flex items-center gap-1 border border-zinc-200 bg-white rounded-xl p-1 w-fit mr-auto">
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

            {/* <div className='flex flex-row items-center gap-1'>
                <div className='border border-zinc-200 p-2 rounded-xl'>
                    <button
                        className="flex flex-col items-center gap-2 text-sm font-medium text-zinc-700 hover:text-black transition-colors"
                    >
                        <Logs className="w-4 h-4" />
                        Bullets
                    </button>
                </div>

                <div className='border border-zinc-200 p-2 rounded-xl'>
                    <button
                        className="flex flex-col items-center gap-2 text-sm font-medium text-zinc-700 hover:text-black transition-colors"
                    >
                        <Heading1 className="w-4 h-4" />
                        Heading 1
                    </button>
                </div>
            </div> */}

            <div className='flex flex-row items-center gap-3 ml-auto'>
                <button
                    className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-700 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 hover:text-black hover:border-zinc-300 transition-all active:scale-95'
                    onClick={handleExportPDF}
                >
                    <Download className="w-4 h-4" />
                    Export PDF
                </button>

                <button
                    onClick={handleSave}
                    disabled={isSaving || !selectedNote || editor.isEmpty}
                    className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-black rounded-xl hover:bg-zinc-800 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                    <Save className="w-4 h-4" />
                    {isSaving ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    )
}
