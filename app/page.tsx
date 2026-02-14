'use client'

import Header from "./components/ui/Header";
import Sidebar from "./components/ui/Sidebar";
import Tiptap from "./components/Tiptap";
import { NotesProvider } from "./Context/NotesContext";
import { Toolbar } from "./components/Toolbar";

export default function Home() {
  return (
    <NotesProvider>
      <div className="flex min-h-screen bg-zinc-50 font-sans">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <Header />
          <div className="max-w-3xl mx-auto h-full">
            <Tiptap />
          </div>
        </main>
      </div>
    </NotesProvider>
  );
}
