"use client"
import React, { FormEventHandler, MutableRefObject, useEffect, useRef, useState } from 'react'
import InputText from '@/components/admin/form/InputText';
import InputSelect from '@/components/admin/form/InputSelect.admin';
import { FieldErrors, FieldValues } from 'react-hook-form';
import { colors, marks, sizes } from '@/constants/productsMock';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/api/categories';
import useCategoryList from '@/hooks/useCategoryList';

type ProductFormType = {
    onSubmit: () => FormEventHandler<HTMLFormElement> | undefined,
    handleSubmit: (data: any) => void,
    register: () => void
    errors: FieldErrors<FieldValues>
}

export const validationRules = {
    required: { value: true, message: 'Ce Champ est obligatoire' },
}

export default function ProductForm({ onSubmit, handleSubmit, register, errors }: ProductFormType) {
    const selectCategories = useSelector<any>(state => state.selectCategories)
    const selectSizes = useSelector<any>(state => state.selectSizes)
    const selectColors = useSelector<any>(state => state.selectColors)
    const productDefaultValue = useSelector<any>(state => state.productDefaultValue)
    const { categories } = useCategoryList()

    let form: MutableRefObject<HTMLFormElement | undefined> = useRef();
    let submitButton: MutableRefObject<HTMLButtonElement | null> = useRef(null);

    return (
        <div className='flex-1 border-2 p-4 rounded-md'>
            <form onSubmit={handleSubmit(onSubmit)} ref={form} className='flex flex-col gap-4'>
                <InputText
                    label='Nom du Produit'
                    placeholder='Entrez le nom du produit'
                    type='text'
                    name='title'
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
                    label='Identifiant du Produit'
                    placeholder='Entrez l’identifiant du produit'
                    type='text'
                    name='productId'
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
                    label='Tailles'
                    placeholder='Selectionner la taille'
                    data={sizes}
                    defaultValue={selectSizes}
                    variant='multuple'
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

                <InputText
                    label='Prix'
                    placeholder='Entrez le prix'
                    type='number'
                    name='price'
                    register={register}
                    errors={errors}
                    validations={
                        {
                            ...validationRules,
                            min: {
                                value: 1000,
                                message: 'Le prix est trop petit'
                            },
                            max: {
                                value: 2000000,
                                message: 'Le prix est trop grand'
                            }
                        }
                    }
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
