"use client"
import useSelectList from '@/hooks/useSelectList'
import React from 'react'
import { IoCloseCircleSharp } from "react-icons/io5";

type InputSelectType = {
    label: string,
    data: (string | number)[]
    placeholder: string,
    variant?: 'multuple' | 'single',
    name : string
}

type selectedListElType = {
    selectlist: (string | number | null)[],
    handleToggleSelect: (selected: string | number | null) => void
}

const RenderListEl = ({ selectlist, handleToggleSelect }: selectedListElType) => {
    return (
        <div className='flex flex-wrap gap-3'>
            {
                selectlist.length > 0 && selectlist.map(item => (
                    <div
                        onClick={() => handleToggleSelect(item)}
                        className='flex items-center justify-between gap-4 p-2 bg-bg_gray_light'>
                        <p className='text-xs'> {item} </p>
                        <IoCloseCircleSharp size={20} className='opacity-80 text-gray-400 hover:text-gray-500 hover:placeholder-opacity-100' />
                    </div>
                ))
            }
        </div>
    )
}


export default function InputSelect({ data, label, placeholder, variant , name}: InputSelectType) {
    const { selectlist, handleToggleSelect } = useSelectList({ list: [], name })

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectElments = event.target.value
        handleToggleSelect(selectElments)
    }

    return (
        <div className='flex flex-col gap-2'>
            <label className='text-sm opacity-80'>{label}</label>
            <select onChange={handleSelect}
                className='px-2 py-3 border-2 bg-gray-50 text-sm outline-none' name={name} id="">
                <option value='' selected hidden >{placeholder}</option>
                {
                    data.map(item => (

                        variant === 'multuple' ?
                            (<option disabled={selectlist.includes(item)} value={item} >{item}</option>) :
                            (<option  value={item} >{item}</option>)
                    ))
                }
            </select>
            {
                variant === 'multuple' &&
                <RenderListEl
                    selectlist={selectlist}
                    handleToggleSelect={handleToggleSelect}
                />
            }
        </div>
    )
}

