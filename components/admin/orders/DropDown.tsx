'use client'
import { updateOrder } from '@/api/orders';
import React, { useState } from 'react'
import { LuChevronsLeftRight } from "react-icons/lu";
import { token } from '../form/product/InsertProduct';
import { Status } from '@/types/product.type';
import { CANCELLED, DELIVERIED, PENDING } from '@/constants/data';
import { MutateStatus } from '@/types/mutate.type';
import DropdownItem from './DropdownItem';

type Dropdowtype = {
    orderId: string,
    status: Status,
    onStatusChange: (value: Status) => void
}


export const Dropdown = ({ orderId, status, onStatusChange }: Dropdowtype) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(status);
    const options: (Status | MutateStatus) [] = [PENDING, DELIVERIED, CANCELLED];

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
