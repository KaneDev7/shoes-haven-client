import React, { FormEventHandler, useContext, useEffect, } from 'react'
import { FieldErrors, FieldValues, useForm } from 'react-hook-form'
import InputText from '../../admin/form/product/InputText'
import Button from '../shared/buttons'
import { emailValidationRegex } from '@/constants/validation'
import { useSelector } from 'react-redux'
import { CartItem } from '@/types/user.type'
import { CartContext } from '@/context/cartContext'
import Modal from '../modal/modal'
import Link from 'next/link'
import Spiner from '../shared/Spiner'
import { ExpeditionCard } from './ExpeditionCard'
import useMutatationHook from '@/hooks/useMutatationHook'
import { CREATE_ORDER, CREATE_USER_CONTACT_ADDRESS, DELETE_ALL_ITEM_FROM_CART, ERROR, PENDING, SUCCESS } from '@/constants/data'
import { expeditionData } from '@/constants/cart'

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

    const { mutate: mutateAdress, status: mutateAdressStatus } = useMutatationHook({ fonctionName: CREATE_USER_CONTACT_ADDRESS })
    const { mutate: mutateOrder, status: mutateOrderStatus } = useMutatationHook({ fonctionName: CREATE_ORDER })
    const { mutate: mutateCart, status: mutateCartStatus } = useMutatationHook({ fonctionName: DELETE_ALL_ITEM_FROM_CART })

    // const {
    //     mutate: mutateCart, isError: isErrorCart } = useMutation({
    //         mutationFn: async () => {
    //             return await deleteAllItemFromCart(currentUser?.token)
    //         },
    //         onSuccess: async () => {
    //             resetQuantity()
    //             refetch()
    //             setStatus('success')
    //         },
    //     })

    // const {
    //     mutate: mutateOrder, isError: IsErrorOrder } = useMutation({
    //         mutationFn: async (userOrder) => {
    //             return await createOrder(userOrder, currentUser.token)
    //         },

    //         onSettled: (data, error, context) => {
    //             if (data?.status === 201) {
    //                 mutateCart()
    //             } else {
    //                 setStatus('error')
    //             }
    //         },
    //     })

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


    const onSubmit = async (data) => {

        if (!currentUser?.address
            // currentUser.phoneNum !== data.phoneNum ||
            // currentUser?.address?.sstreet !== data.street ||
            // currentUser?.address?.city !== data.city
        ) {
            console.log('add')
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
            console.log('or')
            mutateOrder(userOrder)
        }
    }

    console.log('mutateAdressStatus', mutateAdressStatus, 'mutateOrderStatus', mutateOrderStatus, 'mutateCartStatus', mutateCartStatus)
    useEffect(() => {
        if (mutateAdressStatus === SUCCESS) {
            console.log('mutateAdressStatus', mutateAdressStatus)
            mutateOrder(userOrder)
        }
        if (mutateOrderStatus === SUCCESS) {
            console.log('mutateOrderStatus', mutateOrderStatus)
            mutateCart()
        }
        if (mutateCartStatus === SUCCESS) {
            console.log('mutateCartStatus', mutateCartStatus)
            resetQuantity()
            refetch()
        }
    }, [mutateAdressStatus, mutateOrderStatus, mutateCartStatus])

    return (
        <div className='col-span-1 p-10 border relative'>

            {/* LOADING */}
            {
                mutateAdressStatus === PENDING ||
                mutateOrderStatus === PENDING ||
                mutateCartStatus === PENDING &&
                <Spiner />
            }

            {/* SUCCESS COMMAND */}
            {
                mutateCartStatus === SUCCESS &&
                <Modal title='Commande effectuée'>
                    <div className='space-y-4'>
                        <p> Votre commande est effectuée avec succée. Nous vous enverrons bientot un email. </p>
                        <Link href='acount/orders'>
                            <Button
                                text="Acceder à mes commandes"
                                style='w-full  h-[55px] mt-5 bg-secondaryColor text-blackColor2 font-bold rounded-md'
                            />
                        </Link>
                    </div>
                </Modal>
            }

            {/* ERROR COMMAND */}
            {
                mutateAdressStatus === ERROR ||
                mutateOrderStatus === ERROR ||
                mutateCartStatus === ERROR &&
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
                        expeditionData.map(item => (
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
                            disabled={true}
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
                            validations={{ required: { value: true, message: 'Le numéro de téléphone est obligatoire' } }}
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
