"use client"
import React, { MutableRefObject, createContext, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form"
import { addProduct, updateProduct } from '@/api/products';
import { useRouter } from 'next/navigation';
import { handleResponseError } from '@/utils/errorResponse';
import Spiner from '../../client/shared/Spiner';
import CategoryForm from './CategoryForm';
import UploadCategortImg from './UploadCategortImg';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { addCategory, getCategories } from '@/api/categories';
import { Category } from '@/types/category.type';
import Categories from '../categories/Categories';

export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik9tYXIga2FuZSIsInVzZXJJZCI6IjY2NTc4OWIxYzU2ZTMyZTRiM2U2NWJiYiIsImlhdCI6MTcxNzE4NjMyNiwiZXhwIjoxNzE3MTg2Mzg2fQ.Mi3pDWTI7RTMhR0Frtysmeq5aPr6BLhwyieuFTRNVzM'
export const FilesCategoryContext = createContext(null)

export type imageDataType = {
    uri: string,
    name: string,
    onDeletFile?: (uri: string, index: number) => void,
}

export default function InsertCategory() {
    const [imageUris, setImageUris] = useState<imageDataType[]>([])
    const [fileError, setFileError] = useState<string>('')
    const [files, setFiles] = useState([])
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [isProducUpdate, setIsProducUpdate] = useState(false)

    const { data, isLoading, error, isFetching, refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => getCategories()
    })

    const categories: Category[] = data
    
    const { mutate } = useMutation({
        mutationFn: async (formData) => {
            return await addCategory(formData, token)
        },

        onSuccess: () => {
        },

        onSettled: (data, error, context) => {
            if (data?.status === 201) {
                setIsSubmiting(false)
                const form = seclectRef.current?.querySelector('form') as HTMLFormElement
                form.reset()
                setImageUris([])
                setFiles([])
                refetch()
            } else {
                console.log('fileld')
            }
        },
    })
    // const isProducUpdate = useSelector<any>(state => state.isProducUpdate)
    // const productDefaultValue = useSelector<any>(state => state.productDefaultValue)

    let seclectRef: MutableRefObject<HTMLButtonElement | null> = useRef(null);
    const route = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        // defaultValues: {
        //     name: productDefaultValue.title,
        //     description: productDefaultValue.description,
        // }
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
            const response = await addCategory(formData, token)
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

    const onSubmit = async (data) => {

        if (imageUris.length === 0 && !isProducUpdate) {
            return setFileError('Veillez ajouter une image')
        }
        setIsSubmiting(true)
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('file', files[0])
        mutate(formData)
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

            <div className='flex bg-white p-5 mt-4'>

                <div className='flex gap-4 w-full flex-col lg:flex-row flex-wrap'>
                    <div className='flex-1'>
                        <FilesCategoryContext.Provider value={{ setFiles, files }}>
                            <UploadCategortImg
                                clickOtherElement={clickOtherElement}
                                setFileError={setFileError}
                                fileError={fileError}
                                imageUris={imageUris}
                                setImageUris={setImageUris}
                            />
                        </FilesCategoryContext.Provider>

                        <CategoryForm
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                            register={register}
                            errors={errors}
                        />
                    </div>

                    <div className='flex-1 '>
                        <Categories
                            categories={categories}
                            isLoading={isLoading}
                            isFetching={isFetching}
                            refetch={refetch}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}



