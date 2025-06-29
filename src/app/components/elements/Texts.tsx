import React from 'react'



export function Title(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {

    const { className, children, ...rest} = props

    return (

        <h1 className={`title text-color-1 ${className}`} {...rest as any}>
            {children}
        </h1>

    )

}
export function Subtitle(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {

    const { className, children, ...rest} = props

    return (

        <h3 className={`subtitle text-color-2 ${className}`} {...rest as any}>
            {children}
        </h3>

    )

}
export function Paragraph(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {

    const { className, children, ...rest} = props

    return (

        <p className={`paragraph text-color-2 ${className}`} {...rest as any}>
            {children}
        </p>

    )

}
export function Description(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {

    const { className, children, ...rest} = props

    return (

        <span className={`description text-color-2 ${className}`} {...rest as any}>
            {children}
        </span>

    )

}
export function Label(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {

    const { className, children, ...rest} = props

    return (

        <label className={`label text-color-2 ${className}`} {...rest as any}>
            {children}
        </label>

    )

}

const Text = {
    Title,
    Subtitle,
    Paragraph,
    Description,
    Label
}

export default Text