"use client"
import React, { MutableRefObject, createContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import Spiner from '../../client/shared/Spiner';
import CategoryForm from './CategoryForm';
import UploadCategortImg from './UploadCategortImg';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addCategory, getCategories, updateCategory } from '@/api/categories';
import { Category } from '@/types/category.type';
import Categories from '../categories/Categories';
import { setCategorytDefaultValue } from '@/redux/domains/form/categoryDefaultValue';
import { setIsCategoryUpdate } from '@/redux/domains/form/isCategoryUpdate';

export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik9tYXIga2FuZSIsInVzZXJJZCI6IjY2NTc4OWIxYzU2ZTMyZTRiM2U2NWJiYiIsImlhdCI6MTcxNzE4NjMyNiwiZXhwIjoxNzE3MTg2Mzg2fQ.Mi3pDWTI7RTMhR0Frtysmeq5aPr6BLhwyieuFTRNVzM'
export const FilesCategoryContext = createContext(null)
export const DefaultValueCategoryContext = createContext(null)


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

    const isCategoryUpdate = useSelector<any>(state => state.isCategoryUpdate)
    const categoryDefaultValue = useSelector<any>(state => state.categoryDefaultValue)

    let seclectRef: MutableRefObject<HTMLButtonElement | null> = useRef(null);
    const route = useRouter()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm()

    const { data, isLoading, error, isFetching, refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => getCategories()
    })

    const categories: Category[] = data

    const { mutate: mutateAddCategory } = useMutation({
        mutationFn: async (formData) => {
            return await addCategory(formData, token)
        },

        onSettled: (data, error, context) => {
            if (data?.status === 201) {
                setIsSubmiting(false)
                reset()
                setImageUris([])
                setFiles([])
                refetch()
            } else {
                console.log('fileld')
            }
        },
    })


    const { mutate: mutateUpdateCategory } = useMutation({
        mutationFn: async (formData) => {
            return await updateCategory(formData, token, categoryDefaultValue._id)
        },

        onSettled: (data, error, context) => {
            if (data?.status === 201) {

                setIsSubmiting(false)
                reset()
                setImageUris([])
                setFiles([])
                refetch()
            } else {
                console.log('fileld')
            }
        },
    })

    const clickOtherElement = (element: any) => {
        if (element.current === undefined) return element?.click()
        element = element?.current as HTMLInputElement | null
        element?.click()
    }

    const onReset = () => {
        reset()
        dispatch(setCategorytDefaultValue({}))
        dispatch(setIsCategoryUpdate(false))
        setImageUris([])
    }

    const onSubmit = async (data) => {
        if (imageUris.length === 0 && !isCategoryUpdate) {
            return setFileError('Veillez ajouter une image')
        }

        setIsSubmiting(true)
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('description', data.description)

        if (!isCategoryUpdate) {
            formData.append('file', files[0])
            mutateAddCategory(formData)
        } else {
            mutateUpdateCategory(data)
        }
    }


    useEffect(() => {
        onReset()
    },[])

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
                            onReset={onReset}
                            errors={errors}
                        />
                    </div>

                    <div className='flex-1 '>
                        <DefaultValueCategoryContext.Provider value={{setValue, refetch}}>
                            <Categories
                                categories={categories}
                                isLoading={isLoading}
                                isFetching={isFetching}
                            />
                        </DefaultValueCategoryContext.Provider>
                    </div>
                </div>
            </div>
        </section>
    )
}



