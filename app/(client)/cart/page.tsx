"use client"
import Image from 'next/image'
import { AiFillCloseCircle } from "react-icons/ai";
import React, { useContext } from 'react'
import Checkout from '@/components/client/Checkout';
import { Product } from '@/types/product.type';
import { CartItem as CartType } from '@/types/user.type';
import { useQuery } from '@tanstack/react-query';
import { getOneProduct } from '@/api/products';

import { getCart } from '@/api/cart';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CartItem = ({ cart }: { cart: CartType }) => {
    const productId = cart.productId

    const { data, isLoading, error } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => getOneProduct(productId)
    })

    const product = data as Product

    if (!isLoading)
        return <div className='flex justify-between p-4 border-b relative '>
            <div className='w-[40%] flex items-center gap-4 mr-4'>
                <Link href={`/products/${productId}`}>
                <Image
                    src={`/uploads/${product?.uri[0]}`}
                    placeholder='blur'
                    blurDataURL='/placeholder.jpg'
                    height={200}
                    width={200}
                    alt=""
                    className='lg:w-[120px] w-[100px] rounded-md '
                />
                </Link>

                <p className=''>{product.title} </p>
            </div>
            <p className='w-[130px] flex items-center mr-4'>{product.price} FCFA</p>
            <p className='flex-1 flex items-center  mr-4'>{cart.size}  </p>
            <p className='flex-1 flex items-center  mr-4'>{cart.quantity} </p>
            <p className='w-[70px]'>
                <AiFillCloseCircle className='absolute right-5 top-[50%] translate-y-[-50%] text-[22px] md:text-[25px]' color='red' />
            </p>
        </div>
}

export default function Cart() {

    const router = useRouter()
    const session = JSON.parse(sessionStorage.getItem(`session`)) || null
    if(!session) return router.push('/login')
        
    const token = session.token
    const { data, isLoading, error } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => getCart(token)
    })
    const cart = data?.cart

    if (!isLoading)

        return (
            <div className='globalMaxWidth mt-10  text-blackColor2 text-[14px] md:text-[16px]'>
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
                            cart?.map(cartItme => (
                                <CartItem
                                    cart={cartItme}
                                />
                            ))
                        }
                    </div>
                    <Checkout />
                </div>
            </div>
        )
}
