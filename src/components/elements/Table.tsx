
import React, { memo } from 'react'

export const Table = (props: React.TableHTMLAttributes<HTMLTableElement>) => {

  const { className, children, ...rest} = props

  return (

    <table className={`gap-[1px] w-fit h-fit flex flex-col border bg-border dark:border-dark dark:bg-border-dark rounded-xl overflow-hidden ${className}`} {...rest}>
      {children}
    </table>

  )
}
export const Tbody = (props: React.HTMLAttributes<HTMLTableSectionElement>) => {

  const { className, children, ...rest} = props

  return (

    <tbody className={`gap-[1px] w-fit h-fit flex flex-col ${className}`} {...rest}>
      {children}
    </tbody>

  )
}
export const Tr = (props: React.HTMLAttributes<HTMLTableRowElement>) => {

  const { className, children, ...rest} = props

  return (

    <tr className={`gap-[1px] flex ${className}`} {...rest}>
      {children}
    </tr>

  )
}
export const Td = (props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => {

  const { className, children, ...rest} = props

  return (

    <td className={`p-2 w-full bg-background-2 text-color-2 dark:bg-background-2-dark dark:text-color-2-dark truncate ${className}`} {...rest}>
      {children}
    </td>

  )
}

export const Th = (props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => {

  const { className, children, ...rest} = props

  return (

    <th className={`p-2 w-full bg-background-2 text-color-2 dark:bg-background-2-dark dark:text-color-2-dark truncate ${className}`} {...rest}>
      {children}
    </th>

  )
}
