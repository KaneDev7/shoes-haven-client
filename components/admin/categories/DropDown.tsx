'use client'
import { updateOrder } from '@/api/orders';
import React, { useState } from 'react'
import { LuChevronsLeftRight } from "react-icons/lu";
import { token } from '../form/product/InsertProduct';
import { Status } from '@/types/product.type';

type Dropdowtype = {
    orderId: string,
    status: Status,
    onStatusChange: (value: Status) => void
}

type DropdownItemType = {
    status: Status,
    handleOptionClick: (option: Status) => void,
    selectedOption: Status
}

const DropdownItem = ({ status, selectedOption, handleOptionClick }: DropdownItemType) => {
    const statusText = status === 'deliveried' ? 'Livré' : status === 'pendding' ? 'En cours' : 'Annulé'
    return <div
        onClick={() => handleOptionClick(status)}
        className={`${selectedOption === status ? 'pointer-events-none opacity-50' : 'cursor-pointer'} text-nowrap  px-4 py-2 text-sm hover:bg-gray-100`}
    >
        {statusText}
    </div>
}


export const Dropdown = ({ orderId, status, onStatusChange }: Dropdowtype) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(status);
    const options: Status[] = ['pendding', 'deliveried', 'canceled'];


    const handleOpen = () => {
        setIsOpen(true);
    };


    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    const handleOptionClick = async (option: Status) => {
        setSelectedOption(option);
        setIsOpen(false);
        const response = await updateOrder({ orderId, status: option }, token)
        if (response.status === 201) {
            onStatusChange(option)
        }
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <LuChevronsLeftRight
                    size={15}
                    onClick={() => setIsOpen(true)}
                    onMouseLeave={handleMouseLeave}
                />
            </div>
            {isOpen &&
                <div
                    className="absolute rounded-md shadow-lg bg-white left-[0]  ring-black ring-opacity-5 z-[2] "
                    onMouseEnter={handleOpen}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="py-1">
                        {options.map((option, index) => (
                            <DropdownItem
                                status={option}
                                handleOptionClick={handleOptionClick}
                                selectedOption={selectedOption}
                            />
                        ))}

                    </div>
                </div>
            }

        </div>
    );
};
