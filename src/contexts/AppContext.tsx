"use client"

import Cookie from "@/providers/cookie";
import { UserType } from "@/types/userType";
import { createContext, useContext, useMemo, useState } from "react";
import jwt from 'jsonwebtoken';

// interface UserContextType {

//     user: UserType | undefined,
//     setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
//     load: () => void

// }



// export const userContext = (): UserContextType  => {

//     const context = useContext(UserContext);

//     if(!context) throw new Error('context should be used inside its provider');

//     return context

// };

interface AppType {

    // user: UserType

}

export const AppContext = createContext<AppType | undefined>(undefined);

export function AppProvider({ children }:any) {

    const [ user, setUser ] = useState<any>();
    const [ user1, setUser1 ] = useState<any>();

    const contextValue = useMemo(()=> ({

        user,
        setUser,
        user1,
        setUser1,

    }), [user, user1])

    return (

        <AppContext.Provider value={contextValue}>

            {children}

        </AppContext.Provider>

    )
}