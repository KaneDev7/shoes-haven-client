import { creatUserContactAdress, getUser } from '@/api/user'
import InputText from '@/components/admin/form/product/InputText'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../shared/buttons'
import { emailValidationRegex } from '@/constants/validation'


// Toast 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spiner from '../shared/Spiner'
import { setcurrentUser } from '@/redux/domains/users/currentUser.slice'


type EditUserInfosType = {
    refetch: () => void

}
export default function EditUserInfos({ refetch }: EditUserInfosType) {
    const currentUser = useSelector(state => state.currentUser)
    const [status, setStatus] = useState<'pending' | 'success' | 'error'>()
    const dispatch = useDispatch()

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

    const {
        mutate: mutateAdress, isError: isErrorAdress } = useMutation({
            mutationFn: async (userContactAdress) => {
                return await creatUserContactAdress(currentUser.token, userContactAdress)
            },

            onSettled: async (data, error, context) => {
                if (data?.status === 201) {
                    refetch()
                    setStatus('success')
                    console.log('success')
                    try {
                        const userData = await getUser(currentUser?.token)
                        sessionStorage.setItem('session', JSON.stringify(userData))
                        sessionStorage.setItem(`cart_${userData?._id}`, JSON.stringify(userData?.cart))
                        toast.success("Vos informations ont été mis à jour avec succée", { hideProgressBar: true })
                        dispatch(setcurrentUser(userData))
                    } catch (error) {
                        window.location.href = '/login'
                    }

                } else {
                    setStatus('error')
                    console.log('error')
                    toast.error("Quelques chose s'est mal passé. réssayer ultérieurement", { hideProgressBar: true })
                }
            },
        })


    const onSubmit = async (data) => {

        setStatus('pending')
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

    return (
        <div className='relative'>
            <ToastContainer />
            {
                status === 'pending' &&
                <Spiner />
            }
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
                        disabled={true}
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
                    text="Enregistrer"
                    type='submit'
                    style={`w-full h-[55px] mt-10 bg-secondaryColor text-blackColor2 font-bold rounded-md `}
                />
            </form>
        </div>
    )
}
