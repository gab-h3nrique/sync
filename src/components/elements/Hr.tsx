'use client'

import React from 'react'

function Hr(props: React.HTMLAttributes<HTMLHRElement>) {

  const { className, children, ...rest} = props

  return (

    <hr className={`w-full opacity-50 ${className}`} {...rest}></hr>

  )
  
}

export default Hr