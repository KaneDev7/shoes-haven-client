"use client"
import React, { FormEventHandler, MutableRefObject, useRef } from 'react'
import InputText from '@/components/admin/InputText';
import InputSelect from '@/components/admin/InputSelect.admin';
import { FieldErrors, FieldValues } from 'react-hook-form';
import { categories, colors, marks, sizes } from '@/constants/productsMock';
import InputRadio from './InputRadio';
import { useSelector } from 'react-redux';
import { Product } from '@/types/product.type';

type ProductFormType = {
    onSubmit: () => FormEventHandler<HTMLFormElement> | undefined,
    handleSubmit: (data: any) => void,
    register: () => void
    errors: FieldErrors<FieldValues>
}



export default function ProductForm({ onSubmit, handleSubmit, register, errors }: ProductFormType) {
    const selectCategories = useSelector<any>(state => state.selectCategories)
    const selectColors = useSelector<any>(state => state.selectColors)
    const productDefaultValue  = useSelector<any>(state => state.productDefaultValue)


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
                    defaultValue={productDefaultValue.title}
                    register={register}
                    errors={errors}
                />

                <InputText
                    label='Identifiant du Produit'
                    placeholder='Entrez l’identifiant du produit'
                    type='text'
                    name='productId'
                    defaultValue={productDefaultValue.productId}
                    register={register}
                    errors={errors}
                />

                <InputSelect
                    label='Catégories'
                    placeholder='Choisissez le nom du catégorie'
                    data={categories}
                    defaultValue={selectCategories}
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
                    defaultValue={productDefaultValue.mark}
                    name='mark'
                    register={register}
                    errors={errors}
                />

                <InputSelect
                    label='Tailles'
                    placeholder='Selectionner la taille'
                    data={sizes}
                    defaultValue={productDefaultValue.size}
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
                    defaultValue={selectColors}
                    name='color'
                    register={register}
                    errors={errors}
                />

                <InputText
                    label='Description'
                    placeholder='Entrez la description'
                    type='text'
                    variant='long'
                    defaultValue={productDefaultValue.description}
                    name='description'
                    register={register}
                    errors={errors}
                />

                <InputText
                    label='Prix'
                    placeholder='Entrez le prix'
                    defaultValue={productDefaultValue.price}
                    type='number'
                    name='price'
                    register={register}
                    errors={errors}
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
