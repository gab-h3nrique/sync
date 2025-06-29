import React, { useState, Suspense, useEffect } from 'react'
import Svg from '../components/elements/Svg'
import { Table, Td, Th, Tr } from '../components/elements/Table'
import { useNotification } from '../hooks/useNotaification'
import { Description, Paragraph, Subtitle, Title } from '../components/elements/Texts'
import { useNavigate } from 'react-router'
import Button from '../components/elements/Button'
import Loading from '../components/elements/Loading'
import Http from '../libs/http'
import { EMPTY_PROJECT, ProjectType } from '../../types/projectType'
import Format from '../../utils/format'
import Status from '../components/elements/Status'
import Input from '../components/elements/Input'

function ProjectPage() {


  let navigate = useNavigate();

  const notification = useNotification()

  const [ load, setLoad ] = useState({ get: false, save: false, delete: false, run: false, stop: false })

  const [ item, setItem ] = useState<ProjectType>(EMPTY_PROJECT)

  function handlerStatus(status: string) {

    // stopped, building, starting, restarting, running, error

    if (status == 'running') return 'success'
    if (status == 'stopped') return 'neutral'
    if (status == 'error') return 'error'

    if (status == 'starting') return 'warning'
    if (status == 'building') return 'warning'
    if (status == 'restarting') return 'warning'


    return 'neutral'

  }




  // projects?page=1&limit=10

  async function getItem(){

    try {

      setLoad({ ...load, get: true })

      const id = new URLSearchParams(window.location.search).get('id')

      const { data, success, message } = await Http.get("projects", { id: id })

      if(!success) notification({ type: 'warning', title: 'Warning', description: message })

      // notification({ type: 'success', description: 'Projects load successfully', time: 1000 })

      setItem(data)

    } catch (error: any) {

      console.error(error)

      notification({ type: 'error', title: 'Ops!', description: error?.message })

    } finally {

      setLoad({ ...load, get: false })


    }

  }



  async function command(type: 'stop' | 'start' | 'restart') {

    try {

      if(!item.name) return notification({ type: 'warning', title: 'Warning', description: 'Project name is required' })

      if(!item.id) return notification({ type: 'warning', title: 'Warning', description: 'Project doesnt exist' })

      setLoad({ ...load, run: true })

      const { data, success, message } = await Http.get(`projects/${item.id}/${type}`)

      if(!success) notification({ type: 'warning', title: 'Warning', description: message })

      notification({ type: 'success', description: 'command send successfully' })

    } catch (error: any) {

      console.error(error)

      notification({ type: 'error', title: 'Ops!', description: error?.message })

    } finally {

      setLoad({ ...load, run: false })

    }

  }

  async function save() {

    try {

      if(!item.name) return notification({ type: 'warning', title: 'Warning', description: 'Project name is required' })

      setLoad({ ...load, save: true })

      const { data, success, message } = await Http.post("projects", item)

      if(!success) notification({ type: 'warning', title: 'Warning', description: message })

      setItem(data)
        
      notification({ type: 'success', description: 'data save successfully' })

    } catch (error: any) {

      console.error(error)

      notification({ type: 'error', title: 'Ops!', description: error?.message })

    } finally {

      setLoad({ ...load, save: false })


    }

  }

  useEffect(() => { getItem() }, [])

  return (

    <Suspense fallback={<Loading/>}>
      <div className="w-full h-full flex flex-col gap-4 p-4">

        <section className="flex flex-col">

          <Title className='font-semibold'>{ item?.name }</Title>

          <Description onClick={() => navigate(-1)} className='flex gap-1 cursor-pointer w-fit'>
            <Svg name="angle" className='w-4 h-4 fill-color-1 -rotate-90 mt-[.25rem]'/>
            go back
          </Description>

        </section>

        <section className="flex gap-4 justify-end items-center">

          <Button onClick={() => command('stop')} className='ml-auto'>
            { load.stop ? 'Stoping...' : 'Stop' }
            <Svg name="spinner" className={`w-5 h-5 text-color-1 animate-spin ${ !load.stop ? 'hidden' : '' }`}/>
          </Button>

          <Button onClick={() => command('start')} className=''>
            { load.run ? 'Running...' : 'Run' }
            <Svg name="spinner" className={`w-5 h-5 text-color-1 animate-spin ${ !load.run ? 'hidden' : '' }`}/>
          </Button>

        </section>

        <section className='flex flex-wrap gap-4'>

          <article className='flex flex-1 flex-col gap-4 p-4 min-w-72 rounded-xl border-2 border-border bg-background-2'>

            <Subtitle>Project Settings <span className='text-red-500'>*</span></Subtitle>

            <Description>Used to identify your Project on the Dashboard, Server CLI, and in the URL of your Deployments.</Description>

            <Description>Name <span className='text-red-500'>*</span></Description>
            <Input className='flex-1 max-w-72 -mt-2' type='text' onChange={(e) => setItem((prev) => ({...prev, name: e.target.value}))} value={item.name}/>
            
            <section className='flex flex-wrap gap-4'>

              <div className='flex flex-col flex-1 gap-2'>
                <Description>Url <span className='text-red-500'>*</span></Description>
                <Input className='flex-1 -mt-2' type='text' onChange={(e) => setItem((prev) => ({...prev, url: e.target.value}))} value={item.url}/>
              </div>
              <div className='flex flex-col w-40 gap-2'>
                <Description>Branch</Description>
                <Input className='flex-1 -mt-2' type='text' onChange={(e) => setItem((prev) => ({...prev, branch: e.target.value}))} value={item.branch}/>
              </div>

            </section>

            <Description>Envs</Description>
            <Input className='flex-1 -mt-2' type='text' onChange={(e) => setItem((prev) => ({...prev, envs: e.target.value}))} value={item.envs}/>
            
            <Description>Commands</Description>
            <Input className='flex-1 -mt-2' type='text' onChange={(e) => setItem((prev) => ({...prev, commands: e.target.value}))} value={item.commands}/>
   
            <Button onClick={save} className='ml-auto'>
              { load.save ? 'Saving...' : 'Save' }
              <Svg name="spinner" className={`w-5 h-5 text-color-1 animate-spin ${ !load.save ? 'hidden' : '' }`}/>
            </Button>

          </article>
          
          <article className='flex flex-1 flex-col gap-4 p-4 min-w-72 rounded-xl border-2 border-border bg-background-2'>

            <Subtitle>Deployments</Subtitle>

            <Description>Automatically created for pushes to { item.url }</Description>

            {/* <Input className='w-full' type='text' onChange={(e) => setItem((prev) => ({...prev, name: e.target.value}))} value={item.name}/> */}

            {/* <Button onClick={save} className='ml-auto'>
              { load.save ? 'Saving...' : 'Save' }
              <Svg name="spinner" className={`w-5 h-5 text-color-1 animate-spin ${ !load.save ? 'hidden' : '' }`}/>
            </Button> */}

          </article>

        </section>

      </div>
    </Suspense>
    
  )
}

export default ProjectPage