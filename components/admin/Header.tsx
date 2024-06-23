import React from 'react'
import { FiPlus } from 'react-icons/fi'
import Button from './Button.admin'
import Search from './Search.admin';

export default function Header() {
    return (
        <header className='flex justify-between flex-wrap items-center p-7 bg-white w-full'>
            <h1 className='text-2xl font-bold'>Produits</h1>
            <div className='flex lg:items-center items-start lg:flex-row flex-col-reverse gap-4'>
                <Search />
                <Button
                    text='Ajouter un Produit'
                    icon={<FiPlus size={20} />}
                />
            </div>
        </header>
    )
}
