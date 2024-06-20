"use client"
import React, { MutableRefObject, useReducer, useRef, useState } from 'react'
import { FaImage } from "react-icons/fa6";
import UploadedCard from '@/components/admin/UploadedCard.admin';
import InputText from '@/components/admin/InputText';
import InputSelect from '@/components/admin/InputSelect.admin';
import { categories, colors, marks, sizes } from '@/constants/productsMock';
import InputRadio from '@/components/admin/InputRadio';
import Button from '../buttons';
import { z } from "zod";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { headers } from 'next/headers';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik9tYXIga2FuZSIsInVzZXJJZCI6IjY2NTc4OWIxYzU2ZTMyZTRiM2U2NWJiYiIsImlhdCI6MTcxNzE4NjMyNiwiZXhwIjoxNzE3MTg2Mzg2fQ.Mi3pDWTI7RTMhR0Frtysmeq5aPr6BLhwyieuFTRNVzM'

// const productData = z.object({
//     productName : z.string()
//     productName : z.string()
//     productName : z.string()
//     productName : z.string()

// })

export type imageDataType = {
    uri: string,
    name: string
}

const troncText = (text: string, length: number) => {
    if (text.length > length) {
        return text.substring(0, length) + '...'
    }
    return text
}

const createUrl = (files: FileList) => {
    const uris = []
    for (const file of Array.from(files)) {
        const objectURL = URL.createObjectURL(file)
        const name = troncText(file.name, 20)
        uris.push({ uri: objectURL, name })
    }
    return uris
}

const addProduct = (data) => {
    axios.post('http://localhost:3001/api/products/add',
    {data},
    {
        headers : {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

export default function InsertProduct() {
    const [files, setFiles] = useState()
    const [imageData, setImageData] = useState<imageDataType[]>([])
    const selectCategories = useSelector(state => state.selectCategories)
    const selectColors = useSelector(state => state.selectColors)


    let inputFile: MutableRefObject<null> = useRef(null)
    let submitButton: MutableRefObject<null> = useRef(null)

    const clickOtherElement = (element: any) => {
        element = element?.current as HTMLInputElement | null
        element?.click()
    }

    const saveDate = () => {
        const element = submitButton?.current as HTMLInputElement | null
        element?.click()
    }
    const handleUploads = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target
        if (!files) return
        const uris = createUrl(files)
        setImageData(prevUri => [...prevUri, ...uris])
        setFiles(files)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.target)

        const dataToSend = {
            title : formData.get('title'),
            productId : formData.get('productId'),
            category : selectCategories,
            mark : formData.get('mark'),
            size : Number(formData.get('size')),
            color : selectColors,
            description : formData.get('description'),
            price : Number(formData.get('price')),
            // stock : Boolean(Number(formData.get('stock'))),
            files   
        }


        addProduct(dataToSend)
        console.log('dataToSend', dataToSend)
    }

    console.log("files", files)

    return (
        <section className='my-10 ml-10'>
            <h1 className='text-2xl font-bold'>Ajouter Produit</h1>
            <div className=' flex bg-white p-5 mt-4'>
                <div className='flex gap-4 w-full'>

                    <div
                        onClick={() => clickOtherElement(inputFile)}
                        className='flex-1 p-4 space-y-4 cursor-pointer border-2'>
                        <p className='text-sm'>Ajouter  Images</p>
                        <div className='h-[300px] flex flex-col items-center justify-center gap-5 border-2 border-dashed border-black/50	opacity-60 '>
                            <FaImage size={50} />
                            <p>Cliquer Pour ajouter une image</p>
                            <input type="file" hidden ref={inputFile} multiple onChange={handleUploads} />
                        </div>
                        <ul className='flex-1 space-y-2'>
                            {
                                imageData.map(item => (
                                    <UploadedCard
                                        uri={item.uri}
                                        name={item.name}
                                    />
                                ))
                            }

                        </ul>
                    </div>


                    <div className='flex-1 border-2 p-4'>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                            <InputText
                                label='Nom du Produit'
                                placeholder='Entrez le nom du produit'
                                type='text'
                                name='title'
                            />
                            <InputText
                                label='Identifiant du Produit'
                                placeholder='Entrez l’identifiant du produit'
                                type='text'
                                name='productId'
                            />

                            <InputSelect
                                label='Catégories'
                                placeholder='Choisissez le nom du catégorie'
                                data={categories}
                                variant='multuple'
                                name='category'
                            />

                            <InputSelect
                                label='Marques'
                                placeholder='Selectionner la marque'
                                data={marks}
                                variant='single'
                                name='mark'
                            />

                            <InputSelect
                                label='Tailles'
                                placeholder='Selectionner la taille'
                                data={sizes}
                                variant='single'
                                name='size'
                            />

                            <InputSelect
                                label='Couleurs'
                                placeholder='Selectionner la couleur'
                                data={colors}
                                variant='multuple'
                                name='color'

                            />

                            <InputText
                                label='Description'
                                placeholder='Entrez la description'
                                type='text'
                                variant='long'
                                name='description'
                            />

                            <InputText
                                label='Prix'
                                placeholder='Entrez le prix'
                                type='number'
                                name='price'
                            />

                            <InputRadio
                                placeholder="En Stock"
                            />
                            <button hidden type='submit' ref={submitButton}>submit</button>
                        </form>
                    </div>

                </div>

            </div>
            <div className='w-full flex justify-end mt-4'>
                <div className='flex gap-4'>
                    <button
                        onClick={() => clickOtherElement(submitButton)}
                        className={`outline-none  text-sm px-4 w-[100px]  bg-secondaryColor py-2 font-bold rounded-full text-blackColor2`} >
                        Enregistrer
                    </button>
                    <Button
                        text='Retour'
                        style='w-[100px]  border-2 border-secondaryColor rounded-full '
                    />
                </div>
            </div>
        </section>
    )
}



