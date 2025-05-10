'use client'

import { memo, useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";

export interface Props {

    id?: any;
    isOpen: boolean
    onClose?: (e: HTMLDivElement | null) => void
    children: React.ReactNode
    className?: string

}

const Modal = ({ id, isOpen, onClose, children, className}:Props) => {

    const ref = useRef<HTMLDivElement | null>(null)

    const ID = id || parseInt(String(Math.random() * 9584848443))

    const [portal, setPortal] = useState<HTMLElement>()

    useEffect(()=>{

        if (typeof window !== "undefined") {

            setPortal(document.getElementById('portal') as HTMLElement);

        }

    },[])

    return (

        portal ? ReactDom.createPortal(

            <>
                <div onClick={()=> onClose && onClose(ref.current)} className={`absolute backdrop-blur-[.8px] top-0 right-0 w-screen h-screen z-[50] ${isOpen ? 'flex' : 'hidden'}`}></div>
                <div ref={ref} id={`${ID}`} className={`absolute w-fit h-fit justify-center items-center top-0 right-0 bottom-0 left-0 m-auto z-[51] ${isOpen ? 'flex' : 'hidden'}`} >
                    {children}
                    <span className="text-white">{isOpen ? 'true' : 'false'}</span>
                </div>
                
            </>,

            portal

        ) : null

    )
    
}

export default memo(Modal)