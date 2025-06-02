'use client'

import React, { memo } from 'react'

interface Props {

  isOpen: boolean
  onClose?: () => void
  children: React.ReactNode
  className?: string

}

function Dialog(props: Props) {


  const { isOpen, onClose, children, className, ...rest } = props


  return (

    <>

      <div onClick={(e)=> { e.stopPropagation(); onClose && onClose() }} className={`dialog-backdrop fixed top-0 left-0 backdrop-blur-[.8px] w-screen h-screen ${!isOpen ? "opacity-0 pointer-events-none hidden" : "opacity-1 pointer-events-auto z-[30]"}`}></div>
      
      <section onClick={(e)=> { e.stopPropagation(); onClose && onClose() }} className={`dialog absolute top-0 left-0 m-auto w-fit h-fit z-[31] ${ isOpen ? 'flex' : 'hidden' }`}>

        <div className={`flex w-fit h-fit bg-background-2 dark:bg-background-2-dark ${className}`} {...rest}>
          {children}
        </div>

      </section>

    </>

  )

}

export default memo(Dialog)