"use client"

import { useState, useEffect } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { toast } from "sonner"
import { Loader2, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function RegisterPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    // Check for session and redirect
    const { data: session, isPending } = authClient.useSession()

    useEffect(() => {
        if (session) {
            router.push("/dashboard")
        }
    }, [session, router])

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } = await authClient.signUp.email({
                email,
                password,
                name,
            })

            if (error) {
                toast.error(error.message || "Could not create account")
            } else {
                toast.success("Account created successfully")
                router.push("/dashboard")
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    if (isPending || session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-950">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-zinc-100/50 dark:from-zinc-900/20 to-transparent blur-3xl opacity-50" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-40" />
            </div>

            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                <ArrowLeft size={16} />
                Back to home
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10"
            >
                <Card className="border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-2xl shadow-black/5 rounded-[2rem]">
                    <CardHeader className="space-y-1 pt-10 px-8">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-8 w-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 font-bold italic text-lg">z</div>
                            <span className="text-xl font-bold tracking-tighter italic">zyra</span>
                        </div>
                        <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
                        <CardDescription className="text-zinc-500 dark:text-zinc-400">
                            Join Zyra to start capturing your best ideas
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 ml-1">Full Name</label>
                                <Input
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="h-12 rounded-xl border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 ml-1">Email</label>
                                <Input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-12 rounded-xl border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 ml-1">Password</label>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="h-12 rounded-xl border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100"
                                />
                            </div>
                            <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl bg-zinc-900 hover:bg-black dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-bold transition-all active:scale-[0.98] mt-4">
                                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Account"}
                            </Button>
                        </form>
                        <div className="mt-8 text-center">
                            <p className="text-sm text-zinc-500">
                                Already have an account?{" "}
                                <Link href="/login" className="font-bold text-zinc-900 dark:text-zinc-100 hover:underline">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
