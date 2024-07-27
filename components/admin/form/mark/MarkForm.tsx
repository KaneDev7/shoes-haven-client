"use client"
import React, { FormEventHandler, MutableRefObject, useRef } from 'react'
import InputText from '@/components/shared/InputText';
import { FieldErrors, FieldValues } from 'react-hook-form';
import Button from '../../shared/Button.admin';

type MarkFormType = {
    onSubmit: () => FormEventHandler<HTMLFormElement> | undefined,
    handleSubmit: (data: any) => void,
    register: () => void
    errors: FieldErrors<FieldValues>
    onReset: () => void
}

export const validationRules = {
    required: { value: true, message: 'Ce Champ est obligatoire' },
}

export default function MarkForm({ onSubmit, handleSubmit, register, onReset, errors }: MarkFormType) {

    let form: MutableRefObject<HTMLFormElement | undefined> = useRef();

    return (
        <div className='flex-1 border-2 p-4 rounded-md '>
            <form onSubmit={handleSubmit(onSubmit)} ref={form} className='flex flex-col gap-4'>
                <InputText
                    label='Nom du marque'
                    placeholder='Entrez le nom du marque'
                    type='text'
                    name='name'
                    register={register}
                    errors={errors}
                    validations={{
                        ...validationRules,
                        maxLength: {
                            value: 30,
                            message: 'Valeur maximim 30 charactères'
                        },
                        minLength: {
                            value: 2,
                            message: 'Valeur minimum 2 charactères'
                        }
                    }}
                />

                <Button
                    text="Enregistrer"
                    type='submit'
                    style='w-full h-[55px] flex justify-center items-center mt-2 bg-secondaryColor text-blackColor2 font-bold rounded-md'
                />
            </form>

        </div>
    )
}
