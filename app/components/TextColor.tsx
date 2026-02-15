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

    return (
        <div className="flex items-center gap-2 border border-zinc-200 p-2 rounded-lg">
            {colors.map((color) => (
                <button
                    key={color}
                    onClick={() => {
                        (editor.chain().focus() as any).setColor(color).run();

                    }}
                    className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${editor.isActive('textStyle', { color })
                        ? 'ring-2 ring-offset-2'
                        : 'hover:opacity-80'
                        }`}
                    style={{
                        backgroundColor: color === '#000000' ? '#ffffff' : `${color}20`,
                        color: color,
                        boxShadow: color === '#000000' ? 'inset 0 0 0 1px #e4e4e7' : 'none',
                        // For the black option, we want a black ring. For others, use their color.
                        ['--tw-ring-color' as any]: color
                    }}
                    title={color}
                >
                    <span className="text-xl font-medium">Aa</span>
                </button>
            ))}
        </div>
    )
}