
import React from 'react'
import { FieldErrors, InputValidationRules, UseFormRegister } from 'react-hook-form'

type InputType = {
    label: string,
    placeholder: string,
    variant?: 'long' | 'cours',
    type: 'text' | 'number',
    name: string,
    defaultValue? : string | number 
    value? : string, 
    errors: FieldErrors<InputValidationRules>
    register: UseFormRegister<InputValidationRules>
}

export default function InputText({ label, placeholder, variant, type, name, register, errors, defaultValue }: InputType) {
  
    return (
        <div className={`flex flex-col gap-2 `} >
            <label className='text-sm opacity-80'>{label}</label>
            {
                variant === "long" ?
                    <textarea
                        name={name}
                        {...register(name, {required : true})}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        className={`min-h-[100px] px-2 py-3 border-2 ${errors[name] && 'border-red-200' } bg-gray-50 text-sm outline-none resize-none`}
                    >
                    </textarea> :
                    <input
                        name={name}
                        {...register(name, {required : true})}
                        type={type}
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        className={`px-2 py-3 border-2 ${errors[name] && 'border-red-200' } bg-gray-50 text-sm outline-none`}
                    />
            }
            {errors[name] && <p className='text-red-400 text-sm'>Vérifier ce champ</p> }
        </div>
    )
}
