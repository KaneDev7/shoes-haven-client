import React, { useContext } from 'react'
import { OrderCardContext } from './OrderCard'

export default function OrderHeader() {
  const {order_date} = useContext(OrderCardContext)

    return (
        <header className='w-full flex justify-between items-center border-b pb-4'>
            <div className=''>
                <h2 className='text-lg font-bold'>Commande  ID : 334902461 </h2>
                <small className='text-black/50'>Date de la command :  {new Date(order_date).toLocaleDateString()} </small>
            </div>
        </header>
    )
}
