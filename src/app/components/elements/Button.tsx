import React from 'react'

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {

  const { className, children, ...rest} = props

  return (

    <button className={`flex items-center gap-2 w-fit description border border-border font-semibold py-[.438rem] px-4 rounded-lg hover:scale-[.98] duration-150 cursor-pointer ${className}`} {...rest}>
      {children}
    </button>

  )
}

export default Button