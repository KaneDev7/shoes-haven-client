"use client"
import { deleteItemFromCart } from "@/api/cart"
import { getOneProduct } from "@/api/products"
import { Product } from "@/types/product.type"
import { useMutation, useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { AiFillCloseCircle } from "react-icons/ai"
import { useSelector } from "react-redux"
import { CartItem as CartType } from '@/types/user.type';


export const CartItem = ({ cart, refetch }: { cart: CartType, refetch: any }) => {
    const currentUser = useSelector(state => state.currentUser)
    const productId = cart.productId

    const { data, isLoading, error } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => getOneProduct(productId)
    })

    const { mutate } = useMutation({
        mutationFn: async () => {
            const data: { user_id: string, productId: string, size: string } = { user_id: currentUser._id, size: cart.size, productId }
            await deleteItemFromCart(currentUser.token, data)
        },

        onError: (err) => {
            console.log(err)
        },

        onSuccess: () => {
            refetch()
        }
    })

    const product = data as Product

    if (!isLoading)
        return <div className='flex justify-between p-4 border-b relative'>
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
                    onClick={() => mutate()}
                    className='absolute right-5 top-[50%] translate-y-[-50%] text-[22px] md:text-[25px]' color='red' />
            </p>
        </div>
}