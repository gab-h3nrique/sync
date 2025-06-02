import Svg from "./icons/Svg"
import { Description } from "./texts/Texts"

function Loading() {


  return (

    <article className="w-full h-full flex gap-2 justify-center items-center">
      <Description>Carregando </Description>
      <Svg.Spinner className='w-4 h-4 fill-color-1 dark:fill-color-1-dark'/>
    </article>

  )
}

export default Loading