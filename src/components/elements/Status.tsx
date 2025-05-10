'use client'

import React, { RefObject, useRef } from 'react'
import { Label } from '../texts/Texts'

interface Props {
  value: string,
  className?: string
}

function Status(props: Props) {

  const { value, ...rest } = props

  function titleCase(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  if(value == 'em andamento') return (

    <div className={`flex gap-1 w-fit py-1 px-2 items-center bg-blue-50/10 rounded-md ${rest.className}`} {...rest}>
      <span className='h-2 w-2 rounded-full bg-blue-500'></span>
      <Label className='text-blue-500 truncate'>{ titleCase(value) }</Label>
    </div>

  )

  if(value == 'aguardando peça') return (

    <div className={`flex gap-1 w-fit py-1 px-2 items-center bg-yellow-50/10 rounded-md ${rest.className}`} {...rest}>
      <span className='h-2 w-2 rounded-full bg-yellow-500'></span>
      <Label className='text-yellow-500 truncate'>{ titleCase(value) }</Label>
    </div>

  )

  if(value == 'sem solução') return (

    <div className={`flex gap-1 w-fit py-1 px-2 items-center bg-red-50/10 rounded-md ${rest.className}`} {...rest}>
      <span className='h-2 w-2 rounded-full bg-red-500'></span>
      <Label className='text-red-500 truncate'>{ titleCase(value) }</Label>
    </div>

  )

  if(value == 'finalizado') return (

    <div className={`flex gap-1 w-fit py-1 px-2 items-center bg-green-50/10 rounded-md ${rest.className}`} {...rest}>
      <span className='h-2 w-2 rounded-full bg-green-500'></span>
      <Label className='text-green-500'>{ titleCase(value) }</Label>
    </div>

  )

  return <></>

}

export default Status