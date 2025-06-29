import { memo, useEffect, useRef, useState  } from "react";
import { startTransition } from 'react';

import { NotificationItemType } from "../../contexts/NotificationContext";
import { Description, Paragraph, Subtitle } from "./Texts";
import Svg from "./Svg";

interface Props {
    notification: NotificationItemType;
    onClose?: (e: any) => void
}



function NotificationItem({ notification, onClose }: Props) {

    const [transition, seTtransition] = useState(false)
    const [closeTransition, setCloseTransition] = useState(false)

    const [ height, setHeight ] = useState(0)

    const ref = useRef<HTMLDivElement>(null)

    function handleIcon() {

        const { type } = notification

        if(type == 'success') return { icon: 'check', className: 'h-7 w-7 fill-green-600' }
        if(type == 'error') return { icon: 'close', className: 'h-7 w-7 fill-red-600' }
        if(type == 'warning') return { icon: 'triangle-exclamation', className: 'h-7 w-7 fill-yellow-600' }
        if(type == 'alert') return { icon: 'triangle-exclamation', className: 'h-7 w-7 fill-yellow-600' }

        return { icon: 'check', className: 'h-7 w-7 fill-green-600' }

    }

    function handleTitle(): string {

        const { title, type } = notification

        if(title) return title

        if(type == 'error') return 'Error'
        if(type == 'warning') return 'Warning'
        if(type == 'success') return 'Success'
        if(type == 'alert') return 'Alert'

        return 'Success'

    }

    function handleDescription(): string {

        const { description, type } = notification

        if(description) return description

        if(type == 'error') return 'An error occurred'
        if(type == 'warning') return 'Warning, check the information'
        if(type == 'success') return 'Operation completed successfully'
        if(type == 'alert') return 'Alert, check the information'

        return 'Operation completed successfully'

    }

    function getHeight() {

        if(!ref.current.clientHeight) return

        setHeight(ref.current.clientHeight)

    }

    function start() {

        startTransition(() => {

            if(!notification.time) return
    
            seTtransition(true)

            getHeight()

            setTimeout(()=> setCloseTransition(true), (notification.time - 400))

        })

    }

    useEffect(()=> {

        start()

    }, [])


    return (

        // <article key={notification._id} id={String(notification._id)} className={`z-[999] flex w-80 relative duration-300 ${closeTransition ? 'h-0 opacity-0 overflow-hidden' : 'h-24'}`}>
        //     <div className={`${ transition ? '-translate-x-96' : ''} z-[999] absolute left-96 opacity-100 ease-in-out duration-700 bg-background-2 border dark:bg-background-2-dark dark:border-dark rounded-lg w-full h-full p-3 gap-3 flex shadow-sm pointer-events-auto`}>

        //         <section className="pt-1">
        //             {
        //                 notification.type == 'success' ?  <Svg.Check className="h-5 w-5 fill-green-600"/> 
        //                 : notification.type == 'warning' ? <Svg.TriangleExclamation className="h-5 w-5 fill-yellow-500" />
        //                 : notification.type == 'error' ? <Svg.Close className="h-5 w-5 fill-red-600" />
        //                 : null
        //             }
        //         </section>
    
                
        //         <section className='flex flex-col gap-1 justify-around'>
        //             <span className='font-semibold text-color-1 dark:text-color-1-dark text-base'>{notification.title}</span>
        //             <p className='font-medium text-color-1 dark:text-color-1-dark opacity-90 text-sm'>{notification.description}</p>
        //         </section>
    
        //         <section onClick={()=> setCloseTransition(true)} className="ml-auto">
        //             <Svg.Close className="fill-color-1 dark:fill-color-1-dark w-4 h-4 cursor-pointer"/>
        //         </section>

        //     </div>
        // </article>
        <article onClick={()=> setCloseTransition(true)} key={notification._id} id={String(notification._id)} className={`w-80 relative duration-300 ${closeTransition ? 'h-0 opacity-0 overflow-hidden mb-0' : 'mb-3'}`} style={{ height: closeTransition ? '' : `${height}px` }}>
            <div ref={ref} className={`${ transition ? '-translate-x-96' : ''} content-notification z-[999] absolute left-96 opacity-100 ease-in-out duration-700 w-80 h-fit border bg-background-2 p-4 gap-4 rounded-2xl flex flex-col shadow-sm pointer-events-auto`}>

                <section className="flex gap-3 items-center">

                    <Svg name={handleIcon().icon} className={handleIcon().className}/>

                    <Subtitle>{handleTitle()}</Subtitle>

                    <Svg name="close" className="fill-color-1 text-color-1 w-6 h-6 cursor-pointer ml-auto"/>

                </section>

                <section className="flex">

                    <Paragraph>{handleDescription()}</Paragraph>

                </section>

            </div>
        </article>

    )

}

export default  memo(NotificationItem)