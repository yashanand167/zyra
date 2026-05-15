import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check } from "lucide-react"
import { Editor } from "@tiptap/react";

interface Props {
    editor: Editor | null;
}

const TEXT_COLORS = [
    { label: "Default", value: "" },
    { label: "Red", value: "#ef4444" },
    { label: "Orange", value: "#f97316" },
    { label: "Yellow", value: "#eab308" },
    { label: "Green", value: "#22c55e" },
    { label: "Blue", value: "#3b82f6" },
    { label: "Pink", value: "#ec4899" },
    { label: "Gray", value: "#6b7280" },
]

export default function DropDownMenu({ editor }: Props) {
    if (!editor) return null;
    const color = editor.getAttributes("textStyle").color;

    const handleColorChange = (color: string) => {
        editor.chain().focus().setColor(color).run();
    };

    editor.chain().focus().setColor(color).run();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="px-3 py-1.5 text-sm font-medium bg-zinc-100 dark:bg-zinc-900 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                    Color
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {TEXT_COLORS.map((c) => (
                    <DropdownMenuItem
                        key={c.label}
                        onClick={() => handleColorChange(c.value)}
                        className={`flex items-center justify-between px-3 py-1.5 text-sm font-medium ${c.value === color ? "bg-zinc-100 dark:bg-zinc-900" : ""
                            }`}
                    >
                        <span>{c.label}</span>
                        {c.value === color && <Check size={16} />}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}