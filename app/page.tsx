'use client'

import Header from "@/components/custom/layout/Header";
import Sidebar from "@/components/custom/layout/Sidebar";
import Tiptap from "../components/custom/Tiptap";
import Toolbar from "@/components/custom/Toolbar";

export default function Home() {

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
