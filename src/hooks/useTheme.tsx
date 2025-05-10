'use client'

import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";

export default function useTheme() {

    const context = useContext(ThemeContext) as any;

    if(!context) throw new Error('context should be used inside its provider');

    return context

};