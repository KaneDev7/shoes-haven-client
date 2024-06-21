import { tree } from 'next/dist/build/templates/app-page'
import React from 'react'
import { FieldErrors, InputValidationRules, UseFormRegister } from 'react-hook-form'

type InputType = {
    label: string,
    placeholder: string,
    variant?: 'long' | 'cours',
    type: 'text' | 'number',
    name: string ,
    errors: FieldErrors<InputValidationRules>
    register: UseFormRegister<InputValidationRules>

}

export default function Input({ label, placeholder, variant, type, name, register, errors }: InputType) {
    return (
        <div className='flex flex-col gap-2'>
            <label className='text-sm opacity-80'>{label}</label>
            {
                variant === "long" ?
                    <textarea
                        name={name}
                        {...register(name, {required : true})}
                        placeholder={placeholder}
                        className='min-h-[100px] px-2 py-3 border-2 bg-gray-50 text-sm outline-none resize-none'
                    >
                    </textarea> :
                    <input
                        name={name}
                        {...register(name, {required : true})}
                        type={type}
                        placeholder={placeholder}
                        className=' px-2 py-3 border-2 bg-gray-50 text-sm outline-none '
                    />
            }
            {errors[name] && <p className='text-red-400 text-sm'>Vérifier ce champ</p> }
        </div>
    )
}
