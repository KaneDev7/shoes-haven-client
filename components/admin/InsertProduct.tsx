"use client"
import React, { MutableRefObject, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form"
import UploadImges from './UploadImges';
import ProductForm from './ProductForm';
import Link from 'next/link';
import Button from './Button.admin';
import { addProduct, updateProduct } from '@/api/products';
import { useRouter } from 'next/navigation';

export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik9tYXIga2FuZSIsInVzZXJJZCI6IjY2NTc4OWIxYzU2ZTMyZTRiM2U2NWJiYiIsImlhdCI6MTcxNzE4NjMyNiwiZXhwIjoxNzE3MTg2Mzg2fQ.Mi3pDWTI7RTMhR0Frtysmeq5aPr6BLhwyieuFTRNVzM'

export type imageDataType = {
    uri: string,
    name: string,
    onDeletFile?: (uri: string, index: number) => void,
}


export default function InsertProduct() {

    const [imageUris, setImageUris] = useState<imageDataType[]>([])
    const [fileError, setFileError] = useState<string>('')

    const selectCategories = useSelector<any>(state => state.selectCategories)
    const selectColors = useSelector<any>(state => state.selectColors)
    const files: FileList[] = useSelector<any>(state => state.files)
    const { isSelectListEmpty } = useSelector<any>(state => state.selectValidation)
    const isProducUpdate = useSelector<any>(state => state.isProducUpdate)
    const productDefaultValue = useSelector<any>(state => state.productDefaultValue)


    let seclectRef: MutableRefObject<HTMLButtonElement | null> = useRef(null);

    const route = useRouter()
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
        if (imageUris.length === 0 && !isProducUpdate) {
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

        if (files && !isProducUpdate) {
            files.forEach((file: any) => {
                formData.append('files', file);
            });
        }
        if (!isProducUpdate) {
            const response = await addProduct(formData, token)
            if (response?.response?.status === 413) {
                return setFileError(response.response.data.message)
            }
        }else{
            await updateProduct(formData, token, productDefaultValue._id)
        }

        route.push('/admin/products')
    }


    return (
        <section ref={seclectRef} className='my-10'>
            <div className=' flex bg-white p-5 mt-4'>
                <div className='flex gap-4 w-full flex-col lg:flex-row flex-wrap'>
                    { }
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
                <div className='flex gap-4 '>
                    <button
                        onClick={handleClick}
                        className={`outline-none min-w-[180px] text-sm px-6 opacity-95 hover:opacity-100 bg-secondaryColor py-2 font-bold rounded-md text-blackColor2`} >
                        Enregistrer
                    </button>
                    <Link
                        href='/admin/products'
                    >
                        <Button
                            text='Retour'
                            style='h-full border-2 bg-transparent border-secondaryColor rounded-md'
                        />
                    </Link>
                </div>
            </div>
        </section>
    )
}



