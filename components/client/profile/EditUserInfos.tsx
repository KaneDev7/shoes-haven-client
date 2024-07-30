import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import useMutatationHook from '@/hooks/useMutatationHook'
import Spiner from '../../shared/Spiner'

// Toast 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CREATE_USER_CONTACT_ADDRESS, ERROR, ERROR_MESSAGE, PENDING, SUCCESS, UPDATE_SUCCESS_MESSAGE } from '@/constants/data'
import UserInfosForm from './UserInfosForm'


export default function EditUserInfos() {
    const currentUser = useSelector(state => state.currentUser)
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
    const { mutate: mutateAdress, status } = useMutatationHook({ fonctionName: CREATE_USER_CONTACT_ADDRESS })

    const onSubmit = async (data) => {
        const userContactAdress = {
            user_id: currentUser._id,
            phoneNum: data.phoneNum,
            address: {
                street: data.street,
                city: data.city
            }
        }
        mutateAdress(userContactAdress)
    }

    useEffect(() => {
        if (status === SUCCESS) {
            toast.success(UPDATE_SUCCESS_MESSAGE, { hideProgressBar: true })
        }
        if (status === ERROR) {
            toast.error(ERROR_MESSAGE, { hideProgressBar: true })
        }
    }, [status])

    return (
        <div className='relative'>
            <ToastContainer />
            {status === PENDING && <Spiner />}

            <UserInfosForm
                errors={errors}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
            />
        </div>
    )
}
