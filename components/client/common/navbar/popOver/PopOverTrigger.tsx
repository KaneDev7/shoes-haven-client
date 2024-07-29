import { PopOverContext } from '@/context/PopOverProvider'
import React, { ReactNode, useContext } from 'react'

type PopOverTriggerType = {
    children: ReactNode,
}

export default function PopOverTrigger({ children }: PopOverTriggerType) {
    const { setIsMonseInElement, spaceY } = useContext(PopOverContext)

    const handleMonseInTheElement = () => {
        setIsMonseInElement(true)
    }

    const handleMonseOutTheElement = () => {
        setIsMonseInElement(false)
    }
    const heightStyle = spaceY + 100 + '%'

    return (
        <div
            onMouseEnter={handleMonseInTheElement}
            onMouseLeave={handleMonseOutTheElement}
            className='relative'>
            <div style={{ height: heightStyle }} className={`inset-0 absolute z-10`}/>
            {children}
        </div>
    )
}

