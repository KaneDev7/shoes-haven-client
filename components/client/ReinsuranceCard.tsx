import React, { ReactNode } from 'react'

type ReinsuranceCardType = {
    icon: ReactNode,
    title: string,
    text?: string
    style? : string
}

export default function ReinsuranceCard({ icon, title, text, style }: ReinsuranceCardType) {
    return (
        <li className={`flex gap-4 tems-start `} >
            {icon}
            <div className='flex flex-col justify-center'>
                <h1 className='font-bold'>{title}</h1>
                <p className=''>{text} </p>
            </div>
        </li>
    )
}
