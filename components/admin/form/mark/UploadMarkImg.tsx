"use client"
import React, { MutableRefObject, SetStateAction, useContext, useRef } from 'react'
import { FaImage } from 'react-icons/fa'
import { imageDataType } from '../product/InsertProduct'
import { Dispatch } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { createUrl } from '@/utils/uploads'
import { FilesMarkContext } from './InsertMark'
import UploadedCard from '../commun/UploadedCard.admin'

type UploadImgesType = {
    clickOtherElement: (ref: MutableRefObject<HTMLInputElement | null>) => void,
    setFileError: (error: string) => void,
    setImageUris: Dispatch<SetStateAction<imageDataType[]>>
    fileError: string
    imageUris: imageDataType[]
}

export default function UploadMarktImg({
    clickOtherElement,
    setImageUris,
    setFileError,
    imageUris,
    fileError,
}: UploadImgesType) {

    const markDefaultValue = useSelector<any>(state => state.markDefaultValue)
    const { setFiles } = useContext(FilesMarkContext)

    let inputFile: MutableRefObject<HTMLInputElement | null> = useRef(null);

    const handleUploads = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target
        if (!files) return
        setFileError('')
        const uris = createUrl(files)
        setImageUris(prevUri => [...prevUri, ...uris])
        setFiles(prevFiles => [...prevFiles, ...Array.from(files)])
    }

    const onDeletFile = (uri: string, name: number) => {
        setFiles(prevFiles => prevFiles.filter(file => file.name !== name))
        const urisUpdate = imageUris.filter(item => item.uri !== uri)
        setImageUris(urisUpdate)
    }

    return (

        <div
            className={`flex-1 p-4 space-y-4 cursor-pointer border-2`} >
            <p className='text-sm'>Ajouter  Images</p>
            <div
                onClick={() => clickOtherElement(inputFile)}
                className={`h-[300px] flex flex-col items-center justify-center rounded-md bg-gray-50 gap-5 border-2 border-dashed ${fileError ? 'border-red-400' : 'border-black/50'}   ${imageUris.length > 0 ? 'opacity-50 pointer-events-none' : 'opacity-70'}`}>
                <FaImage size={50} />
                <p>Cliquer Pour ajouter une image</p>
                {fileError && <p className='text-red-500'> {fileError}</p>}
                <input type="file" hidden ref={inputFile} onChange={handleUploads} />
            </div>

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
            </ul>

        </div>
    )
}
