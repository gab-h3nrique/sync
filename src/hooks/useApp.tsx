import { AppContext } from "@/contexts/AppContext";
import { useContext } from "react";

export default function useApp() {

    const context = useContext(AppContext) as any;

    if(!context) throw new Error('context should be used inside its provider');

    return context

};