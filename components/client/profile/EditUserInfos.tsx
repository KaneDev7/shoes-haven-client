import InputText from '@/components/shared/InputText'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import Button from '../../shared/buttons'
import { emailValidationRegex } from '@/constants/validation'
import useMutatationHook from '@/hooks/useMutatationHook'
import Spiner from '../../shared/Spiner'

// Toast 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CREATE_USER_CONTACT_ADDRESS, ERROR, ERROR_MESSAGE, PENDING, SUCCESS, UPDATE_SUCCESS_MESSAGE } from '@/constants/data'


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
            {status === PENDING && <Spiner/>}

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
                        validations={{ required: { value: true, message: 'Séléctionner d\'abord la Quartier ou nous devons vous livrer votre commande' } }}
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
                        validations={{ required: { value: true, message: 'Le numéro de téléphone est obligatoire' } }}
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
