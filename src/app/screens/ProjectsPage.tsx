import React, { useState, Suspense, useEffect } from 'react'
import Svg from '../components/elements/Svg'
import { Table, Td, Th, Tr } from '../components/elements/Table'
import { useNotification } from '../hooks/useNotaification'
import { Description, Paragraph, Subtitle, Title } from '../components/elements/Texts'
import { useNavigate } from 'react-router'
import Button from '../components/elements/Button'
import Loading from '../components/elements/Loading'
import Http from '../libs/http'
import { ProjectType } from '../../types/projectType'
import Format from '../../utils/format'
import Status from '../components/elements/Status'

function ProjecstPage() {


  let navigate = useNavigate();

  const notification = useNotification()

  const [ paginate, setPaginate ] = useState({ page: 1, limit: 10, total: 0, loading: false, input: ''})
  const [ array, setArray ] = useState<ProjectType[]>([])









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

  async function getPaginated(page: number, search: boolean = false) {

    try {

      setPaginate({ ...paginate, loading: true })

      const { data, success, message } = await Http.get("projects", { page, limit: paginate.limit, search: paginate.input })

      if (!success) notification({ type: 'warning', title: 'Warning', description: message })

      setPaginate({ ...paginate, total: data.total, page: page })

      notification({ type: 'success', description: 'Projects load successfully', time: 1000 })

      if(search) return setArray(data)

      setArray(prev => ([ ...prev, ...data ]))

    } catch (error: any) {

      console.error(error)

      notification({ type: 'error', title: 'Ops!', description: error?.message })

    } finally {

      setPaginate({ ...paginate, loading: false })

    }

  }

  useEffect(() => {

    getPaginated(1, true)

  }, [])

  return (

    <Suspense fallback={<Loading/>}>
      <div className="w-full h-full flex flex-col gap-4 p-4">

        <section className="flex flex-col">

          <Title className='font-semibold'>Projects</Title>

          <Description onClick={() => navigate(-1)} className='flex gap-1 cursor-pointer w-fit'>
            <Svg name="angle" className='w-4 h-4 fill-color-1 -rotate-90 mt-[.25rem]'/>
            go back
          </Description>

        </section>

        <section className="flex gap-4 justify-end items-center">

          <Button onClick={() => navigate(`/projects/project`)}>
            <Svg name="plus" className='w-5 h-5 fill-color-1'/>
            <Subtitle className='text-color-1'>New project</Subtitle>
          </Button>

        </section>

        
        <Table className='w-full'>
          <Tr>
            <Th className='subtitle max-w-20 min-w-20'>Id</Th>
            <Th className='subtitle truncate w-full'>Name</Th>
            <Th className='subtitle hidden md:flex truncate w-full'>url</Th>
            <Th className='subtitle hidden md:flex max-w-36 min-w-36'>branch</Th>
            <Th className='subtitle hidden md:flex max-w-30 min-w-30'>status</Th>
            <Th className='subtitle hidden md:flex max-w-52 min-w-52'>date</Th>
          </Tr>

          { 
            array.map((item, i) => (

              <Tr key={`id-${i}`} className='duration-150 hover:scale-x-[1.005] cursor-pointer' onClick={() => navigate(`/projects/project?id=${item.id}`)}>
                <Td className='paragraph max-w-20 min-w-20'>{item.id}</Td>
                <Td className='paragraph truncate w-full'><Paragraph className='truncate'>{item.name}</Paragraph></Td>
                <Td className='paragraph hidden md:flex truncate w-full'><Paragraph className='truncate'>{item.url}</Paragraph></Td>
                <Td className='paragraph hidden md:flex max-w-36 min-w-36'>{item.branch || 'main'}</Td>
                <Td className='paragraph hidden md:flex max-w-30 min-w-30'><Status type={handlerStatus(item.status)} value={item.status}/></Td> 
                <Td className='paragraph hidden md:flex max-w-52 min-w-52 cursor-pointer' title={Format.date(item.updatedAt)} >{Format.creationTime(item.updatedAt)}</Td>
              </Tr>

            ))
          }
        </Table>

      </div>
    </Suspense>
    
  )
}

export default ProjecstPage