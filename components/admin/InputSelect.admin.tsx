"use client"
import useSelectList from '@/hooks/useSelectList'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IoCloseCircleSharp } from "react-icons/io5";
import { IsSelectListEmpty } from './InsertProduct';
import { FieldErrors, InputValidationRules, UseFormRegister } from 'react-hook-form';
import {useSelector } from 'react-redux';

type InputSelectType = {
    label: string,
    data: (string | number | null)[]
    placeholder: string,
    variant: 'multuple' | 'single',
    name: 'size' | 'mark' | 'color' | 'category',
    defaultValue?: string | number | (string | number | null)[],
    isSelectListEmpty: IsSelectListEmpty
    errors: FieldErrors<InputValidationRules>
    register: UseFormRegister<InputValidationRules>
    setIsSelectListEmpty: Dispatch<SetStateAction<IsSelectListEmpty>>
}

type selectedListElType = {
    selectlist: (string | number | null)[],
    handleToggleSelect: (selected: string | number | null) => void
}

const RenderListEl = ({ selectlist, handleToggleSelect }: selectedListElType) => {
    return (
        <div className='flex flex-wrap gap-3'>
            {
                selectlist.length > 0 && selectlist.map((item, index) => (
                    <div
                        key={index}
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


export default function InputSelect({ data, label, placeholder, variant, name, register, errors, defaultValue }: InputSelectType) {
    const { selectlist, handleToggleSelect } = useSelectList({ list: Array.isArray(defaultValue) ? defaultValue : [], name })
    const isProducUpdate = useSelector(state => state.isProducUpdate)

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectElments = event.target.value
        handleToggleSelect(selectElments)
    }


    return (
        <div className='flex flex-col gap-2'>
            <label className='text-sm opacity-80'>{label}</label>

            <select
                name={name}
                {...register(name, {
                    required : {value : true, message : `Les ${label} sont obligatoires`},
                    validate: () => {
                        if (variant === 'multuple') {
                            return  selectlist.length !== 0 || `Veillez selectionnez des ${label}`
                        }
                    },
                    
                })}
                onChange={handleSelect}
                className={`px-2 py-3 border-2 ${errors[name]?.message && 'border-red-300'}  bg-gray-50 text-sm outline-none`} name={name} id="">
                {!isProducUpdate && <option value='' selected={selectlist.length === 0} hidden >--{placeholder}--</option>}

                {
                    data.map((item, index) => (

                        variant === 'multuple' ?
                            (<option key={index} selected={isProducUpdate && item === defaultValue.at(-1)} disabled={selectlist.includes(item)} value={item} >{item}</option>) :
                            (<option key={index}>{item}</option>)
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
            {errors[name] && <p className='text-red-400 text-sm'> {errors[name].message} </p>}

        </div>
    )
}

//selected={isProducUpdate && defaultValue === item}