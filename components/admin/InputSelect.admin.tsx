"use client"
import useSelectList from '@/hooks/useSelectList'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IoCloseCircleSharp } from "react-icons/io5";
import { IsSelectListEmpty } from './InsertProduct';
import { FieldErrors, InputValidationRules, UseFormRegister } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setIsFirstSelect, setIsSelectListEmpty } from '@/redux/domains/form/SelectValidation.slice';

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
    const { isFirstSelect, isSelectListEmpty } = useSelector(state => state.selectValidation)
    const isProducUpdate = useSelector(state => state.isProducUpdate)
    const dispatch = useDispatch()

    const isValidate = (isSelectListEmpty[name] && isFirstSelect[name])

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectElments = event.target.value
        handleToggleSelect(selectElments)
        if (!isFirstSelect[name]) {
            dispatch(setIsFirstSelect({ key: name, value: true }))
        }
    }

    useEffect(() => {
        if (isFirstSelect[name]) {
            dispatch(setIsSelectListEmpty({
                key: name,
                value: selectlist.length === 0
            }))

        }
    }, [selectlist])

    return (
        <div className='flex flex-col gap-2'>
            <label className='text-sm opacity-80'>{label}</label>

            <select
                name={name}
                {...register(name, { required: true })}
                onChange={handleSelect}
                className={`px-2 py-3 border-2 ${(errors[name] || isValidate) && 'border-red-300'}  bg-gray-50 text-sm outline-none`} name={name} id="">
                {!isProducUpdate && <option value='' selected hidden >--{placeholder}--</option>}

                {
                    data.map((item, index) => (

                        variant === 'multuple' ?
                            (<option key={index} selected={isProducUpdate && item === defaultValue.at(-1)} disabled={selectlist.includes(item)} value={item} >{item}</option>) :
                            (<option key={index} selected={isProducUpdate && defaultValue === item} >{item}</option>)
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
            {(errors[name] || isValidate) && <p className='text-red-400 text-sm'>Veillez selectionnez des {label} </p>}

        </div>
    )
}

