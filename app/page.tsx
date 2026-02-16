'use client'

import Header from "../components/custom/layout/Header";
import Sidebar from "../components/custom/layout/Sidebar";
import Tiptap from "../components/custom/Tiptap";
import { NotesProvider } from "../Context/NotesContext";
import useMobile from "../hooks/useMobile";

export default function Home() {
  const isMobile = useMobile();

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full mx-4 text-center">
          <h2 className="text-xl font-medium mb-2">Desktop Only</h2>
          <p className="text-zinc-600">
            I was too lazy to make it responsive. Hehe
          </p>
        </div>
      </div>
    )
  }

  return (
    <NotesProvider>
      <div className="flex h-screen bg-zinc-50 font-sans overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          <Header />
          <div className="max-w-3xl w-full mx-auto flex-1 h-full overflow-hidden">
            <Tiptap />
          </div>
        </main>
      </div>
    </NotesProvider>
  );
}
