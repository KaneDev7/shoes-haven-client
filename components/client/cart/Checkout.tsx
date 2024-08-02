import React, { useContext, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../shared/buttons'
import { useSelector } from 'react-redux'
import { CartContext } from '@/context/cartContext'
import Modal from '../modal/modal'
import Link from 'next/link'
import Spiner from '../../shared/Spiner'
import { ExpeditionCard } from './ExpeditionCard'
import useMutatationHook from '@/hooks/useMutatationHook'
import { CREATE_ORDER, CREATE_USER_CONTACT_ADDRESS, DELETE_ALL_ITEM_FROM_CART, ERROR, PENDING, SUCCESS } from '@/constants/data'
import { expeditionData } from '@/constants/cart'
import { CartItem } from '@/types/cart.type'
import { addressAndContactObjectFactory, checkUserInfosDiff, orderObjectFactory } from '@/utils/cart'
import UserInfosForm from '../profile/UserInfosForm'

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

    const  userOrder = useMemo(() => {
        return orderObjectFactory(currentUser, { cart, totalPrice })
    }, [currentUser, cart, totalPrice])

    const onSubmit = async (data: any) => {
        const isUserInfosChanged = checkUserInfosDiff(currentUser, data)
        const addressAndContactObject = addressAndContactObjectFactory(currentUser, data)

        if (isUserInfosChanged) {
            mutateAdress(addressAndContactObject)
        } else {
            console.log('userOrder', userOrder)
            mutateOrder(userOrder)
        }
    }

    useEffect(() => {
        if (mutateAdressStatus === SUCCESS) {
            mutateOrder(userOrder)
        }
    }, [mutateAdressStatus])

    useEffect(() => {
        if (mutateOrderStatus === SUCCESS) {
            mutateCart()
        }
    }, [mutateOrderStatus])

    useEffect(() => {
        if (mutateCartStatus === SUCCESS) {
            resetQuantity()
            refetch()
        }
    }, [mutateCartStatus])

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
                <Modal title='Commande effectuée' status='success'>
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
                <UserInfosForm
                    errors={errors}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    register={register}
                />
            </div>
        </div>
    )
}



