'use client'

import React, { memo, useEffect, useRef, useState } from 'react'

interface Props {

    isIntersecting: () => void

}



function Observer({ isIntersecting }: Props) {

    const ref = useRef(null)

    const [ inViewport, setInViewport ] = useState(false);

    useEffect(() => {

        const observer = new IntersectionObserver(([ entry ]) => {

        setInViewport(entry.isIntersecting);

        });

        if(ref.current)  observer.observe(ref.current)

        return () => {

            if(ref.current) observer.unobserve(ref.current)

        }

    }, [ ref ]);

    useEffect(()=> {

        if(inViewport) isIntersecting()

    }, [inViewport])

    
    return (

        <span ref={ref}></span>

    )


}

export default Observer