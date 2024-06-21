"use client"
import useSelectList from '@/hooks/useSelectList'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IoCloseCircleSharp } from "react-icons/io5";

type InputSelectType = {
    label: string,
    data: (string | number)[]
    placeholder: string,
    variant?: 'multuple' | 'single',
    name: string,
    setIsSelectListEmpty : Dispatch<SetStateAction<boolean>>
    isSelectListEmpty : boolean
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
                        className='flex items-center justify-between gap-4 p-2 bg-bg_gray_light'>
                        <p className='text-xs'> {item} </p>
                        <IoCloseCircleSharp
                            onClick={() => handleToggleSelect(item)}
                            size={20} className='opacity-80 text-gray-400 hover:text-gray-500 hover:placeholder-opacity-100' />
                    </div>
                ))
            }
        </div>
    )
}


export default function InputSelect({ data, label, placeholder, variant, name, setIsSelectListEmpty, isSelectListEmpty }: InputSelectType) {
    const { selectlist, handleToggleSelect } = useSelectList({ list: [], name })
    const [isFirstSelect, setIsFirstSelect] = useState(false)

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectElments = event.target.value
        handleToggleSelect(selectElments)
        if(!isFirstSelect){
            setIsFirstSelect(true)
        }
    }

    useEffect(() => {
        if(isFirstSelect)
        setIsSelectListEmpty(selectlist.length === 0)
    },[isFirstSelect, selectlist])

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
                            (<option value={item} >{item}</option>)
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
            {isSelectListEmpty && <p className='text-red-400 text-sm'>Veillez selectionnez des {label} </p> }

        </div>
    )
}

