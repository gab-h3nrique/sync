"use client"

import Cookie from "@/providers/cookie";
import { UserType } from "@/types/userType";
import { createContext, useContext, useEffect, useState } from "react";
import jwt from 'jsonwebtoken';

interface UserContextType {

    user: UserType | undefined,
    setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
    load: () => void

}

export const UserContext = createContext<UserContextType | undefined>(undefined);

// export const userContext = (): UserContextType  => {

//     const context = useContext(UserContext);

//     if(!context) throw new Error('context should be used inside its provider');

//     return context

// };

export const UserProvider = ({ children }:any) => {

    const [ user, setUser ] = useState<UserType>();

    async function load() {// get again user from localStorage

        const token = await Cookie.get('auth') as string
        
        if(!user || !user.id) setUser(jwt.decode(token) as UserType)
            
    }

    useEffect(()=> {

        if(typeof window !== "undefined") {

            load()

        }

    },[])

    return (
        <UserContext.Provider value={{ user, setUser, load }}>
            {children}
        </UserContext.Provider>
    )
}