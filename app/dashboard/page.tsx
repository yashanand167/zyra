'use client'

import Header from "@/components/custom/layout/Header";
import Sidebar from "@/components/custom/layout/Sidebar";
import Tiptap from "@/components/custom/Tiptap";
import Toolbar from "@/components/custom/Toolbar";
import useNotesStore from "@/stores/notes.store";
import { useEffect } from "react";

export default function DashboardPage() {
  const { setNotes } = useNotesStore();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("/api/notes");
        if (response.ok) {
          const data = await response.json();
          setNotes(data);
        }
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };

    fetchNotes();
  }, [setNotes]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <Toolbar />
        <main className="flex-1 overflow-hidden">
          <Tiptap />
        </main>
      </div>
    </div>
  )
}
