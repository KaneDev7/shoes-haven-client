
import React from 'react'
import { FieldErrors, InputValidationRules, UseFormRegister } from 'react-hook-form'

type InputTextValidationType = {
    required: {
        value: boolean,
        message: string
    },
    maxLength?: {
        value: number,
        message : string
    },
    minLength? : {
        value: number,
        message : string
    },
    min?: {
        value: number,
        message: string
    },
    max?: {
        value: number,
        message: string
    }
}

type InputType = {
    label: string,
    placeholder: string,
    variant?: 'long' | 'cours',
    type: 'text' | 'number' | 'email' | 'password',
    validations: InputTextValidationType | any,
    name: string,
    value?: string,
    disabled? : boolean
    errors: FieldErrors<InputValidationRules>
    register: UseFormRegister<InputValidationRules>
}

export default function InputText({ label, placeholder, variant, type, name, register, errors, validations, disabled }: InputType) {

    return (
        <div className={`flex flex-col gap-2 `} >
            <label className='text-sm opacity-80'>{label}</label>
            {
                variant === "long" ?
                    <textarea
                        name={name}
                        {...register(name, validations)}
                        placeholder={placeholder}
                        className={`min-h-[100px] px-2 py-3 border-2 ${errors[name] && 'border-red-200'} focus:border-secondaryColor  bg-gray-50/50 rounded-md  text-sm outline-none resize-none`}
                    >
                    </textarea> :
                    <input
                        name={name}
                        {...register(name, validations)}
                        type={type}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={`px-2 py-3 border-2 ${disabled && 'bg-[#f0f0f0] '} ${errors[name] && 'border-red-200'} focus:border-secondaryColor  bg-gray-50/50 text-sm  rounded-md outline-none`}
                    />
            }
            {errors[name] && <p className='text-red-400 text-sm'> {errors[name]?.message } </p>}
        </div>
    )
}
