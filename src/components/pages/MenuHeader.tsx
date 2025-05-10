'use client'

import React, { memo } from 'react'
import Svg from '../icons/Svg'
import useTheme from '@/hooks/useTheme'

function MenuHeader(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {

    const { change } = useTheme()

    const { className , ...rest } = props

    console.log('redering header......')

    return (

        <section onClick={() => change('dark')} className={`ml-6 gap-5 cursor-pointer flex justify-center items-center ${className}`} {...rest}>

            <Svg.Bars className='button h-5 w-5 fill-color-1 dark:fill-color-1-dark'/>
            <Svg.Nodes className='h-9 w-12 scale-[1.2] fill-color-1 dark:fill-color-1-dark'/>

        </section>

    )

}

export default memo(MenuHeader)