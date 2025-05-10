'use client'

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import NotificationItem from "@/components/notifications/NotificationsItem";

interface ContextType {

    list: NotificationItemType[] | undefined,
    push: (object: NotificationItemType) => void

}

type Push = (object: NotificationItemType) => void

export interface NotificationItemType {

    _id?: number,
    type: 'alert' | 'success' | 'warning' | 'error',
    title: string,
    description: string,
    time?: number

}

export const NotificationContext = createContext<ContextType | undefined>(undefined);
export const DispatchNotificationContext = createContext<Push | undefined>(undefined);

export const NotificationProvider = ({ children }:any) => {

    const [ list, setList ] = useState<NotificationItemType[]>([])

    const removeItem = useCallback((id: number)=> {

        setList((prev) => (prev.filter(e=> e._id !== id)))

    }, [])

    const push = useCallback((item: NotificationItemType)=> {

        const TIMER = item.time && item.time >= 2500 ? item.time : 2500

        const ID = parseInt(String(Math.random() * 9543))

        setList((prev) => {

            setTimeout(()=> removeItem(ID), TIMER)

            return [...prev, {...item, _id: ID, time: TIMER }]

        })

    }, [])

    const contextValue = useMemo(()=> ({

        list,
        push

    }), [list])

    return (

        <NotificationContext.Provider value={contextValue}>
            <DispatchNotificationContext.Provider value={push}>

                <section className='z-[999] w-full h-fit flex absolute pointer-events-none overflow-hidden'>

                    <div className='relative flex flex-col ml-auto p-3 gap-3 '>

                        { list?.map(item =>  <NotificationItem key={item._id} notification={item} onClose={()=> removeItem(item._id || -1)} />) }

                    </div>

                </section>

                {children}

            </DispatchNotificationContext.Provider>
        </NotificationContext.Provider>
    )
}