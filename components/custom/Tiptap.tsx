import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import CodeBlock from '@tiptap/extension-code-block'
import { useEffect, useMemo, useRef } from 'react'

import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { BulletList } from '@tiptap/extension-list'
import Toolbar from './Toolbar'


const Tiptap = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Color,
            TextStyle,
            Underline,
            BulletList,
            Link.configure({
                openOnClick: false,
            }),
            CodeBlock.configure({
                HTMLAttributes: {
                    class: 'rounded-md bg-zinc-100 dark:bg-zinc-900 p-4 font-mono text-sm',
                },
            }),
        ],
        content: '<p>Hello World! 🌎️</p>',
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose prose-zinc dark:prose-invert max-w-none focus:outline-none min-h-[500px]',
            },
        },
    })

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <Toolbar editor={editor} />
            <div className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto px-12 py-16 bg-white dark:bg-zinc-950 shadow-sm border-x border-zinc-100 dark:border-zinc-900">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default Tiptap