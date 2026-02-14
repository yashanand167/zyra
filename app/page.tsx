'use client'

import Header from "./components/ui/Header";
import Sidebar from "./components/ui/Sidebar";
import { NotesProvider } from "./Context/NotesContext";

export default function Home() {
  return (
    <NotesProvider>
      <div className="flex min-h-screen bg-zinc-50 font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            {/* Editor will go here */}
            <div className="max-w-3xl mx-auto">
              {/* Tiptap editor component should be moved here later */}
            </div>
          </main>
        </div>
      </div>
    </NotesProvider>
  );
}
