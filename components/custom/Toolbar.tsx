import { Bold, Italic, Underline, ListOrdered, List, Link, CodeXml, Image, FileDown, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import useNotesStore from "@/stores/notes.store"
import DropDownColor from "./DropDownColor"
import DropDownFont from "./DropDownFont"
import { useEditorState } from "@tiptap/react"
import { motion } from "motion/react"

export default function Toolbar() {
    const { editor } = useNotesStore();

    const states = useEditorState({
        editor: editor!,
        selector: (ctx) => ({
            isBold: ctx.editor?.isActive('bold') ?? false,
            isItalic: ctx.editor?.isActive('italic') ?? false,
            isUnderline: ctx.editor?.isActive('underline') ?? false,
            isOrderedList: ctx.editor?.isActive('orderedList') ?? false,
            isBulletList: ctx.editor?.isActive('bulletList') ?? false,
            isCodeBlock: ctx.editor?.isActive('codeBlock') ?? false,
        }),
    });

    if (!editor) return null;

    const ToolButton = ({ onClick, isActive, icon: Icon, label }: any) => (
        <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            onMouseDown={(e) => e.preventDefault()}
            onClick={onClick}
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 ${
                isActive 
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 ring-1 ring-zinc-900/10" 
                : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
            title={label}
        >
            <Icon size={18} />
        </motion.button>
    );

    return (
        <div className="border-b border-border bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-20 overflow-x-auto no-scrollbar">
            <div className="max-w-5xl mx-auto w-full flex items-center gap-2 lg:gap-4 px-4 py-3 min-w-max">
                {/* Text Formatting */}
                <div className="flex items-center gap-1 bg-zinc-50/50 dark:bg-zinc-900/50 p-1 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                    <ToolButton 
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        isActive={states.isBold}
                        icon={Bold}
                        label="Bold"
                    />
                    <ToolButton 
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        isActive={states.isItalic}
                        icon={Italic}
                        label="Italic"
                    />
                    <ToolButton 
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        isActive={states.isUnderline}
                        icon={Underline}
                        label="Underline"
                    />
                </div>

                <div className="h-6 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-1" />

                {/* Lists */}
                <div className="flex items-center gap-1 bg-zinc-50/50 dark:bg-zinc-900/50 p-1 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                    <ToolButton 
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        isActive={states.isOrderedList}
                        icon={ListOrdered}
                        label="Ordered List"
                    />
                    <ToolButton 
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        isActive={states.isBulletList}
                        icon={List}
                        label="Bullet List"
                    />
                </div>

                <div className="h-6 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-1" />

                {/* Media & Code */}
                <div className="flex items-center gap-1 bg-zinc-50/50 dark:bg-zinc-900/50 p-1 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                    <ToolButton 
                        onClick={() => {}}
                        isActive={false}
                        icon={Link}
                        label="Insert Link"
                    />
                    <ToolButton 
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        isActive={states.isCodeBlock}
                        icon={CodeXml}
                        label="Code Block"
                    />
                    <ToolButton 
                        onClick={() => {}}
                        isActive={false}
                        icon={Image}
                        label="Insert Image"
                    />
                </div>

                <div className="h-6 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-1" />

                {/* Dropdowns */}
                <div className="flex items-center gap-2">
                    <DropDownFont editor={editor} />
                    <DropDownColor editor={editor} />
                </div>

                {/* Actions */}
                <div className="ml-auto flex items-center gap-2">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex h-9 items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 text-xs font-semibold text-zinc-600 dark:text-zinc-400 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    >
                        <FileDown size={14} />
                        <span className="hidden lg:inline">Export PDF</span>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex h-9 items-center gap-2 rounded-xl bg-zinc-900 px-5 text-xs font-bold text-white transition-all hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                        <Save size={14} />
                        <span className="hidden lg:inline">Save Changes</span>
                    </motion.button>
                </div>
            </div>
        </div>
    )
}