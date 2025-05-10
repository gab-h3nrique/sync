"use client"

import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }:any) => {

    const [ theme, setTheme ] = useState('light');

    function change(value: string) {

        if(typeof window == "undefined") return

        setTheme(value)
        localStorage.setItem('theme', value)

    }
 
    function load() {

        const storageTheme = localStorage.getItem('theme')
        setTheme(storageTheme || 'dark')

        if(storageTheme == 'dark' || !storageTheme) document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')

    }

    useEffect(()=> {

        if(typeof window !== "undefined") {

            load()

        }

    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, change }}>
            {children}
        </ThemeContext.Provider>
    )
}