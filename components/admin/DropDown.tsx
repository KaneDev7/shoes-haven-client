'use client'
import { updateOrder } from '@/api/orders';
import React, { useState } from 'react'
import { LuChevronsLeftRight } from "react-icons/lu";
import { token } from './InsertProduct';
import { Status } from '@/types/product.type';

type Dropdowtype = {
    orderId: string,
    status: Status,
    onStatusChange: (value: Status) => void
}

export const Dropdown = ({ orderId, status, onStatusChange }: Dropdowtype) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(status);
    const options = ['pendding', 'deliveried', 'canceled'];


    const handleOpen = () => {
        setIsOpen(true);
    };


    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    const handleOptionClick = async (option  : Status ) => {
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
                            <div
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                className={`${selectedOption === option ? 'pointer-events-none opacity-50 ' : 'cursor-pointer'}  px-3 py-2 text-sm hover:bg-gray-100`}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </div>
            }

        </div>
    );
};
