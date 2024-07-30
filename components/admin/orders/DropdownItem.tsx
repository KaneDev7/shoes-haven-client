import React  from 'react'
import { Status } from '@/types/product.type';
import {DELIVERIED, PENDING } from '@/constants/data';

type DropdownItemType = {
    status: Status,
    handleOptionClick: (option: Status) => void,
    selectedOption: Status
}

export default function DropdownItem ({ status, selectedOption, handleOptionClick }: DropdownItemType)  {
    const statusText = status === DELIVERIED ? 'Livré' : status === PENDING ? 'En attente' : 'Annulé'
    return <div
        onClick={() => handleOptionClick(status)}
        className={`${selectedOption === status ? 'pointer-events-none opacity-50' : 'cursor-pointer'} text-nowrap  px-4 py-2 text-sm hover:bg-gray-100`}
    >
        {statusText}
    </div>
}
