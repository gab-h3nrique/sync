import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

export default function useUser() {

    const context = useContext(UserContext);

    if(!context) throw new Error('context should be used inside its provider');

    return context

};