import React from 'react'



export function Title(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {

    const { className, children, ...rest} = props

    return (

        <h1 className={`title text-color-1 dark:text-color-1-dark ${className}`} {...rest as any}>
            {children}
        </h1>

    )

}
export function Subtitle(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {

    const { className, children, ...rest} = props

    return (

        <h1 className={`subtitle text-color-2 dark:text-color-2-dark ${className}`} {...rest as any}>
            {children}
        </h1>

    )

}
export function Paragraph(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {

    const { className, children, ...rest} = props

    return (

        <h1 className={`paragraph text-color-2 dark:text-color-2-dark ${className}`} {...rest as any}>
            {children}
        </h1>

    )

}
export function Description(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {

    const { className, children, ...rest} = props

    return (

        <h1 className={`description text-color-2 dark:text-color-2-dark ${className}`} {...rest as any}>
            {children}
        </h1>

    )

}
export function Label(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {

    const { className, children, ...rest} = props

    return (

        <h1 className={`label text-color-2 dark:text-color-2-dark ${className}`} {...rest as any}>
            {children}
        </h1>

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