import { type Editor } from '@tiptap/react'
import { useState } from 'react'

type Props = {
    editor: Editor
}

export default function TextColor({ editor }: Props) {
    const colors = [
        '#000000', // Black
        '#ef4444', // Red
        '#3b82f6', // Blue
        '#10b981', // Emerald
    ]

    const activeColor = editor.getAttributes('textStyle').color || '#000000';

    return (
        <div className="flex items-center gap-2 border border-zinc-200 p-2 rounded-lg">
            {colors.map((color) => (
                <button
                    key={color}
                    onClick={() => {
                        (editor.chain().focus() as any).setColor(color).run();
                    }}
                    className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${activeColor === color
                        ? ''
                        : 'hover:opacity-80'
                        }`}
                    style={{
                        backgroundColor: color === '#000000' ? '#ffffff' : `${color}20`,
                        color: color,
                        border: activeColor === color ? `2px solid ${color}` : (color === '#000000' ? '1px solid #e4e4e7' : '1px solid transparent'),
                    }}
                    title={color}
                >
                    <span className="text-xl font-medium">Aa</span>
                </button>
            ))}
        </div>
    )
}