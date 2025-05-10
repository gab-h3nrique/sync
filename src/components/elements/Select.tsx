'use client'

import React, { RefObject, useRef, useState } from 'react'
import Svg from '../icons/Svg'
import Modal from '../modals/Modal'

interface Props {

  data: any[],
  value?: any,
  renderItem: (e: any, index?: number) => any,

  className?: string,
  style?: string

  childClassName?: string,
  childStyle?: string

}

export default function Select(props: Props) {

  const { data, value, renderItem, className, style, childClassName, childStyle, ...rest } = props

  const [ isOpen, setIsOpen] = useState(false)

  const list: any[] = [];

  data.forEach((e, i) => {

    list.push(renderItem(e, i))

  })

  function close() {

    setIsOpen(false)

  }

  function open() {

    setIsOpen(true)

  }

  return (

    <>

      <div onClick={close} className={`fixed top-0 left-0 backdrop-blur-[1.5px] w-full h-full ${!isOpen ? "opacity-0 pointer-events-none hidden" : "opacity-1 pointer-events-auto z-[30]"}`}></div>

      <div className='relative flex'>
        
        <button onClick={open} className={`relative flex gap-3 w-fit border description bg-background-2 text-color-1 dark:bg-background-2-dark dark:text-color-1-dark font-semibold py-1.5 px-4 rounded-lg hover:scale-[1.01] duration-150 ${className}`} {...rest as any}>
          <span>{value}</span>
          <Svg.Angle className='ml-auto w-4 h-4 fill-color-1 dark:fill-color-1-dark rotate-180 mt-[.25rem]'/>
        </button>

        <Modal isOpen={isOpen} onClose={close}>
          <div className="border rounded-lg bg-background-2 flex flex-col gap-2 py-4 px-5 w-fit h-fit max-h-72 text-color-1 text-clor-1-dark description overflow-auto" >
            { 
              list.map((item, i) => (
                <div key={i} className='cursor-pointer hover:scale-[1.01] duration-150' onClick={close}>{item}</div>
              )) 
            }
          </div>
        </Modal>

      </div>


    </>


  )
}