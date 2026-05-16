"use client"

import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import Link from "next/link";
import { ArrowRight, Sun, Moon, Twitter, Github, Mail, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleGetStarted = () => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/register");
    }
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500">
      <Header />

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-zinc-100/50 dark:from-zinc-900/20 to-transparent blur-3xl opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-40" />
      </div>

      <main className="relative pt-32 pb-20 px-6 flex flex-col items-center text-center">
        <section className="flex flex-col items-center gap-12 sm:gap-16 max-w-5xl w-full">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="px-5 py-2 border border-zinc-200/50 dark:border-zinc-800/50 rounded-full bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-md"
          >
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
              Minimal Notes, Maximum Focus
            </h2>
          </motion.div>

          {/* Hero Content */}
          <div className="flex flex-col items-center gap-8 md:gap-10 w-full">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[18vw] sm:text-8xl md:text-9xl lg:text-[15rem] font-bold tracking-tighter text-zinc-900 dark:text-zinc-100 leading-[0.75] italic select-none"
            >
              zyra
            </motion.h1>

            <div className="flex flex-col items-center gap-6 max-w-3xl">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-2xl sm:text-4xl lg:text-6xl font-medium tracking-tight text-zinc-400 dark:text-zinc-500 leading-tight mt-2"
              >
                Notes that elevate your thinking
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-sm sm:text-lg text-zinc-400 dark:text-zinc-600 max-w-xl leading-relaxed"
              >
                A minimalist space to write, organize, and refine your thoughts effortlessly. Distraction-free by design
              </motion.p>
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="group h-14 px-20 rounded-2xl text-xl gap-3 bg-zinc-900 hover:bg-black dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 transition-all active:scale-[0.98] shadow-2xl shadow-zinc-900/20 dark:shadow-zinc-100/10 font-medium"
            >
              Start Writing
              <ArrowRight size={22} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* App Mockup Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-12 w-full max-w-6xl p-2 rounded-[2rem] bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm"
          >
            <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl">
              <Image
                src="/DarkTheme.png"
                alt="Zyra Dashboard Preview"
                width={2400}
                height={1500}
                className="w-full object-cover"
              />
            </div>
            {/* Decorative Glow behind image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-zinc-200/20 to-zinc-400/20 dark:from-zinc-800/20 dark:to-zinc-900/20 blur-2xl -z-10 rounded-[3rem]" />
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGetStarted = () => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/register");
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-6 left-0 right-0 z-50 px-6"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-xl shadow-black/5">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 font-bold italic">z</div>
            <h1 className="text-xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100 italic">zyra</h1>
          </Link>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-10 w-10 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            {mounted && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
            {!mounted && <div className="w-4 h-4" />}
          </Button>

          <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />

          {!session && (
            <Link href="/login">
                <Button variant="ghost" className="h-10 px-4 rounded-xl text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                Login
                </Button>
            </Link>
          )}
          
          <Button 
            onClick={handleGetStarted}
            className="h-10 px-6 rounded-xl text-sm font-bold bg-zinc-900 hover:bg-black dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 transition-all active:scale-95 shadow-lg shadow-zinc-900/10"
          >
            {session ? "Dashboard" : "Get Started"}
          </Button>
        </div>
      </div>
    </motion.nav>
  )
}

const Footer = () => {
  return (
    <footer className="border-t border-zinc-100 dark:border-zinc-900 pt-20 pb-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 font-bold italic">z</div>
            <h2 className="text-xl font-bold tracking-tighter italic">zyra</h2>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed">
            The minimalist note-taking space designed for deep thinkers and digital craftsmen.
            Capture ideas, organize thoughts, and elevate your productivity.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <Link href="#" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"><Twitter size={18} /></Link>
            <Link href="#" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"><Github size={18} /></Link>
            <Link href="#" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"><Mail size={18} /></Link>
            <Link href="#" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"><Globe size={18} /></Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Product</h3>
            <ul className="flex flex-col gap-2.5">
              <li><Link href="#" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Features</Link></li>
              <li><Link href="#" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Desktop App</Link></li>
              <li><Link href="#" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Integrations</Link></li>
              <li><Link href="#" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Changelog</Link></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Resources</h3>
            <ul className="flex flex-col gap-2.5">
              <li><Link href="#" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Documentation</Link></li>
              <li><Link href="#" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">© 2026 Zyra Labs. Designed for Deep Work.</p>
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          All Systems Operational
        </div>
      </div>
    </footer>
  )
}