import { type Editor } from '@tiptap/react'

type Props = {
    editor: Editor
}

export default function TextColor({ editor }: Props) {
    const colors = [
        '#000000', // Black
        '#ef4444', // Red
        '#3b82f6', // Blue
        '#10b981', // Emerald
        '#f59e0b', // Amber
        '#8b5cf6', // Violet
        '#ec4899', // Pink
    ]

    return (
        <div className="flex items-center gap-1">
            {colors.map((color) => (
                <button
                    key={color}
                    onClick={() => (editor.chain().focus() as any).setColor(color).run()}
                    className={`w-4 h-4 rounded-full border border-gray-200 ${editor.isActive('textStyle', { color }) ? 'ring-2 ring-offset-1 ring-primary' : ''
                        }`}
                    style={{ backgroundColor: color }}
                    title={color}
                />
            ))}
        </div>
    )
}