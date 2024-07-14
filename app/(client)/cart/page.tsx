"use client"
import Image from 'next/image'
import { AiFillCloseCircle } from "react-icons/ai";
import React, { useContext }  from 'react'
import Checkout from '@/components/client/Checkout';
import { Product } from '@/types/product.type';
import { CartItem as CartType } from '@/types/user.type';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getOneProduct } from '@/api/products';
import { deleteItemFromCart, getCart } from '@/api/cart';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdRemoveShoppingCart } from "react-icons/md";
import { useSelector } from 'react-redux';
import Button from '@/components/client/buttons';
import { CartContext } from '@/context/cartContext';


const CartItem = ({ cart, refetch }: { cart: CartType,refetch : any }) => {
    const currentUser = useSelector(state => state.currentUser)
    const productId = cart.productId

    const { data, isLoading, error } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => getOneProduct(productId)
    })


    const { mutate } = useMutation({        
        mutationFn: async () => {
            const data: { user_id: string, productId: string, size :string } = { user_id: currentUser._id, size : cart.size , productId}
            await deleteItemFromCart(currentUser.token, data)
        },

        onError: (err) => {
            console.log(err)
        },
        
        onSuccess : () =>{
            refetch()
        }
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
            <p data-total={Number(product.price * cart.quantity)} className='priceEl w-[130px] flex items-center mr-4'>{product.price?.toLocaleString()} FCFA</p>
            <p className='flex-1 flex items-center  mr-4'>{cart.size}  </p>
            <p className='flex-1 flex items-center  mr-4'>{cart.quantity} </p>
            <p className='w-[70px]'>
                <AiFillCloseCircle
                    onClick={() =>  mutate()}
                    className='absolute right-5 top-[50%] translate-y-[-50%] text-[22px] md:text-[25px]' color='red' />
            </p>
        </div>
}

export default function Cart() {
    const router = useRouter()
    const currentUser = useSelector(state => state.currentUser)
    const {setCart, setTotalPrice} = useContext(CartContext)

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
                            cart?.length === 0 &&
                            <div className='w-full flex justify-center items-center flex-col mt-20'>
                                <MdRemoveShoppingCart size={150} opacity={.5} />
                                <p className='mt-5'>Votre panier est vide</p>
                                <Link href='/products'>
                                    <Button
                                        text='Poursuivre les achats'
                                        style='w-full h-[55px] mt-10 bg-secondaryColor text-blackColor2 font-bold rounded-md'
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
                    />
                </div>
            </div>
        )
}
