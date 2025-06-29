import React from 'react'
import { NotificationProvider } from '../../contexts/NotificationContext'

function Content({ children }: React.TableHTMLAttributes<HTMLTableElement>) {

  return (

    <section className='flex w-full h-full flex-col bg-background-1 relative'>

      <NotificationProvider>

        {children}

      </NotificationProvider>

    </section>

  )

}


export default Content