import React, { memo } from 'react'
import { Description } from './texts/Texts'
import useUser from '@/hooks/useUser'
import UserHeader from './pages/UserHeader'
import MenuHeader from './pages/MenuHeader'
import ThemeButton from './ThemeButton'

function Header() {



    return (

        <header className='w-full flex justify-start p-2 border border-x-0 border-t-0 dark:border-dark dark:border-x-0 dark:border-t-0 bg-background-2 dark:bg-background-2-dark'>

            <MenuHeader className=''/>
        
            <UserHeader className='ml-auto'/>

        </header>

    )
}

export default memo(Header)