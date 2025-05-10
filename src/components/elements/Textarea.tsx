'use client'

import React, { memo, RefObject, useRef } from 'react'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => any,
  value: any,
  type?: string,
  icon?: any
  placeholder?: string
  className?: string
  [x: string]: any;
}

function Textarea(props: Props) {

  const { onChange, value, icon, className, ...rest } = props

  return (

    // <button className={`w-fit description border bg-background-2 text-color-1 font-semibold py-1.5 px-4 rounded-lg hover:scale-[1.01] duration-150 ${className}`} {...rest}>
    //   {children}
    // </button>

    <label className={`flex gap-2 description border bg-background-2 text-color-1 dark:bg-background-2-dark dark:text-color-1-dark font-semibold py-[.438rem] px-4 rounded-lg hover:scale-[1.01] duration-150 ${className}`} {...rest}>
      <textarea onChange={onChange} value={value as any  || ''} className='description text-color-1 dark:text-color-1-dark bg-transparent outline-0 w-full h-full' {...rest}/>
    </label>

  )
}

export default memo(Textarea)

