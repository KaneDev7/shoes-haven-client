"use client"
import useSelectList from '@/hooks/useSelectList'
import React from 'react'
import { FieldErrors, InputValidationRules, UseFormRegister } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { IoIosAddCircle } from 'react-icons/io';
import Link from 'next/link';
import RenderSelectEl from './RenderSelectEl';

type InputSelectType = {
    label?: string,
    data?: (string | number | null)[]
    placeholder?: string,
    variant: 'multuple' | 'single',
    name: 'size' | 'mark' | 'color' | 'category' | 'city' | 'street',
    defaultValue?: string | number | (string | number | null)[],
    errors: FieldErrors<InputValidationRules>
    register: UseFormRegister<InputValidationRules>
}


export default function InputSelect({ data, label, placeholder, variant, name, register, errors, defaultValue }: InputSelectType) {
    const { selectlist, handleToggleSelect } = useSelectList({ list: Array.isArray(defaultValue) ? defaultValue : [], name, isClient: false })
    const isProducUpdate = useSelector(state => state.isProducUpdate)

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('befor')
        if (variant === 'multuple') {

            console.log('inset')
            handleToggleSelect(event.target.value)
        }
    }

    return (
        <div className='flex flex-col gap-2'>
            <label className='text-sm opacity-80'>{label}</label>

            <select 
                {...register(name, {
                    validate: () => {
                        if (variant === 'multuple') return selectlist.length !== 0 || `Veillez selectionnez des ${label}`
                    }
                })}
                onChange={handleSelect}
                name={name}
                className={`px-2 py-3 border-2 focus:border-secondaryColor ${errors[name]?.message && 'border-red-300'} rounded-md  bg-gray-50/50 text-sm outline-none`}
            >

                {isProducUpdate && <option value='' selected={selectlist.length === 0} hidden >--{placeholder}--</option>}

                {
                    data?.map((item, index) => (
                        variant === 'multuple' ?
                            (<option key={index} selected={isProducUpdate && item === defaultValue.at(-1)} disabled={selectlist.includes(item)} value={item} >{item}</option>) :
                            (<option selected={defaultValue === item} key={index}>{item}</option>)
                    ))
                }
            </select>

            {variant === 'multuple' && <RenderSelectEl selectlist={selectlist} handleToggleSelect={handleToggleSelect} />}

            {
                name === 'category' &&
                <Link href='/admin/categories' className='flex items-center gap-2'>
                    <IoIosAddCircle className='text-secondaryColor' size={25} />
                    <p className='text-sm'>Ajouter une nouvelles Catégories</p>
                </Link>
            }

            {
                name === 'mark' &&
                <Link href='/admin/marks' className='flex items-center gap-2'>
                    <IoIosAddCircle className='text-secondaryColor' size={25} />
                    <p className='text-sm'>Ajouter un nouveau Marque</p>
                </Link>
            }

            {errors[name] && <p className='text-red-400 text-sm'> {errors[name].message} </p>}

        </div>
    )
}