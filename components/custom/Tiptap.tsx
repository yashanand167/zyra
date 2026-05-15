import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import CodeBlock from '@tiptap/extension-code-block'
import Placeholder from '@tiptap/extension-placeholder'
import FontFamily from '@tiptap/extension-font-family'
import { useEffect } from 'react'
import Image from '@tiptap/extension-image'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { BulletList } from '@tiptap/extension-list'
import useNotesStore from '@/stores/notes.store'
import { Button } from '@/components/ui/button'
import { FileDown, Save } from 'lucide-react'


const Tiptap = () => {
    const { setEditor, activeNote } = useNotesStore();

    const editor = useEditor({
        extensions: [
            StarterKit,
            Color,
            TextStyle,
            Underline,
            BulletList,
            FontFamily,
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
            }),
            CodeBlock.configure({
                HTMLAttributes: {
                    class: 'rounded-md bg-zinc-100 dark:bg-zinc-900 p-4 font-mono text-sm',
                },
            }),
            Placeholder.configure({
                placeholder: 'start writing...',
            }),
        ],
        content: '<p>Hello World! 🌎️</p>',
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose prose-zinc dark:prose-invert max-w-none focus:outline-none min-h-[500px]',
            },
        },
        onCreate: ({ editor }) => {
            setEditor(editor);
        },
        onDestroy: () => {
            setEditor(null);
        },
    })

    useEffect(() => {
        if (editor) {
            setEditor(editor);
        }
    }, [editor, setEditor]);

    return (
        <div className="w-full h-full p-10 bg-white dark:bg-zinc-950 overflow-y-auto">
            <EditorContent editor={editor} />
        </div>
    )
}

export default Tiptap