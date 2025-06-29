import { useState } from 'react'
import Svg from '../components/elements/Svg'
import { Table, Td, Th, Tr } from '../components/elements/Table'
import { useNotification } from '../hooks/useNotaification'

function HomePage() {

  const notification = useNotification()

  const [ icon, setIcon ] = useState('star')
  const [ classs, setClasss ] = useState("")

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">


      
      <Table className='w-full'>
        <Tr>
          <Th className='max-w-36 subtitle'>Código</Th>
          <Th className='max-w-36 subtitle'>Nome</Th>
          <Th className='max-w-36 subtitle'>Estoque</Th>
          <Th className='max-w-36 subtitle'>Valor</Th>
        </Tr>
        <Tr>
          <Td className='max-w-36 paragraph'>2134</Td>
          <Td className='paragraph'>Bicicleta</Td>
          <Td className='paragraph' onClick={() => notification({ time: 100000, type: 'error', title: 'Atenção', description: 'Nenhum dado foi encontrado',  })}>234</Td>
          <Td className='paragraph' onClick={() => notification({ time: 100000, type: 'error', title: 'Atenção', description: 'Nenhum dado foi encontrado. por causa do erro, Nenhum dado foi encontrado. por causa do erro',  })}>4.533,45</Td>
        </Tr>
      </Table>

    </div>
  )
}

export default HomePage