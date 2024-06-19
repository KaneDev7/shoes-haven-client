import React from 'react'
import { FaImage } from "react-icons/fa6";
import UploadedCard from '@/components/admin/UploadedCard.admin';
import InputText from '@/components/admin/InputText';
import InputSelect from '@/components/admin/InputSelect.admin';
import { categories, colors, marks, sizes } from '@/constants/productsMock';
import InputRadio from '@/components/admin/InputRadio';
import Button from '../buttons';

export default function InsertProduct() {
    return (
        <section className='my-10 ml-10'>
            <h1 className='text-2xl font-bold'>Ajouter Produit</h1>
            <div className=' flex bg-white p-5 mt-4'>
                <div className='flex gap-4 w-full'>

                    <div className='flex-1 p-4 space-y-4 cursor-pointer border-2'>
                        <p className='text-sm'>Ajouter  Images</p>
                        <div className='h-[300px] flex flex-col items-center justify-center gap-5 border-2 border-dashed border-black/50	opacity-60 '>
                            <FaImage size={50} />
                            <p>Cliquer Pour ajouter une image</p>
                        </div>
                        <ul className='flex-1 space-y-2'>
                            <UploadedCard />
                            <UploadedCard />
                            <UploadedCard />
                            <UploadedCard />
                        </ul>
                    </div>


                    <div className='flex-1 border-2 p-4'>
                        <form className='flex flex-col gap-4'>
                            <InputText
                                label='Nom du Produit'
                                placeholder='Entrez le nom du produit'
                                type='text'

                            />
                            <InputText
                                label='Identifiant du Produit'
                                placeholder='Entrez l’identifiant du produit'
                                type='text'

                            />

                            <InputSelect
                                label='Catégories'
                                placeholder='Choisissez le nom du catégorie'
                                data={categories}
                                variant='multuple'
                            />

                            <InputSelect
                                label='Marques'
                                placeholder='Selectionner la marque'
                                data={marks}
                            />

                            <InputSelect
                                label='Tailles'
                                placeholder='Selectionner la taille'
                                data={sizes}
                                variant='single'
                            />

                            <InputSelect
                                label='Couleurs'
                                placeholder='Selectionner la couleur'
                                data={colors}
                                variant='multuple'
                            />

                            <InputText
                                label='Description'
                                placeholder='Entrez la description'
                                type='text'
                                variant='long'
                            />

                            <InputText
                                label='Prix'
                                placeholder='Entrez le prix'
                                type='number'
                            />

                            <InputRadio
                                placeholder="En Stock"
                            />
                        </form>
                    </div>

                </div>
               
            </div>
            <div className='w-full flex justify-end mt-4'>
                    <div className='flex gap-4'>
                        <Button
                            text='Enregistrer'
                            style='w-[100px]  bg-secondaryColor py-2 font-bold rounded-full text-blackColor2'
                        />
                        <Button
                            text='Retour'
                            style='w-[100px]  border-2 border-secondaryColor rounded-full '
                        />
                    </div>
                </div>
        </section>
    )
}



