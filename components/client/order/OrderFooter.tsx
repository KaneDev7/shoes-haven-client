import Button from '@/components/shared/buttons'
import React from 'react'

export default function OrderFooter() {
    return (
        <footer className='w-full flex justify-end items-center mt-10'>
            <Button
                text='Annuler la commande'
                style='border-2 bg-red-400 text-white p-2 rounded-md text-xs opacity-90 hover:opacity-100'
            />
        </footer>
    )
}
