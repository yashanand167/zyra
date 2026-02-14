'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { Toolbar } from './Toolbar'

const Tiptap = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
        ],
        content: '<p>Hello World! 🌎️</p>',
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,
    })

    return (
        <div className="flex flex-col gap-2">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}

export default Tiptap