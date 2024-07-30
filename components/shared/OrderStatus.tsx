import { DELIVERIED, PENDING } from '@/constants/data'
import { Status } from '@/types/product.type'
import React from 'react'

export default function OrderStatus({ status }: { status: Status, }) {
    const statusColor = status === DELIVERIED ? 'text-[#078549]' : status === PENDING ? 'text-blackColor2' : 'text-[#F83E3E]'
    const statusBg = status === DELIVERIED ? 'bg-[#e9faef]' : status === PENDING ? 'bg-[#fff9c6]' : 'bg-[#ffe3e3]'
    const statusText = status === DELIVERIED ? 'Livré' : status === PENDING ? 'En attente' : 'Annulé'
    return <p className={`max-w-[150px] py-1 px-3 text-center text-nowrap text-xs rounded-sm ${statusColor} ${statusBg}`} > {statusText} </p>
}
