'use client'

import React from 'react'

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {

  const { className, children, ...rest} = props

  return (

    <button className={`flex items-center gap-2 button w-fit description border dark:border-dark font-semibold py-[.438rem] px-4 rounded-lg ${className}`} {...rest}>
      {children}
    </button>

  )
}

export default Button