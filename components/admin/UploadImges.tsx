"use client"
import React, { MutableRefObject, SetStateAction, useRef } from 'react'
import { FaImage } from 'react-icons/fa'
import UploadedCard from './UploadedCard.admin'
import { imageDataType } from './InsertProduct'
import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { FileType, deleteFile, setFiles } from '@/redux/domains/form/file.slice'
import { createUrl } from '@/utils/uploads'

type UploadImgesType = {
    clickOtherElement: (ref: MutableRefObject<HTMLInputElement | null>) => void,
    setFiles: () => void,
    setFileError: (error: string) => void,
    setImageUris: Dispatch<SetStateAction<imageDataType[]>>
    fileError: string
    imageUris: imageDataType[]
}


export default function UploadImges({
    clickOtherElement,
    setImageUris,
    setFileError,
    imageUris,
    fileError,
}: UploadImgesType) {

    const filesSlice: FileType[] | any = useSelector<any[]>(state => state.files)
    const productDefaultValue = useSelector<any>(state => state.productDefaultValue)
    const isProducUpdate = useSelector<any>(state => state.isProducUpdate)

    const dispattch = useDispatch()

    let inputFile: MutableRefObject<HTMLInputElement | null> = useRef(null);

    const handleUploads = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target
        if (!files) return
        setFileError('')
        const uris = createUrl(files)
        setImageUris(prevUri => [...prevUri, ...uris])
        dispattch(setFiles([...filesSlice, ...Array.from(files)]))
    }

    const onDeletFile = (uri: string, name: number) => {
        dispattch(deleteFile(name))
        const urisUpdate = imageUris.filter(item => item.uri !== uri)
        setImageUris(urisUpdate)
    }

    return (

        <div
            className={`flex-1 p-4 space-y-4 cursor-pointer border-2 ${isProducUpdate && 'opacity-50 pointer-events-none'} `} >
            <p className='text-sm'>Ajouter  Images</p>
            <div
                onClick={() => clickOtherElement(inputFile)}
                className={`h-[300px] flex flex-col items-center justify-center gap-5 border-2 border-dashed ${fileError ? 'border-red-400' : 'border-black/50'}  opacity-60 `}>
                <FaImage size={50} />
                <p>Cliquer Pour ajouter une image</p>
                {fileError && <p className='text-red-500'> {fileError}</p>}
                <input type="file" hidden ref={inputFile} multiple onChange={handleUploads} />
            </div>

            {
                !isProducUpdate ?
                    <ul className='flex-1 space-y-2'>
                        {
                            imageUris.map((item, index) => (
                                <UploadedCard
                                    uri={item.uri}
                                    name={item.name}
                                    onDeletFile={onDeletFile}
                                />
                            ))
                        }
                    </ul> :

                    <ul className='flex-1 space-y-2'>
                        {
                            productDefaultValue.uri.map((uri, index) => (
                                <UploadedCard
                                    uri={`/uploads/${uri}`}
                                    name={uri}
                                    onDeletFile={onDeletFile}
                                />
                            ))
                        }
                    </ul>
            }

        </div>
    )
}
