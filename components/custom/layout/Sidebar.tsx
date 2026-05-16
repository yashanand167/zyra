import { PanelRightOpen, Search, Plus, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import useNotesStore from "@/stores/notes.store";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Sidebar() {
    const { notes, activeNote, setActiveNote, isSidebarOpen, setIsSidebarOpen } = useNotesStore();
    const { data: session } = authClient.useSession();
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                }
            }
        });
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-zinc-50 dark:bg-zinc-900 border-r border-border flex flex-col transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                lg:relative lg:translate-x-0 h-screen
            `}>
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-black dark:bg-white rounded-md flex items-center justify-center">
                        <span className="text-white dark:text-black text-xs font-bold">Z</span>
                    </div>
                    <h1 className="font-semibold text-sm tracking-tight text-zinc-900 dark:text-zinc-100">Zyra</h1>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
                    <PanelRightOpen size={16} />
                </Button>
            </div>

            <div className="px-3 py-2">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search notes..."
                        className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4">
                <div className="flex items-center justify-between mb-2 px-2">
                    <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">All notes</h2>
                </div>
                <div className="space-y-1">
                    {notes?.map((note) => (
                        <Button key={note.id} variant="ghost" onClick={() => setActiveNote(note)} className="w-full justify-start gap-2 h-9 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 px-3">
                            <span className="text-sm font-medium">{note.title}</span>
                        </Button>
                    ))}
                </div>
            </div>

            <div className="p-4 border-t border-border mt-auto space-y-2">
                {session?.user && (
                    <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/50">
                        <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 font-bold uppercase shrink-0">
                            {session.user.name?.[0] || "U"}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate leading-tight">
                                {session.user.name}
                            </span>
                            <span className="text-[10px] font-medium text-zinc-500 truncate leading-tight">
                                {session.user.email}
                            </span>
                        </div>
                    </div>
                )}
                <Button variant="ghost" className="w-full justify-start gap-2 h-9 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 px-3">
                    <Settings size={16} />
                    <span className="text-sm font-medium">Settings</span>
                </Button>
                <Button 
                    variant="ghost" 
                    onClick={handleLogout}
                    className="w-full justify-start gap-2 h-9 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 px-3"
                >
                    <LogOut size={16} />
                    <span className="text-sm font-medium">Logout</span>
                </Button>
            </div>
        </aside>
        </>
    )
}