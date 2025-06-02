'use client'

import React, { RefObject, useRef } from 'react'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any,
  value: boolean,
  className?: string
}

function Switch(props: Props) {

  const { onChange, value, ...rest } = props

  const initialValue = useRef<any>(value)

  function change(e: React.ChangeEvent<HTMLInputElement>) {


    console.log('hehe')


  }

  return (

    <label className={`relative p-[3px] min-w-[48px] w-[48px] h-[27px] rounded-full select-none cursor-pointer bg-color-3 dark:bg-color-3-dark has-[:checked]:bg-color-1 hover:scale-[1.02] duration-150 ${rest.className}`}>
      <input checked={value ? true : false} type="checkbox" onChange={onChange} className='hidden peer' value={''}/>
      <article className={`bg-background-1 dark;bg-background-1-dark w-[50%] h-full rounded-full peer-checked:translate-x-[100%] duration-300 ease-in-out`}></article>
    </label>

  )
}

export default Switch