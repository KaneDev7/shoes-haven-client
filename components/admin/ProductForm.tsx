"use client"
import React, { FormEventHandler, MutableRefObject, useRef } from 'react'
import InputText from '@/components/admin/InputText';
import InputSelect from '@/components/admin/InputSelect.admin';
import { FieldErrors, FieldValues } from 'react-hook-form';
import { categories, colors, marks, sizes } from '@/constants/productsMock';
import InputRadio from './InputRadio';

type ProductFormType = {
    onSubmit: () => FormEventHandler<HTMLFormElement> | undefined,
    handleSubmit: (data: any) => void,
    register: () => void
    errors: FieldErrors<FieldValues>
}

export default function ProductForm({ onSubmit, handleSubmit, register, errors }: ProductFormType) {
    let form: MutableRefObject<HTMLFormElement | undefined> = useRef();
    let submitButton: MutableRefObject<HTMLButtonElement | null> = useRef(null);

    return (
        <div className='flex-1 border-2 p-4'>
            <form onSubmit={handleSubmit(onSubmit)} ref={form} className='flex flex-col gap-4'>
                <InputText
                    label='Nom du Produit'
                    placeholder='Entrez le nom du produit'
                    type='text'
                    name='title'
                    register={register}
                    errors={errors}
                />

                <InputText
                    label='Identifiant du Produit'
                    placeholder='Entrez l’identifiant du produit'
                    type='text'
                    name='productId'
                    register={register}
                    errors={errors}
                />

                <InputSelect
                    label='Catégories'
                    placeholder='Choisissez le nom du catégorie'
                    data={categories}
                    variant='multuple'
                    name='category'
                    register={register}
                    errors={errors}
                />

                <InputSelect
                    label='Marques'
                    placeholder='Selectionner la marque'
                    data={marks}
                    variant='single'
                    name='mark'
                    register={register}
                    errors={errors}
                />

                <InputSelect
                    label='Tailles'
                    placeholder='Selectionner la taille'
                    data={sizes}
                    variant='single'
                    name='size'
                    register={register}
                    errors={errors}
                />

                <InputSelect
                    label='Couleurs'
                    placeholder='Selectionner la couleur'
                    data={colors}
                    variant='multuple'
                    name='color'
                    register={register}
                    errors={errors}
                />

                <InputText
                    label='Description'
                    placeholder='Entrez la description'
                    type='text'
                    variant='long'
                    name='description'
                    register={register}
                    errors={errors}
                />

                <InputText
                    label='Prix'
                    placeholder='Entrez le prix'
                    type='number'
                    name='price'
                    register={register}
                    errors={errors}
                />

                <InputRadio
                    placeholder="En Stock"
                />
                <button
                    hidden
                    id='submitButton'
                    type='submit'
                    ref={submitButton}>
                    submit
                </button>
            </form>
        </div>
    )
}
