import { EllipsisVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PanelRightOpen } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeNoteTab, setIsActiveNoteTab] = useState(false);

    return (
        <aside className="w-64 h-screen">
            <div>
                <div>
                    <h1>Zyra</h1>
                </div>
                <PanelRightOpen/>
            </div>

            <div>
                <h1>All notes</h1>
            </div>
        </aside>
    )
}