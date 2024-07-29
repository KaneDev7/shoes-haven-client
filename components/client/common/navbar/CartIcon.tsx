import { CartContext } from '@/context/cartContext'
import Link from 'next/link'
import React, { useContext } from 'react'
import { IoBagOutline } from 'react-icons/io5'

export default function CartIcon() {
    const { cartQuantities } = useContext(CartContext)

    return (
        <Link href='/cart'>
            <div className='w-[50px] h-[50px] flex justify-center items-center rounded-full bg-white text-blackColor2 relative'>
                <IoBagOutline size={20} />
                <span
                    className='w-[20px] h-[20px] flex justify-center items-center absolute right-[-4px] text-[11px]  top-[-4px] rounded-full bg-red-600 text-white font-bold '>
                    {cartQuantities}
                </span>
            </div>
        </Link>
    )
}
