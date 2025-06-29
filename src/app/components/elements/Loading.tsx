import Svg from "./Svg"
import { Description } from "./Texts"

function Loading() {


  return (

    <article className="w-full h-full flex gap-2 justify-center items-center">
      <Description>Carregando</Description>
      <Svg name="spinner" className='w-4 h-4 fill-color-1-dark animate-spin'/>
    </article>

  )
}

export default Loading