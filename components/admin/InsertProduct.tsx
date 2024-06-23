"use client"

import React, { MutableRefObject, useRef, useState } from 'react'
import Button from '../client/buttons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useForm } from "react-hook-form"
import UploadImges from './UploadImges';
import ProductForm from './ProductForm';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik9tYXIga2FuZSIsInVzZXJJZCI6IjY2NTc4OWIxYzU2ZTMyZTRiM2U2NWJiYiIsImlhdCI6MTcxNzE4NjMyNiwiZXhwIjoxNzE3MTg2Mzg2fQ.Mi3pDWTI7RTMhR0Frtysmeq5aPr6BLhwyieuFTRNVzM'

export type imageDataType = {
    uri: string,
    name: string,
    onDeletFile?: (uri: string,index : number ) => void,
}

const addProduct = async (formData) => {
    try {
        const response = await axios.post('http://localhost:3001/api/products/add',
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
        return response

    } catch (error) {
        console.log(error)
        return error
    }
}

export default function InsertProduct() {

    const [imageUris, setImageUris] = useState<imageDataType[]>([])
    const [fileError, setFileError] = useState<string>('')

    const selectCategories = useSelector<any>(state => state.selectCategories)
    const selectColors = useSelector<any>(state => state.selectColors)
    const files : FileList[]  = useSelector<any>(state => state.files)
    const { isSelectListEmpty } = useSelector(state => state.selectValidation)

    let seclectRef: MutableRefObject<HTMLButtonElement | null> = useRef(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    const clickOtherElement = (element: any) => {
        if (element.current === undefined) return element?.click()
        element = element?.current as HTMLInputElement | null
        element?.click()
    }

    const handleClick = () => {
        const submitButton = seclectRef.current?.querySelector('#submitButton')
        clickOtherElement(submitButton)
    }

    const onSubmit = async () => {
        if (imageUris.length === 0) {
            return setFileError('Veillez ajouter des images')
        }

        if (isSelectListEmpty.category ||
            isSelectListEmpty.size ||
            isSelectListEmpty.category ||
            isSelectListEmpty.color
        ) {
            return
        }

        const form = seclectRef.current?.querySelector('form') as HTMLFormElement
        const formData = new FormData(form);
        formData.append('category', selectCategories);
        formData.append('color', selectColors);

        if (files) {
           files.forEach((file) => {
                formData.append('files', file);
            });
        }

        const response = await addProduct(formData)
        if (response?.response?.status === 413) {
            setFileError(response.response.data.message)
        }
    }


    return (
        <section ref={seclectRef} className='my-10 ml-10'>
            <h1 className='text-2xl font-bold'>Ajouter Produit</h1>
            <div className=' flex bg-white p-5 mt-4'>
                <div className='flex gap-4 w-full flex-col lg:flex-row flex-wrap'>

                    <UploadImges
                        clickOtherElement={clickOtherElement}
                        setFileError={setFileError}
                        fileError={fileError}
                        imageUris={imageUris}
                        setImageUris={setImageUris}
                    />

                    <ProductForm
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        register={register}
                        errors={errors}
                    />
                </div>

            </div>
            <div className='w-full flex justify-end mt-4'>
                <div className='flex gap-4'>
                    <button
                        onClick={handleClick}
                        className={`outline-none min-w-[180px] text-sm px-6 opacity-95 hover:opacity-100 bg-secondaryColor py-2 font-bold rounded-md text-blackColor2`} >
                        Enregistrer
                    </button>
                    <Button
                        text='Retour'
                        style='min-w-[180px] border-2 border-secondaryColor rounded-md'
                    />
                </div>
            </div>
        </section>
    )
}



