import { executeMutateFonction } from '@/api/mutate'
import { ADD_TO_CART, CREATE_USER, CREATE_USER_CONTACT_ADDRESS, DELETE_ITEM_FROM_CART, ERROR, LOGIN, PENDING, SUCCESS } from '@/constants/data'
import { CartContext } from '@/context/cartContext'
import { setcurrentUser } from '@/redux/domains/users/currentUser.slice'
import { MutateFonctionName, MutateStatus } from '@/types/mutate.type'
import { Status } from '@/types/product.type'
import { updateCart } from '@/utils/cart'
import { updateSession } from '@/utils/session'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export type MutationOption = {
    method?: 'POST' | 'DELTE' | 'PUT',
    fonctionName: MutateFonctionName,
    token? : string
    status? : Status
    id? : string 
}

export default function useMutatationHook(option: MutationOption) {
    const currentUser = useSelector(state => state.currentUser)
    const { resetQuantity } = useContext(CartContext)
    const [status, setStatus] = useState<MutateStatus>()
    const [errorMessage, setErrorMessage] = useState<string>('')
    const dispatch = useDispatch()
    const router = useRouter()

    const isUserDataChanged = option.fonctionName === CREATE_USER_CONTACT_ADDRESS || option.fonctionName === LOGIN

    const { mutate } = useMutation({
        mutationFn: async (data) => {
            setStatus(PENDING)
            return await executeMutateFonction(data, option)
        },

        onSettled: async (data, error, context) => {
            if (data?.status === 201 || data?.status === 204) {
                // login or update adress user
                if (isUserDataChanged) {
                    try {
                        const token = option.fonctionName === LOGIN ? data?.token : currentUser?.token
                        const userData = await updateSession(token, currentUser.user_id as string)
                        dispatch(setcurrentUser(userData))
                        if (option.fonctionName === LOGIN) window.location.href = '/'

                    } catch (err) {
                        setStatus(ERROR)
                        setErrorMessage(err.message)
                    }
                }
                // register
                if (option.fonctionName === CREATE_USER) router.push('/login')

                // cart
                if (option.fonctionName === ADD_TO_CART) {
                    const { quantity } = await updateCart(currentUser.token)
                    resetQuantity(quantity)
                }
                setStatus(SUCCESS)
            } else {
                setStatus(ERROR)
                const message = data?.response?.data?.message[0]
                setErrorMessage(message)
            }
        },
    })

    return { mutate, status, errorMessage }
}
