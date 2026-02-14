'use client'

import { type Editor } from '@tiptap/react'
import {
    Bold,
    Italic,
    Underline
} from 'lucide-react'

type Props = {
    editor: Editor | null
}

export function Toolbar({ editor }: Props) {
    if (!editor) {
        return null
    }

    return (
        <div className="flex items-center gap-1 border border-input bg-transparent rounded-md p-1 mb-2 w-fit">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`p-2 rounded-md transition-colors hover:bg-muted ${editor.isActive('bold') ? 'bg-muted text-primary' : 'text-muted-foreground'
                    }`}
                title="Bold"
            >
                <Bold className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`p-2 rounded-md transition-colors hover:bg-muted ${editor.isActive('italic') ? 'bg-muted text-primary' : 'text-muted-foreground'
                    }`}
                title="Italic"
            >
                <Italic className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                disabled={!editor.can().chain().focus().toggleUnderline().run()}
                className={`p-2 rounded-md transition-colors hover:bg-muted ${editor.isActive('underline') ? 'bg-muted text-primary' : 'text-muted-foreground'
                    }`}
                title="Underline"
            >
                <Underline className="w-4 h-4" />
            </button>
        </div>
    )
}
