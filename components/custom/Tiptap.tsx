'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { Toolbar } from './Toolbar'
import { useNotes } from '../../app/Context/NotesContext'
import { useEffect, useMemo } from 'react'

import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { BulletList } from '@tiptap/extension-list'

const Tiptap = () => {
    const { selectedNote, updateNote } = useNotes();

    const extensions = useMemo(() => [
        StarterKit,
        Underline,
        TextStyle,
        Color,
        BulletList,
    ], [])

    const editor = useEditor({
        extensions,
        content: '',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
            },
        },

        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            if (selectedNote) {
                updateNote(selectedNote.id, { description: editor.getHTML() });
            }
        },
    })

    useEffect(() => {
        if (editor && selectedNote) {
            if (editor.getHTML() !== selectedNote.description) {
                editor.commands.setContent(selectedNote.description)
            }
        } else if (editor && !selectedNote) {
            editor.commands.clearContent()
        }
    }, [selectedNote, editor])

    if (!selectedNote) {
        return (
            <div className="flex items-center justify-center h-full text-zinc-400">
                Select a note to view or edit
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 h-full ">
            <Toolbar editor={editor} />
            <div className="flex-1 overflow-y-auto bg-white rounded-[20px]">
                <div className='border-b border-zinc-200'>
                    <h1 className="text-xl p-5">{selectedNote.title}</h1>
                </div>
                <EditorContent editor={editor} className="flex-1 overflow-y-auto bg-white rounded-[20px]" />
            </div>
        </div>
    )
}

export default Tiptap