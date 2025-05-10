'use client'

import React, { memo, useState } from 'react'
import Button from './elements/Button'
import Svg from './icons/Svg'
import { Description, Label } from './texts/Texts'
import { version } from '../../package.json'
import Package from './Package'
import { useRouter } from 'next/navigation'

type Pages = '' | 'dashboard' | 'atendimentos' | 'estoque' | 'configuracoes'

function Tab() {

  const router = useRouter()

  const [ page,  setPage] = useState<Pages>('')

  async function push(page: Pages) {

    router.push(`/auth/${page}`)
    
    setPage(page)

  }


  return (

    <nav className='p-3 gap-8 w-full h-fit justify-center flex md:hidden relative border border-x-0 border-b-0 bg-background-2 overflow-auto'>

      <section onClick={() => push('')} className='button relative gap-1 flex flex-col justify-start items-center cursor-pointer'>
        <Svg.House className={`w-6 h-6 ${ page == '' ? 'fill-primary' : 'fill-color-1'}`}/>
        <Description className={`mt-1 ${ page == '' ? 'text-primary' : ''}`}>Home</Description>
      </section>

      <section onClick={() => push('dashboard')} className='button relative gap-1 flex flex-col justify-start items-center cursor-pointer'>
        <Svg.ChartLine className={`w-6 h-6 ${ page == 'dashboard' ? 'fill-primary' : 'fill-color-1'}`}/>
        <Description className={`mt-1 ${ page == 'dashboard' ? 'text-primary' : ''}`}>Dashboard</Description>
      </section>

      <section onClick={() => push('atendimentos')} className='button relative gap-1 flex flex-col justify-start items-center cursor-pointer'>
        <Svg.List className={`w-6 h-6 ${ page == 'atendimentos' ? 'fill-primary' : 'fill-color-1'}`}/>
        <Description className={`mt-1 ${ page == 'atendimentos' ? 'text-primary' : ''}`}>Atendimentos</Description>
      </section>

      <section onClick={() => push('estoque')} className='button relative gap-1 flex flex-col justify-start items-center cursor-pointer'>
        <Svg.Boxes className={`w-6 h-6 ${ page == 'estoque' ? 'fill-primary' : 'fill-color-1'}`}/>
        <Description className={`mt-1 ${ page == 'estoque' ? 'text-primary' : ''}`}>Estoque</Description>
      </section>
      
      <section onClick={() => push('configuracoes')} className='button relative gap-1 flex flex-col justify-start items-center cursor-pointer'>
        <Svg.Gear className={`w-6 h-6 ${ page == 'configuracoes' ? 'fill-primary' : 'fill-color-1'}`}/>
        <Description className={`mt-1 ${ page == 'configuracoes' ? 'text-primary' : ''}`}>Configuração</Description>
      </section>

    </nav>

  )
}

export default memo(Tab)