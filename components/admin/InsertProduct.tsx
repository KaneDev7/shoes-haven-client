"use client"
import React, { MutableRefObject, createContext, useContext, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form"
import UploadImges from './UploadImges';
import ProductForm from './ProductForm';
import { addProduct, updateProduct } from '@/api/products';
import { useRouter } from 'next/navigation';
import { handleResponseError } from '@/utils/errorResponse';
import Spiner from '../shared/Spiner';

export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik9tYXIga2FuZSIsInVzZXJJZCI6IjY2NTc4OWIxYzU2ZTMyZTRiM2U2NWJiYiIsImlhdCI6MTcxNzE4NjMyNiwiZXhwIjoxNzE3MTg2Mzg2fQ.Mi3pDWTI7RTMhR0Frtysmeq5aPr6BLhwyieuFTRNVzM'
export const FilesContext = createContext(null)

export type imageDataType = {
    uri: string,
    name: string,
    onDeletFile?: (uri: string, index: number) => void,
}

export default function InsertProduct() {
    const [imageUris, setImageUris] = useState<imageDataType[]>([])
    const [fileError, setFileError] = useState<string>('')
    const [files, setFiles] = useState([])
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const selectCategories = useSelector<any>(state => state.selectCategories)
    const selectSize = useSelector<any>(state => state.selectSize)
    const selectColors = useSelector<any>(state => state.selectColors)

    const isProducUpdate = useSelector<any>(state => state.isProducUpdate)
    const productDefaultValue = useSelector<any>(state => state.productDefaultValue)

    let seclectRef: MutableRefObject<HTMLButtonElement | null> = useRef(null);
    const route = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm({
        defaultValues: {
            title: productDefaultValue.title,
            productId: productDefaultValue.productId,
            description: productDefaultValue.description,
            price: productDefaultValue.price,
            mark: productDefaultValue.mark,
        }
    })

    const clickOtherElement = (element: any) => {
        if (element.current === undefined) return element?.click()
        element = element?.current as HTMLInputElement | null
        element?.click()
    }

    const handleClick = () => {
        const submitButton = seclectRef.current?.querySelector('#submitButton')
        clickOtherElement(submitButton)
    }

    const insertProduct = async (formData: FormData) => {
        setIsSubmiting(true)

        if (!isProducUpdate) {
            const response = await addProduct(formData, token)
            const errorHandeler = handleResponseError(response)

            if (errorHandeler.message) {
                setIsSubmiting(false)
                return setErrorMessage(errorHandeler.message)
            }
            if (response?.response?.status === 413) {
                setIsSubmiting(false)
                return setFileError(response.response.data.message)
            }
        } else {
            const response = await updateProduct(formData, token, productDefaultValue._id)
            const errorHandeler = handleResponseError(response)
            if (errorHandeler.message) {
                setIsSubmiting(false)
                return setErrorMessage(errorHandeler.message)
            }
        }
        route.push('/admin/products')
    }


    const onSubmit = async () => {
        if (imageUris.length === 0 && !isProducUpdate) {
            return setFileError('Veillez ajouter des images')
        }

        const form = seclectRef.current?.querySelector('form') as HTMLFormElement
        const formData = new FormData(form);
        formData.append('category', selectCategories);
        formData.append('color', selectColors);
        formData.append('size', selectSize);

        if (files && !isProducUpdate) {
            files.forEach((file: any) =>formData.append('files', file));
        }

        console.log('size', formData.get('size'))
        console.log('color', formData.get('color'))

        await insertProduct(formData)
    }


    return (
        <section ref={seclectRef} className='my-10 bg-white relative'>
            {isSubmiting && <Spiner />}
            {
                errorMessage &&
                <div className=' px-2 p-4 bg-red-100 rounded-md'>
                    <p className='ml-5 text-sm text-red-900 '> {errorMessage} </p>
                </div>
            }


            <div className=' flex bg-white p-5 mt-4'>

                <div className='flex gap-4 w-full flex-col lg:flex-row flex-wrap'>
                    <FilesContext.Provider value={{ setFiles, files }}>
                        <UploadImges
                            clickOtherElement={clickOtherElement}
                            setFileError={setFileError}
                            fileError={fileError}
                            imageUris={imageUris}
                            setImageUris={setImageUris}
                        />
                    </FilesContext.Provider>


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

                </div>
            </div>
        </section>
    )
}



