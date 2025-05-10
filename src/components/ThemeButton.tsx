'use client'

import React, { memo } from 'react'
import Svg from './icons/Svg'
import useTheme from '@/hooks/useTheme'

interface Props {
    className?: string;
}

function ThemeButton({ className }: Props) {

    const { theme, change } = useTheme()


    return (

        <article className={`border dark:border-dark flex gap-4 p-2 rounded-full h-fit w-fit cursor-pointer ${className}`}>

            <Svg.Sun onClick={() => change('light')} className={`w-4 h-4 fill-color-1 dark:fill-color-1-dark`}/>

            <Svg.Moon onClick={() => change('dark')} className={`w-4 h-4 fill-color-1 dark:fill-color-1-dark`}/>

        </article>

    )
}

export default ThemeButton