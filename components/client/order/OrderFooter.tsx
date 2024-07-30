import Button from '@/components/shared/buttons'
import React, { useContext } from 'react'
import { OrderCardContext } from './OrderCard'

export default function OrderFooter() {
  const {status, isShowContent} = useContext(OrderCardContext)

  if(status === 'pending' && isShowContent)
    return (
        <footer className='w-full flex justify-end items-center mt-10'>
            <Button
                text='Annuler la commande'
                style='border-2 bg-red-400 text-white p-2 rounded-md text-xs opacity-90 hover:opacity-100'
            />
        </footer>
    )
}
