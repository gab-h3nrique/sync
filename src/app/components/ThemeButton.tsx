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

        <article className={`flex gap-4 p-2 rounded-full h-fit w-fit cursor-pointer ${className}`}>

            <Svg.Sun onClick={() => change('light')} className={`w-4 h-4 fill-color-1 dark:fill-color-1-dark ${theme == 'light' ? 'hidden' : ''}`}/>

            <Svg.Moon onClick={() => change('dark')} className={`w-4 h-4 fill-color-1 dark:fill-color-1-dark ${theme == 'dark' ? 'hidden' : ''}`}/>

        </article>

    )
}

export default ThemeButton