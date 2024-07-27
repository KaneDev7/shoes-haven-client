import React from 'react'

type QuantityCountType = {
    decreaseQuantity: () => void,
    addQuantity: () => void
    quantity : number
}

export default function QuantityCount({quantity, addQuantity,decreaseQuantity} : QuantityCountType ) {
    return (
        <div className='flex flex-col gap-4 pb-6 border-b'>
            <h2 className='text-[18px] font-semibold'>Choisissez la quantité</h2>
            <div className='w-[130px] h-[40px] flex justify-between items-center border font-bold cursor-pointer select-none rounded-md 0 overflow-hidden'>
                <div onClick={() => decreaseQuantity()} className='w-full h-full flex justify-center items-center border-r bg-gray-100'>-</div>
                <div className='w-full h-full flex justify-center items-center border-l'>{quantity}</div>
                <div onClick={() => addQuantity()} className='w-full h-full flex justify-center items-center border-l bg-gray-100'>+</div>
            </div>
        </div>
    )
}
