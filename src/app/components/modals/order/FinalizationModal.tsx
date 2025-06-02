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
import { EMPTY_ORDER_PRODUCTS, OrderProductsType } from '@/types/orderProductsType';
import { EMPTY_ORDER, OrderType } from '@/types/orderType';
import { ProductType } from '@/types/productType';
import Format from '@/utils/format';
import React, { memo, useEffect, useState } from 'react'

interface Props {

    isOpen: boolean;
    order?: OrderType
    onClose: (data?: any) => any

}

function OrderModal({ isOpen, order, onClose }: Props) {


    const notification = useNotification()

    const [ loading, setLoading ] = useState(false)

    const [ saveLoading, setSaveLoading ] = useState(false)

    const [ removeLoading, setRemoveLoading ] = useState(false)

    const [ clientInfo, setClientInfo ] = useState(false)

    const [ vehicleInfo, setVehicleInfo ] = useState(false)

    const [ editedOrder, setEditedOrder ] = useState<OrderType>(EMPTY_ORDER)

    const [ editedOrderProducts, setEditedOrderProducts ] = useState<OrderProductsType>(EMPTY_ORDER_PRODUCTS)

    const [ productArray, setProductArray ] = useState<ProductType[]>()

    async function getProducts() {

        try {

          
            setLoading(true)

            const { data, success, message, ...rest } = await Api.get('/api/auth/products')

            if(!success) return notification({ type: 'error', title: 'Atenção', description: 'Nenhum dado foi encontrado.' })

            setProductArray(data)  


        } catch (error) {
    
          return notification({ type: 'error', title: 'Ops!', description: 'Houve um erro ao buscar os dados.' })
          
        } finally {
    
          setLoading(false)
    
        }
    
    }

    function addProduct() {

        const newOrderProducts: OrderProductsType = {
            ...EMPTY_ORDER_PRODUCTS,
            id: undefined,

            productId: -1,
            orderId: editedOrder.id || -1,
        
            edit: true,
        }

        const newList = editedOrder.orderProducts || []

        newList?.push({...newOrderProducts})

        setEditedOrder(prev => (
            {
                ...prev,
                orderProducts: [...newList]
            }
        ))

    }

    function editProduct(item: OrderProductsType, index: number) {

        const newList = editedOrder.orderProducts ? editedOrder.orderProducts.map((e, i) => i == index ? item : {...e, edit: false}) : []

        setEditedOrder(prev => ({ ...prev, orderProducts: [...newList] } ))

        setEditedOrderProducts(item)

    }

    function saveEditProduct(index: number) {

        const newList = editedOrder.orderProducts ? editedOrder.orderProducts.map((e, i) => i == index ? { ...editedOrderProducts, edit: false} : e) : []

        setEditedOrder(prev => ({ ...prev, orderProducts: newList} ))

        setEditedOrderProducts(EMPTY_ORDER_PRODUCTS)

    }

    function removeProduct(index: number) {

        // setEditedOrderProducts(null)

        const newList = editedOrder.orderProducts ? editedOrder.orderProducts.filter((e, i) => i !== index) : []

        setEditedOrder(prev => (
            {
                ...prev,
                orderProducts: newList
            }
        ))


    }

    function totalCalc() {

        if(!editedOrder.orderProducts || !editedOrder.orderProducts?.length) return '0.00'
        
        return editedOrder?.orderProducts.filter(a => a.status == 'finalizado').reduce((a, b) => a + b.value, 0)

    }

    async function remove() {

        try {

            
            if(saveLoading) return

            setRemoveLoading(true)

            const { data, total, success, message, ...rest } = await Api.delete('/api/auth/orders', { id: editedOrder.id })
        
            if(!success) return notification({ type: 'warning', title: 'Atenção', description: 'Nenhum dado foi excluido.' })

            notification({ type: 'success', title: 'Sucesso', description: 'Os dados foram excluidos com sucesso.' })
      
            onClose({ deleted: editedOrder })

      
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

            const formatedOrderProducts = editedOrder.orderProducts ? editedOrder.orderProducts.map((e: any) => {

                delete e.edit

                return {
                    ...e, 
                    value: Number(String(e.value).replace(',', '.'))
                }

            }) : []

            const formatedOrder = {

                ...editedOrder,
                orderProducts: formatedOrderProducts,

            }

            const { data, total, success, message, ...rest } = await Api.post('/api/auth/orders', formatedOrder)
        
            if(!success) return notification({ type: 'warning', title: 'Atenção', description: 'Nenhum dado foi encontrado.' })

            notification({ type: 'success', title: 'Sucesso', description: 'Os dados foram salvos com sucesso.' })
      
            onClose({ updated: data })

    
        } catch (error) {
      
            return notification({ type: 'error', title: 'Ops!', description: 'Houve um erro ao buscar os produtos.' })
            
        } finally {
      
            setSaveLoading(false)
      
        }

    }

    useEffect(() => {

        if(order) setEditedOrder({...order, orderProducts: order.orderProducts ? [ ...order.orderProducts] : []})

        if(!isOpen) {

            setEditedOrder(EMPTY_ORDER)
            setEditedOrderProducts(EMPTY_ORDER_PRODUCTS)

        }

    }, [isOpen])

    useEffect(()=> {

        getProducts()

    }, [])
    
    return (

        <section className={`bg-background-1 dark:bg-background-1-dark flex w-full h-full ${isOpen ? 'flex' : 'hidden'}`}>
            <div className='py-12 gap-1 w-full h-full flex flex-col items-center relative'>

                <div className="flex flex-col gap-12 w-full max-w-[45rem] pb-10">

                    <section onClick={() => console.log(order, editedOrder)} className='flex flex-col'>

                        <Paragraph>
                            Cliente
                        </Paragraph>

                        <Description className='text-color-3 dark:text-color-3-dark'>
                            Informe os dados do cliente
                        </Description>

                    </section>

                    <section className='grid grid-cols-4 gap-6'>

                        <div className={'col-span-4 max-w-[20rem]'}>
                            <Description className='mb-1 text-color-2 dark:text-color-2-dark'>Nome<span className='ml-1 text-red-500'>*</span></Description>
                            <Input type='text' onChange={(e: any) => setEditedOrder(prev => ({...prev, client: { ...prev.client, name: e.target.value } }))} value={editedOrder?.client?.name}/>
                        </div>
                        <div className={`col-span-4 max-w-[25rem] ${ !clientInfo ? 'hidden' : '' }`}>
                            <Description className='mb-1 text-color-2 dark:text-color-2-dark'>Email</Description>
                            <Input type='email' onChange={(e: any) => setEditedOrder((prev: any) => ({...prev, client: { ...prev.client, email: e.target.value } }))} value={editedOrder?.client?.email}/>
                        </div>
                        <div className={`col-span-2 ${ !clientInfo ? 'hidden' : '' }`}>
                            <Description className='mb-1 text-color-2 dark:text-color-2-dark'>Documento</Description>
                            <Input maxLength={18} type='text' onChange={(e: any) => setEditedOrder((prev: any) => ({...prev, client: { ...prev.client, document: Format.brDocument(e.target.value) } }))} value={editedOrder?.client?.document}/>
                        </div>
                        <div className={`col-span-2 ${ !clientInfo ? 'hidden' : '' }`}>
                            <Description className='mb-1 text-color-2 dark:text-color-2-dark'>Número</Description>
                            <Input maxLength={15} type='text' onChange={(e: any) => setEditedOrder((prev: any) => ({...prev, client: { ...prev.client, number: Format.phone(e.target.value) } }))} value={editedOrder?.client?.number}/>
                        </div>
                        <div className={`col-span-4 max-w-[25rem] ${ !clientInfo ? 'hidden' : '' }`}>
                            <Description className='mb-1 text-color-2 dark:text-color-2-dark'>Endereço</Description>
                            <Input type='email' onChange={(e: any) => setEditedOrder((prev: any) => ({...prev, client: { ...prev.client, info: e.target.value } }))} value={editedOrder?.client?.info}/>
                        </div>

                        <div className={`col-span-4`}>
                            <Button onClick={() => setClientInfo(!clientInfo)} className='border-none w-full bg-transparent flex justify-center'>
                                <Description className='text-color-2 dark:text-color-2-dark'>{ !clientInfo ? 'Mais informações' : 'Menos informações' }</Description>
                            </Button>
                        </div>

                    </section>

                    <Hr/>

                    <section className='flex flex-col'>

                        <Paragraph>
                            Veículo
                        </Paragraph>

                        <Description className='text-color-3 dark:text-color-3-dark'>
                            Use essa seção para identificar o veículo.
                        </Description>

                    </section>

                    <section className='grid grid-cols-4 gap-6'>

                        <div className='col-span-4 max-w-[16rem]'>
                            <Description className='mb-1'>Modelo<span className='ml-1 text-red-500'>*</span></Description>
                            <Input onChange={(e: any) => setEditedOrder((prev) => ({...prev, model: e.target.value}))} value={editedOrder?.model}/>
                        </div>
                        <div className={`col-span-4 ${ !vehicleInfo ? 'hidden' : '' }`}>
                            <Description className='mb-1'>Placa</Description>
                            <Input onChange={(e: any) => setEditedOrder((prev) => ({...prev, plateNumber: e.target.value}))} value={editedOrder?.plateNumber}/>
                        </div>
                        <div className={`col-span-4 max-w-[7rem] ${ !vehicleInfo ? 'hidden' : '' }`}>
                            <Description className='mb-1'>Ano</Description>
                            <Input type="number" onChange={(e: any) => setEditedOrder((prev) => ({...prev, year: e.target.value}))} value={editedOrder?.year}/>
                        </div>
                        <div className={`col-span-4  ${ !vehicleInfo ? 'hidden' : '' }`}>
                            <Description className='mb-1'>Observação do cliente</Description>
                            <Textarea type="text" className='' onChange={(e: any) => setEditedOrder((prev) => ({...prev, clientObservation: e.target.value}))} value={editedOrder?.clientObservation || ''}/>
                        </div>

                        <div className={`col-span-4`}>
                            <Button onClick={() => setVehicleInfo(!vehicleInfo)} className='border-none w-full bg-transparent flex justify-center'>
                                <Description className='text-color-2 dark:text-color-2-dark'>{ !vehicleInfo ? 'Mais informações' : 'Menos informações' }</Description>
                            </Button>
                        </div>

                    </section>

                    <Hr/>

                    <section className='flex flex-col'>

                        <Paragraph>
                            Serviços
                        </Paragraph>

                        <Description className='text-color-3 dark:text-color-3-dark' onClick={() => console.log('order: ', order)}>
                            Preencha os serviços e informações que irão ser realizados no veículo. { order?.orderProducts?.length }
                        </Description>

                    </section>

                    <section className='grid grid-cols-4 gap-6'>

                        <div className='col-span-4'>

                            <Description className='mb-1'>Produtos / serviços</Description>
                            <Table className='w-full'>
                                <Tbody className='w-full h-fit'>
                                    { editedOrder?.orderProducts?.length ? editedOrder.orderProducts.map((item, i)=> (

                                        <Tr key={`id-${i}`} className={`list`}>

                                            <Td onClick={() => editProduct({...item, edit: true}, i)} className={`text-start font-semibold p-5 gap-3 grid grid-cols-10 ${item.edit && 'hidden' }`}>

                                                <section className="col-span-4">
                                                    <Description className='truncate'>{ productArray && productArray.length && productArray.map(e => e.id == item.productId ? e.name : '') }</Description>
                                                    <Label className='text-color-3 dark:text-color-3-dark'>{ productArray && productArray.length && productArray.map(e => e.id == item.productId ? e.type : '') }</Label>
                                                </section>

                                                <section className="col-span-4 flex flex-col">
                                                    <Status value={item.status}/>
                                                    <Label className='mt-1 text-color-3 dark:text-color-3-dark' title={Format.date(item.updatedAt)}>{ Format.stringDate(item.updatedAt) }</Label>
                                                </section>

                                                <section className="col-span-2">
                                                    <Description className='truncate'>R$ { Format.money(item.value) }</Description>
                                                    <div className='flex gap-1 items-center'>
                                                        <Svg.Close className={`fill-red-500 w-3 h-3 mt-1 ${ item.warranty && 'hidden' }`} />
                                                        <Svg.Check className={`fill-blue-500 w-3 h-3 mt-1 ${ !item.warranty && 'hidden' }`} />
                                                        <Label className='mt-1 text-color-3 dark:text-color-3-dark truncate' title={Format.date(item.updatedAt)}>{ item.warranty ? 'com garantia' : 'sem garantia' }</Label>
                                                    </div>
                                                </section>
                                                
                                            </Td>

                                            <Td className={`text-start font-semibold p-5 gap-6 grid grid-cols-2 ${!item.edit && 'hidden' }`}>

                                                <div className='col-span-1'>
                                                    <Description className='mb-1'>Serviço / produto<span className='ml-1 text-red-500'>*</span></Description>
                                                    <Select className='w-full' data={productArray as any} value={productArray?.map(e=> e.id == editedOrderProducts.productId ? e.name : '' )} renderItem={(e, j) => <div key={i} onClick={() => setEditedOrderProducts(prev => ({...prev, productId: e.id }))}>{e.name}</div>} />
                                                </div>

                                                <div className='col-span-2 flex flex-col'>

                                                    <Description className='mb-1'>Status</Description>
                                                    <div className='mb-4 flex items-center gap-3'>
                                                        <Checkbox onChange={(e) => setEditedOrderProducts(prev => ({...prev, status: 'aguardando peça'  }))} value={editedOrderProducts.status == 'aguardando peça'}/>
                                                        <Status value={'aguardando peça'}/>
                                                    </div>
                                                    <div className='mb-4 flex items-center gap-3'>
                                                        <Checkbox onChange={(e) => setEditedOrderProducts(prev => ({...prev, status: 'em andamento'  }))} value={editedOrderProducts.status == 'em andamento'}/>
                                                        <Status value={'em andamento'}/>
                                                    </div>
                                                    <div className='mb-4 flex items-center gap-3'>
                                                        <Checkbox onChange={(e) => setEditedOrderProducts(prev => ({...prev, status: 'sem solução'  }))} value={editedOrderProducts.status == 'sem solução'}/>
                                                        <Status value={'sem solução'}/>
                                                    </div>
                                                    <div className='flex items-center gap-3'>
                                                        <Checkbox onChange={(e) => setEditedOrderProducts(prev => ({...prev, status: 'finalizado'  }))} value={editedOrderProducts.status == 'finalizado'}/>
                                                        <Status value={'finalizado'}/>
                                                    </div>
                                                </div>
                                                
                                                <div className='col-span-2 max-w-32'>
                                                    <Description className='mt-3 mb-1'>Valor</Description>
                                                    <Input type="text" className='' onChange={(e: any) => setEditedOrderProducts(prev => ({...prev, value: Format.money(e.target.value)  }))} value={editedOrderProducts.value}/>
                                                </div>

                                                <div className='col-span-2 flex flex-col gap-2'>
                                                    <Description>Garantia</Description>
                                                    <div className='flex items-center gap-2'>
                                                        <Switch onChange={(e) => setEditedOrderProducts(prev => ({...prev, warranty: !editedOrderProducts.warranty }))} value={editedOrderProducts.warranty}/>
                                                        <Description className='text-color-3 dark:text-color-3-dark truncate'>do produto / serviço</Description>
                                                    </div>
                                                </div>

                                                <div className='col-span-2'>
                                                    <Description className='mt-3 mb-1'>Observação</Description>
                                                    <Textarea type="text" className='' onChange={(e: any) => setEditedOrderProducts(prev => ({...prev, description: e.target.value  }))} value={editedOrderProducts.description}/>
                                                </div>

                                                <div className='col-span-2 flex gap-3'>
                                                    <Button onClick={() => removeProduct(i)} className='text-color-2 dark:text-color-2-dark'>Remover</Button>
                                                    <Button onClick={() => editedOrderProducts.productId !== -1 ? editProduct({...item, edit: false}, i) : removeProduct(i)} className={`ml-auto text-color-2 dark:text-color-2-dark `}>Cancelar</Button>
                                                    <Button onClick={() => editedOrderProducts.productId !== -1 ? saveEditProduct(i) : notification({ type: 'warning', title: 'Atenção', description: 'Serviço / produto precisa ser preenchido!'  })} className='flex justify-center bg-primary text-background-2 dark:text-background-2-dark min-w-[82px]'>Salvar</Button>
                                                </div>

                                            </Td>

                                        </Tr>

                                    )): <></>}
                                </Tbody>
                            </Table>

                            <Description onClick={() => addProduct()} className='button mt-2 w-full text-center'>Novo produto / serviço</Description>

                        </div>

                    </section>

                    <Hr/>

                    <section className='flex flex-col'>

                        <Paragraph>
                            Atendimento
                        </Paragraph>

                        <Description className='text-color-3 dark:text-color-3-dark'>
                            Finalize o atendimento e calcule o preço total
                        </Description>

                    </section>

                    <section className='grid grid-cols-4'>

                        <div onClick={() => setEditedOrder(prev => ({...prev, status: 'em andamento'}) )} className={`button col-span-4 p-4 gap-3 flex border rounded-t-xl ${ editedOrder.status == 'em andamento' ? 'border-yellow-500' : 'dark:border-dark' }`}>

                            <Checkbox className={`${ editedOrder.status == 'em andamento' ? 'fill-yellow-500' : '' }`} value={editedOrder.status == 'em andamento'}/>

                            <section className='flex flex-col gap-1'>
                                <Description className='truncate'>Em andamento</Description>
                                <Label className='text-color-3 dark:text-color-3-dark'>O atendimento atualmente está sendo feito</Label>
                            </section>

                        </div>
                        <div onClick={() => setEditedOrder(prev => ({...prev, status: 'sem solucao'}) )} className={`button col-span-4 p-4 gap-3 flex border ${ editedOrder.status == 'sem solucao' ? 'border-red-500' : 'dark:border-dark' }`}>

                            <Checkbox className={`${ editedOrder.status == 'sem solucao' ? 'fill-red-500' : '' }`} value={editedOrder.status == 'sem solucao'}/>

                            <section className='flex flex-col gap-1'>
                                <Description className='truncate'>Sem solução</Description>
                                <Label className='text-color-3 dark:text-color-3-dark'>O atendimento atualmente está sendo feito</Label>
                            </section>

                        </div>
                        <div onClick={() => setEditedOrder(prev => ({...prev, status: 'finalizado'}) )} className={`button col-span-4 p-4 gap-3 flex border rounded-b-xl ${ editedOrder.status == 'finalizado' ? 'border-green-500' : 'dark:border-dark' }`}>

                            <Checkbox className={`${ editedOrder.status == 'finalizado' ? 'fill-green-500' : '' }`} value={editedOrder.status == 'finalizado'}/>

                            <section className='flex flex-col gap-1 w-full'>
                                <Description className='truncate'>Finalizado</Description>
                                <Label className={`text-color-3 dark:text-color-3-dark ${ editedOrder.status == 'finalizado' && 'hidden' }`}>O atendimento atualmente está sendo feito</Label>
                                <div className={`w-full flex flex-col overflow-hidden duration-300 ${ editedOrder.status == 'finalizado' ? 'h-[5rem]' : 'h-0' }`}>
                                    
                                    <section className='flex justify-between opacity-50'>
                                        <Description className='truncate'>Subtotal:</Description>
                                        <Paragraph className='truncate'>R$ { editedOrder.orderProducts?.length && Format.money( editedOrder?.orderProducts.reduce((a, b) => a + b.value, 0) ) }</Paragraph>
                                    </section>
                                    <section className='mt-auto flex justify-between'>
                                        <Paragraph className='truncate'>Total:</Paragraph>
                                        <Subtitle className='truncate'>R$ { Format.money(totalCalc()) }</Subtitle>
                                    </section>
                                    
                                </div>
                            </section>

                        </div>

                    </section>

                    <Hr/>

                    <section className='flex gap-4'>

                        <Button onClick={remove} className={`justify-center text-color-2 dark:text-color-2-dark min-w-[82px] ${ editedOrder.id && editedOrder.id != -1 ? 'flex' : 'hidden' }`}>
                            <Svg.Spinner className={`w-5 h-5 fill-background-2 dark:fill-background-2-dark opacity-[.4] ${!removeLoading && 'hidden'}`}/>
                            { !removeLoading ? 'Excluir' : '' }
                        </Button>
                        <Button onClick={()=> onClose()} className='ml-auto text-color-2 dark:text-color-2-dark'>Cancelar</Button>
                        <Button onClick={save} className='flex justify-center bg-primary text-background-2 dark:text-background-2-dark min-w-[82px]'>
                            <Svg.Spinner className={`w-5 h-5 fill-background-2 dark:fill-background-2-dark opacity-[.4] ${!saveLoading && 'hidden'}`}/>
                            { !saveLoading ? 'Salvar' : '' }
                        </Button>

                    </section>


                </div>


            </div>
        </section>

    )

}

export default memo(OrderModal)