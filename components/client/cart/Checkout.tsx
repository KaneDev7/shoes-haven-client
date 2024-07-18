import React, { FormEventHandler, useContext, useRef, useState } from 'react'
import { FieldErrors, FieldValues, useForm } from 'react-hook-form'
import InputText from '../../admin/form/InputText'
import Button from '../shared/buttons'
import { emailValidationRegex } from '@/constants/validation'
import { useSelector } from 'react-redux'
import { creatUserContactAdress } from '@/api/user'
import { CartItem } from '@/types/user.type'
import { CartContext } from '@/context/cartContext'
import { createOrder } from '@/api/orders'
import { deleteAllItemFromCart } from '@/api/cart'
import Modal from '../modal/modal'
import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'
import Spiner from '../shared/Spiner'

const ExpeditionData: ExpeditionCardType[] = [
    {
        text: 'Livraison Locale',
    },
    {
        text: 'Expédition gratuit',
        number: '100'
    },
    {
        text: 'Livraison Locale',
        number: '3'
    }
]

type ExpeditionCardType = {
    text: string,
    number?: string
}


const ExpeditionCard = ({ text, number }: ExpeditionCardType) => {
    return <div className='flex justify-between items-center opacity-60 font-semibold'>
        <div className='flex gap-2 items-center '>
            <span className='w-[13px] h-[13px] bg-black/20 rounded-full'></span>
            <p className=' font-semibold'>{text} </p>
        </div>
        <p>{number && number} </p>
    </div>
}


type ProductFormType = {
    onSubmit: () => FormEventHandler<HTMLFormElement> | undefined,
    handleSubmit: (data: any) => void,
    register: () => void
    errors: FieldErrors<FieldValues>
}

type CheckOutType = {
    cart: CartItem,
    refetch: () => void
}

export default function Checkout({ cart, refetch }: CheckOutType) {
    const currentUser = useSelector(state => state.currentUser)
    const { totalPrice, resetQuantity } = useContext(CartContext)
    const [status, setStatus] = useState<'pending' | 'success' | 'error'>()

    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm({
        defaultValues: {
            city: currentUser?.address?.city,
            street: currentUser?.address?.street,
            phoneNum: currentUser?.phoneNum,
            email: currentUser.email
        }
    })

    const userOrder = {
        user_id: currentUser._id,
        username: currentUser.username,
        email: currentUser.email,
        items: cart,
        total_price: totalPrice,
        status: 'pendding',
        payment_method: 'Cash',
        order_date: Date.now()
    }

    const {
        mutate: mutateCart, isError: isErrorCart } = useMutation({
            mutationFn: async () => {
                return await deleteAllItemFromCart(currentUser?.token)
            },
            onSuccess: () => {
                resetQuantity()
                refetch()
                setStatus('success')
            },
        })

    const {
        mutate: mutateOrder, isError: IsErrorOrder } = useMutation({
            mutationFn: async (userOrder) => {
                return await createOrder(userOrder, currentUser.token)
            },

            onSettled: (data, error, context) => {
                if (data?.status === 201) {
                    mutateCart()
                }else{
                    setStatus('error')
                }
            },
        })

    const {
        mutate: mutateAdress, isError: isErrorAdress } = useMutation({
            mutationFn: async (userContactAdress) => {
                return await creatUserContactAdress(currentUser.token, userContactAdress)
            },

            onSuccess: () => {
            },

            onSettled: (data, error, context) => {
                if (data?.status === 201) {
                    mutateOrder(userOrder)
                }else{
                    setStatus('error')
                }
            },
        })


    const checkoutRef = useRef()

    const onSubmit = async (data) => {

        setStatus('pending')
        if (!currentUser?.address) {
            const userContactAdress = {
                user_id: currentUser._id,
                phoneNum: data.phoneNum,
                address: {
                    street: data.street,
                    city: data.city
                }
            }
            mutateAdress(userContactAdress)
        } else {
            mutateOrder(userOrder)
        }
    }


    return (
        <div ref={checkoutRef} className='col-span-1 p-10 border relative'>

            {/* LOADING */}
            {
                status === 'pending' &&
                <Spiner />
            }

            {/* SUCCESS COMMAND */}
            {status === 'success' &&
                <Modal title='Commande effectuée'>
                    <div className='space-y-4'>
                        <p> Votre commande est effectuée avec succée. Nous vous enverrons bientot un email. </p>
                        <Link href='/orders'>
                            <Button
                                text="Acceder à mes commandes"
                                style='w-full  h-[55px] mt-5 bg-secondaryColor text-blackColor2 font-bold rounded-md'
                            />
                        </Link>
                    </div>
                </Modal>
            }

            {/* ERROR COMMAND */}
            {status === 'error' &&
                <Modal title='Commande échouée' status='error'>
                    <div className='space-y-4'>
                        <p> Quelques choses s'est mal passer. Réssayer ultérieurement </p>
                    </div>
                </Modal>
            }

            <header className='priceEl space-y-3 pb-4 border-b'>
                <h1 className='text-2xl font-bold '>CART TOTAL</h1>
                <div className='flex justify-between font-semibold'>
                    <p>TOTAL</p>
                    <p>{totalPrice?.toLocaleString()} FCFA</p>
                </div>
            </header>

            <div className='mt-10'>
                <h2 className='font-bold text-xl'> Expédition </h2>
                <div className='space-y-2 mt-5'>
                    {
                        ExpeditionData.map(item => (
                            <ExpeditionCard
                                text={item.text}
                                number={item.number}
                            />
                        ))
                    }
                </div>
            </div>

            <div className='mt-10'>
                <form action="" onSubmit={handleSubmit(onSubmit)} >
                    <div className='space-y-2 mt-5'>
                        <h2 className='font-bold text-xl'> Adress de livraison </h2>
                        <InputText
                            placeholder='Ville'
                            name='city'
                            errors={errors}
                            register={register}
                            validations={{
                                required: { value: true, message: 'Séléctionner d\'abord la ville ou département' }
                            }}
                        />

                        <InputText
                            placeholder='Quartier'
                            variant='single'
                            name='street'
                            errors={errors}
                            register={register}
                            validations={
                                {
                                    required: { value: true, message: 'Séléctionner d\'abord la Quartier ou nous devons vous livrer votre commande' }
                                }
                            }
                        />
                    </div>


                    <div className='space-y-2 mt-5'>
                        <h2 className='font-bold text-xl'> Contact </h2>

                        <InputText
                            placeholder='Votre email'
                            name='email'
                            type='email'
                            errors={errors}
                            register={register}
                            validations={{
                                required: { value: true, message: "L'email est obligatoire" },
                                pattern: {
                                    value: emailValidationRegex,
                                    message: "Entrez un email valide"
                                },
                            }}
                        />

                        <InputText
                            placeholder='Votre numéro de téléphone'
                            name='phoneNum'
                            errors={errors}
                            register={register}
                            validations={
                                {
                                    required: { value: true, message: 'Le numéro de téléphone est obligatoire' }
                                }
                            }
                        />
                    </div>

                    <Button
                        text="Passer la commande"
                        type='submit'
                        style={`w-full h-[55px] mt-10 bg-secondaryColor text-blackColor2 font-bold rounded-md  ${totalPrice === 0 && ' pointer-events-none opacity-50'}  `}
                    />
                </form>

            </div>
        </div>
    )
}