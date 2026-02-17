"use client"

import { useEffect, useState } from "react"

export default function useTheme() {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("zyra-theme");
        if (savedTheme) {
            setTheme(savedTheme as "light" | "dark");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("zyra-theme", theme);
    }, [theme]);

    return [theme, setTheme] as const;
}