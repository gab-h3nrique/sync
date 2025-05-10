import Button from '@/components/elements/Button';
import Checkbox from '@/components/elements/Checkbox';
import Hr from '@/components/elements/Hr';
import Input from '@/components/elements/Input';
import Select from '@/components/elements/Select';
import Status from '@/components/elements/Status';
import Switch from '@/components/elements/Switch';
import { Table, Tbody, Td, Tr } from '@/components/elements/Table';
import Textarea from '@/components/elements/Textarea';
import Svg from '@/components/icons/Svg';
import { Check } from '@/components/icons/Vectors';
import { Description, Label, Paragraph, Subtitle } from '@/components/texts/Texts';
import { useNotification } from '@/hooks/useNotaification';
import Api from '@/providers/http';
import { EMPTY_POOL, PoolType } from '@/types/poolType';
import Format from '@/utils/format';
import React, { memo, useEffect, useState } from 'react'

interface Props {

    isOpen: boolean;
    item?: PoolType
    onClose: (data?: any) => any

}

function OrderModal({ isOpen, item, onClose }: Props) {


    const notification = useNotification()

    const [ loading, setLoading ] = useState(false)

    const [ saveLoading, setSaveLoading ] = useState(false)

    const [ removeLoading, setRemoveLoading ] = useState(false)

    const [ clientInfo, setClientInfo ] = useState(false)

    const [ vehicleInfo, setVehicleInfo ] = useState(false)

    const [ edited, setEdited ] = useState<PoolType>(EMPTY_POOL)


 



    async function remove() {

        try {

            
            if(saveLoading) return

            setRemoveLoading(true)

            const { data, total, success, message, ...rest } = await Api.delete('auth/pool', { id: edited.id })
        
            if(!success) return notification({ type: 'warning', title: 'Atenção', description: 'Nenhum dado foi excluido.' })

            notification({ type: 'success', title: 'Sucesso', description: 'Os dados foram excluidos com sucesso.' })
      
            onClose({ deleted: edited })

      
        } catch (error) {
      
            return notification({ type: 'error', title: 'Ops!', description: 'Houve um erro ao excluir os produtos.' })
            
        } finally {
      
            setRemoveLoading(false)
      
        }

    }
    
    async function save() {

        try {

            
            if(saveLoading) return

            setSaveLoading(true)

            const formated = {

                ...edited,

            }

            const { data, total, success, message, ...rest } = await Api.post('auth/pool', formated)
        
            if(!success) return notification({ type: 'warning', title: 'Attention', description: 'Any data was found.' })

            notification({ type: 'success', title: 'Success', description: 'Data saved successfully.' })
      
            onClose({ updated: data })

    
        } catch (error) {
      
            return notification({ type: 'error', title: 'Ops!', description: 'There was an error fetching the data.' })
            
        } finally {
      
            setSaveLoading(false)
      
        }

    }

    useEffect(() => {

        if(item) setEdited({...item, users: item.users ? [ ...item.users] : []})

        if(!isOpen) {

            setEdited(EMPTY_POOL)

        }

    }, [isOpen])

    // useEffect(()=> {



    // }, [])
    
    return (

        <section className={`bg-background-1 dark:bg-background-1-dark flex w-full h-full absolute ${isOpen ? 'fles' : 'hidden'}`}>
            <div className='py-12 gap-1 w-full h-full flex flex-col items-center relative'>

                <div className="flex flex-col gap-12 w-full max-w-[45rem] pb-10">

                    <section className='flex flex-col'>

                        <Paragraph>
                            Pool
                        </Paragraph>

                        <Description className='text-color-3'>
                            Configure the connection pool
                        </Description>

                    </section>

                    <section className='grid grid-cols-4 gap-6'>

                        <div className={'col-span-4 max-w-[20rem]'}>
                            <Description className='mb-1 text-color-2 dark:text-color-2-dark'>Name<span className='ml-1 text-red-500'>*</span></Description>
                            <Input type='text' onChange={(e: any) => setEdited(prev => ({...prev, name: e.target.value}))} value={edited?.name}/>
                        </div>

                    </section>

                    <Hr/>

                    <section className='flex gap-4'>

                        <Button onClick={remove} className={`justify-center text-color-2 dark:text-color-2-dark min-w-[82px] ${ item && item.id ? 'flex' : 'hidden' }`}>
                            <Svg.Spinner className={`w-5 h-5 fill-background-2 dark:fill-background-2-dark opacity-[.4] ${!removeLoading && 'hidden'}`}/>
                            { !removeLoading ? 'Delete' : '' }
                        </Button>
                        <Button onClick={()=> onClose()} className='ml-auto text-color-2 dark:text-color-2-dark'>Cancel</Button>
                        <Button onClick={save} className='borer-none file:flex justify-center bg-primary text-background-2 dark:text-background-2-dark min-w-[82px]'>
                            <Svg.Spinner className={`w-5 h-5 fill-background-2 dark:fill-background-2-dark opacity-[.4] ${!saveLoading && 'hidden'}`}/>
                            { !saveLoading ? 'Save' : '' }
                        </Button>

                    </section>


                </div>


            </div>
        </section>

    )

}

export default memo(OrderModal)