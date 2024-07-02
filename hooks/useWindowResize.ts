"use client"
import React, { useEffect, useState } from 'react'

export default function useWindowResize() {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setInnerWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return { innerWidth }
}
