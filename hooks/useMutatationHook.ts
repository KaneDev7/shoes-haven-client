import { executeMutateFonction } from '@/api/mutate'
import { CREATE_USER, CREATE_USER_CONTACT_ADDRESS, ERROR, LOGIN, PENDING, SUCCESS } from '@/constants/data'
import { setcurrentUser } from '@/redux/domains/users/currentUser.slice'
import { MutateFonctionName, MutateStatus } from '@/types/mutate.type'
import { updateSession } from '@/utils/session'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type useMutationHookType = {
    callback: () => Promise<void>
}

type Option = {
    method?: 'POST' | 'DELTE' | 'PUT',
    fonctionName: MutateFonctionName
}

export default function useMutatationHook(option: Option) {
    const currentUser = useSelector(state => state.currentUser)
    const [status, setStatus] = useState<MutateStatus>()
    const [errorMessage, setErrorMessage] = useState<string>('')
    const dispatch = useDispatch()
    const router = useRouter()

    const isUserDataChanged = option.fonctionName === CREATE_USER_CONTACT_ADDRESS || option.fonctionName === LOGIN
    const isAuthenticateAction = option.fonctionName === LOGIN || option.fonctionName === CREATE_USER
   
    const { mutate } = useMutation({
        mutationFn: async (data) => {
            setStatus(PENDING)
            if (isAuthenticateAction) {
                return await executeMutateFonction(option.fonctionName, undefined, data, undefined, undefined)
            }
            return await executeMutateFonction(option.fonctionName, currentUser.token, data)
        },

        onSettled: async (data, error, context) => {
            if (data?.status === 201 || data?.status === 204) {
                // login or update adress user
                if (isUserDataChanged) {
                    try {
                        const token = option.fonctionName === LOGIN ? data?.token : currentUser?.token
                        const userData = await updateSession(token)
                        dispatch(setcurrentUser(userData))
                        if (option.fonctionName === LOGIN) window.location.href = '/'

                    } catch (err) {
                        setStatus(ERROR)
                        setErrorMessage(err.message)
                    }
                }
                // register
                if(option.fonctionName === CREATE_USER) router.push('/login')
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
