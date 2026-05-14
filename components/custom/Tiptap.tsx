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
    })

    return <EditorContent editor={editor} />
}

export default Tiptap