'use client'

import React, { memo, RefObject, useRef } from 'react'
import Svg from '../icons/Svg'

interface Props {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any,
  value: boolean,
  className?: string
}

function Checkbox(props: Props) {

  const { onChange, value, ...rest } = props

  const initialValue = useRef<any>(value)

  return (

    <label className='flex cursor-pointer hover:scale-[1.03] duration-150'>
      <input checked={value ? true : false} type="checkbox" onChange={(e) => onChange && onChange(e)} className='hidden' value={''}/>
      <Svg.CircleCheck className={`h-[23px] w-[23px] fill-color-1 dark:fill-color-1-dark ${!value && 'hidden'} ${rest.className}`}/>
      <Svg.Circle className={`h-[23px] w-[23px] fill-color-3 dark:color-3-dark ${value && 'hidden'} ${rest.className}`}/>
    </label>

  )

}

export default memo(Checkbox)
