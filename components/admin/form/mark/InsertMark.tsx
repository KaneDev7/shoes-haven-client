"use client"
import React, { MutableRefObject, createContext, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form"
import Spiner from '../../../client/shared/Spiner';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addMark, getMarks } from '@/api/marks';
import { Mark } from '@/types/mark';
import { setMarkDefaultValue } from '@/redux/domains/form/mark/markDefaultValue';
import MarkForm from './MarkForm';
import Marks from '../../mark/Marks';
import UploadMarktImg from './UploadMarkImg';

export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik9tYXIga2FuZSIsInVzZXJJZCI6IjY2NTc4OWIxYzU2ZTMyZTRiM2U2NWJiYiIsImlhdCI6MTcxNzE4NjMyNiwiZXhwIjoxNzE3MTg2Mzg2fQ.Mi3pDWTI7RTMhR0Frtysmeq5aPr6BLhwyieuFTRNVzM'
export const FilesMarkContext = createContext(null)
export const DefaultValueMarkContext = createContext(null)


export type imageDataType = {
    uri: string,
    name: string,
    onDeletFile?: (uri: string, index: number) => void,
}

export default function InsertMark() {
    const [imageUris, setImageUris] = useState<imageDataType[]>([])
    const [fileError, setFileError] = useState<string>('')
    const [files, setFiles] = useState([])
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    let seclectRef: MutableRefObject<HTMLButtonElement | null> = useRef(null);
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm()

    const { data, isLoading, error, isFetching, refetch } = useQuery({
        queryKey: ['marks'],
        queryFn: async () => getMarks()
    })

    const marks: Mark[] = data

    const { mutate: mutateAddMark } = useMutation({
        mutationFn: async (formData) => {
            return await addMark(formData, token)
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
        dispatch(setMarkDefaultValue({}))
        setImageUris([])
    }

    const onSubmit = async (data) => {
        if (imageUris.length === 0) {
            return setFileError('Veillez ajouter une image')
        }

        setIsSubmiting(true)
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('file', files[0])
        mutateAddMark(formData)
    }


    useEffect(() => {
        onReset()
    }, [])

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
                        <FilesMarkContext.Provider value={{ setFiles, files }}>
                            <UploadMarktImg
                                clickOtherElement={clickOtherElement}
                                setFileError={setFileError}
                                fileError={fileError}
                                imageUris={imageUris}
                                setImageUris={setImageUris}
                            />
                        </FilesMarkContext.Provider>

                        <MarkForm
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                            register={register}
                            onReset={onReset}
                            errors={errors}
                        />
                    </div>

                    <div className='flex-1 '>
                        <DefaultValueMarkContext.Provider value={{ setValue, refetch }}>
                            <Marks
                                marks={marks}
                                isLoading={isLoading}
                                isFetching={isFetching}
                            />
                        </DefaultValueMarkContext.Provider>
                    </div>
                </div>
            </div>
        </section>
    )
}



