"use client"
import React, { useContext } from 'react'
import Checkout from '@/components/client/cart/Checkout';
import {useQuery } from '@tanstack/react-query';
import { getCart } from '@/api/cart';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdRemoveShoppingCart } from "react-icons/md";
import { useSelector } from 'react-redux';
import Button from '@/components/client/shared/buttons';
import { CartContext } from '@/context/cartContext';
import { CartItem } from '@/components/client/cart/CartItem';


export default function Cart() {
    const router = useRouter()
    const currentUser = useSelector(state => state.currentUser)
    const { setCart, setTotalPrice } = useContext(CartContext)

    if (!currentUser) return router.push('/login')

    const token = currentUser.token
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => getCart(token)
    },)

    const cart = data?.items
    const total = data?.total
    setCart(cart)
    setTotalPrice(total)

    if (!isLoading)
        return (
            <div className='globalMaxWidth mt-10  text-blackColor2 text-[14px] md:text-[16px] '>

                <div className='grid lg:grid-cols-3 grid-cols-1 justify-between  '>
                    <div className='flex-1 lg:col-span-2 col-span-1'>
                        <header className='flex justify-between p-4 border-b font-bold'>
                            <h3 className='w-[40%]  mr-4'>Produit</h3>
                            <h3 className='w-[130px] mr-4'>Prix</h3>
                            <h3 className='flex-1 mr-4' >Taille</h3>
                            <h3 className='flex-1 mr-4' >Quantité</h3>
                            <h3 className='w-[70px] mr-4 '></h3>
                        </header>

                        {
                            cart?.length === 0 &&
                            <div className='w-full flex justify-center items-center flex-col mt-20'>
                                <MdRemoveShoppingCart size={150} opacity={.1} />
                                <p className='mt-5'>Votre panier est vide</p>
                                <Link href='/products'>
                                    <Button
                                        text='Poursuivre les achats'
                                        style='w-full py-3 mt-10 bg-secondaryColor text-blackColor2 font-bold rounded-md'
                                    />
                                </Link>
                            </div>
                        }

                        {
                            cart?.map(cartItme => (
                                <CartItem
                                    cart={cartItme}
                                    refetch={refetch}
                                />
                            ))
                        }
                    </div>
                    <Checkout
                        cart={cart}
                        refetch={refetch}
                    />
                </div>
            </div>
        )
}
