"use client"
import React, { FormEventHandler, MutableRefObject, useRef } from 'react'
import InputText from '@/components/admin/form/InputText';
import { FieldErrors, FieldValues } from 'react-hook-form';
import Button from '../shared/Button.admin';

type ProductFormType = {
    onSubmit: () => FormEventHandler<HTMLFormElement> | undefined,
    handleSubmit: (data: any) => void,
    register: () => void
    errors: FieldErrors<FieldValues>
}

export const validationRules = {
    required: { value: true, message: 'Ce Champ est obligatoire' },
}

export default function CategoryForm({ onSubmit, handleSubmit, register, errors }: ProductFormType) {

    let form: MutableRefObject<HTMLFormElement | undefined> = useRef();

    return (
        <div className='flex-1 border-2 p-4 rounded-md '>
            <form onSubmit={handleSubmit(onSubmit)} ref={form} className='flex flex-col gap-4'>
                <InputText
                    label='Titre du catégorie'
                    placeholder='Entrez titre du catégorie'
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
                            value: 5,
                            message: 'Valeur minimum 5 charactères'
                        }
                    }}
                />

                <InputText
                    label='Description'
                    placeholder='Entrez la description de la catégorie'
                    type='text'
                    variant='long'
                    name='description'
                    register={register}
                    errors={errors}
                    validations={{
                        ...validationRules,
                        maxLength: {
                            value: 500,
                            message: 'Valeur maximim 500 charactères'
                        },
                        minLength: {
                            value: 30,
                            message: 'Valeur minimum 30 charactères'
                        }
                    }}
                />
                <Button
                    text="Enregistrer"
                    type='submit'
                    style='w-full h-[55px] flex justify-center items-center mt-5 bg-secondaryColor text-blackColor2 font-bold rounded-md'
                />
            </form>
        </div>
    )
}
