"use client"
import React, { FormEventHandler, MutableRefObject, useContext, useEffect, useRef, useState } from 'react'
import InputText from '@/components/shared/InputText';
import InputSelect from '@/components/admin/form/product/InputSelect.admin';
import { FieldErrors, FieldValues } from 'react-hook-form';
import { useSelector } from 'react-redux';
import useCategoryList from '@/hooks/useCategoryList';
import useMarkList from '@/hooks/useMarkList';
import { FilterTextContext } from '@/context/FilterTextContext';
import { COLORS_DATA, SIZES_DATA } from '@/constants/data';
import Button from '@/components/shared/buttons';

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
    const { marks, categories } = useContext(FilterTextContext)


    let form: MutableRefObject<HTMLFormElement | undefined> = useRef();

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
                    data={SIZES_DATA}
                    defaultValue={selectSizes}
                    variant='multuple'
                    name='size'
                    register={register}
                    errors={errors}
                />

                <InputSelect
                    label='Couleurs'
                    placeholder='Selectionner la couleur'
                    data={COLORS_DATA}
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

                <Button
                    text="Enregistrer"
                    type='submit'
                    style='w-full h-[55px] flex justify-center items-center mt-2 bg-secondaryColor text-blackColor2 font-bold rounded-md'
                />
            </form>
        </div>
    )
}
