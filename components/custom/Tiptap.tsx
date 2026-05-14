'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { useEffect, useMemo, useRef } from 'react'

import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { BulletList } from '@tiptap/extension-list'


const Tiptap = () => {
    const editor = useEditor({
        extensions: [StarterKit, Color, TextStyle, Underline, BulletList],
        content: '<p>Hello World! 🌎️</p>',
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose prose-zinc dark:prose-invert max-w-none focus:outline-none min-h-[500px]',
            },
        },
    })

    return (
        <div className="w-full max-w-4xl mx-auto px-12 py-16 bg-white dark:bg-zinc-950 min-h-screen shadow-sm border-x border-zinc-100 dark:border-zinc-900">
            <EditorContent editor={editor} />
        </div>
    )
}

export default Tiptap