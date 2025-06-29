import React from 'react'

export const Table = (props: React.TableHTMLAttributes<HTMLTableElement>) => {

    const { className, children, ...rest} = props

    return (

      // <article className="table-wrapper flex border-2 border-color-3 rounded-2xl overflow-hidden">
      // <article className="table-wrapper">

        <table className={``}>

          <tbody className={` ${className as any || ''}`} {...rest as any}>
            {children}
          </tbody>

        </table>

      // </article>

    )

}

export const Tr = (props: React.HTMLAttributes<HTMLTableRowElement>) => {

  const { className, children, ...rest} = props

  return (

    <tr className={`${className || ''}`} {...rest}>
      {children}
    </tr>

  )
}
export const Td = (props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => {

  const { className, children, ...rest} = props

  return (

    <td className={`${className || ''}`} {...rest}>
      {children}
    </td>

  )
}

export const Th = (props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => {

  const { className, children, ...rest} = props

  return (

    <th className={`${className || ''}`} {...rest}>
      {children}
    </th>

  )
}