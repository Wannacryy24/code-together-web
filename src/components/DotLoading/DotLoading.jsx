import React, { useEffect, useState } from 'react'

export default function DotLoading({clasname='light-green-span'}) {
    const [dots, setDots] = useState(['.', '..', '...'])
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev)=> (prev +1) % dots.length)
        }, 500);

        return () => clearInterval(interval);

    }, [dots.length]);

    return (
        <h1 className={`${clasname} loading-text`}>Loading {dots[index]}</h1>
    )
}