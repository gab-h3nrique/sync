import { memo, useEffect, useRef, useState } from "react";
import Svg from "../icons/Svg";
import { NotificationItemType } from "@/contexts/NotificationContext";

interface Props {
    notification: NotificationItemType;
    onClose?: (e: any) => void
}

function NotificationItem({ notification, onClose }: Props) {

    const [startTransition, setStartTransition] = useState(false)
    const [closeTransition, setCloseTransition] = useState(false)

    function start() {

        if(!notification.time) return

        setStartTransition(true)
        setTimeout(()=> setCloseTransition(true), (notification.time - 300))

    }

    useEffect(()=> {

        start()

    }, [])


    return (

        <article key={notification._id} id={String(notification._id)} className={`z-[999] flex w-80 relative duration-300 ${closeTransition ? 'h-0 opacity-0 overflow-hidden' : 'h-24'}`}>
            <div className={`${ startTransition ? '-translate-x-96' : ''} z-[999] absolute left-96 opacity-100 ease-in-out duration-700 bg-background-2 border dark:bg-background-2-dark dark:border-dark rounded-lg w-full h-full p-3 gap-3 flex shadow-sm pointer-events-auto`}>

                <section className="pt-1">
                    {
                        notification.type == 'success' ?  <Svg.Check className="h-5 w-5 fill-green-600"/> 
                        : notification.type == 'warning' ? <Svg.TriangleExclamation className="h-5 w-5 fill-yellow-500" />
                        : notification.type == 'error' ? <Svg.Close className="h-5 w-5 fill-red-600" />
                        : null
                    }
                </section>
    
                
                <section className='flex flex-col gap-1 justify-around'>
                    <span className='font-semibold text-color-1 dark:text-color-1-dark text-base'>{notification.title}</span>
                    <p className='font-medium text-color-1 dark:text-color-1-dark opacity-90 text-sm'>{notification.description}</p>
                </section>
    
                <section onClick={()=> setCloseTransition(true)} className="ml-auto">
                    <Svg.Close className="fill-color-1 dark:fill-color-1-dark w-4 h-4 cursor-pointer"/>
                </section>

            </div>
        </article>

    )

}

export default  memo(NotificationItem)