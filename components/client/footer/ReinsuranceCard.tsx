import React, { ReactNode } from 'react'

type ReinsuranceCardType = {
    icon: ReactNode,
    title: string,
    text?: string
    style?: string
}

export default function ReinsuranceCard({ icon, title, text, style }: ReinsuranceCardType) {
    return (
        <li className={`flex flex-col items-center gap-4 tems-start uppercase `} >
            {icon}
            <h1 className='text-center'>{title}</h1>
        </li>
    )
}
