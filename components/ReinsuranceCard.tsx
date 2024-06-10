import React from 'react'
import { CiDeliveryTruck } from "react-icons/ci";

type ReinsuranceCardType = {
    icon: string,
    title: string,
    text: string
}

export default function ReinsuranceCard({ icon, title, text }: ReinsuranceCardType) {
    return (
        <li className='col-span-1 flex gap-4 tems-start opacity-80'>
            <CiDeliveryTruck size={40} className='flex-shrink-0'/>
            <div className='flex flex-col'>
                <h1 className='font-bold'>{title}</h1>
                <p className=''>{text} </p>
            </div>
        </li>
    )
}
