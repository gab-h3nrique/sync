'use client'

import React, { memo, RefObject, useRef } from 'react'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any,
  value: any,
  type?: string,
  icon?: any
  placeholder?: string
  className?: string
  [x: string]: any;
}

function Input(props: Props) {

  const { onChange, value, icon, className, ...rest } = props

  const initialValue = useRef<any>(value)

  function change(e: React.ChangeEvent<HTMLInputElement>) {


    console.log('hehe')


  }

  return (

    // <button className={`w-fit description border bg-background-2 text-color-1 font-semibold py-1.5 px-4 rounded-lg hover:scale-[1.01] duration-150 ${className}`} {...rest}>
    //   {children}
    // </button>

    <label className={`flex gap-2 description bg-background-2 border border-border text-color-1 font-semibold py-[.438rem] px-4 rounded-lg hover:scale-[.998] duration-150 ${className}`} {...rest}>
      {icon}
      <input onChange={onChange} value={value as any || ''} className='description text-color-1 dark:text-color-1-dark py-[.125rem] bg-transparent outline-0 w-full h-full' {...rest}/>
    </label>

  )
}

export default memo(Input)

