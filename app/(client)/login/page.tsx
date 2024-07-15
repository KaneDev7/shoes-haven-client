"use client"
import { login } from '@/api/authentification'
import { getUser } from '@/api/user'
import InputText from '@/components/admin/form/InputText'
import Button from '@/components/client/shared/buttons'
import Spiner from '@/components/client/shared/Spiner'
import { handleResponseError } from '@/utils/errorResponse'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'


export default function Login() {
    const [errorMessage, setErrorMessage] = useState('')
    const [isSubmiting, setIsSubmiting] = useState(false)
    const currentUser = useSelector(state => state.currentUser)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: currentUser?.username,
        }
    })

    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append('username', data.username)
        formData.append('password', data.password)

        setIsSubmiting(true)
        const response = await login(formData)

        const errorHandeler = handleResponseError(response)
        if (errorHandeler.message) {
            setIsSubmiting(false)
            return setErrorMessage(errorHandeler.message)
        }

        try {
            const userData = await getUser(response?.data?.token)
            sessionStorage.setItem('session', JSON.stringify(userData))
            sessionStorage.setItem(`cart_${userData?._id}`, JSON.stringify(userData?.cart))
            window.location.href = '/'
        } catch (error) {
            return setErrorMessage('Quelques chose s\'est mal passée réssayer plus tard ')
        }
    }

    return (
        <div className='max-w-[1200px] w-full mx-auto flex justify-center items-center mt-20 shadow-sm rounded-md bg-white'>
            <div className='w-full flex md:flex-row flex-col-reverse'>
                {/* images */}
                <Image src='/login.jpg' width={1000} height={1000}
                    className='md:w-[50%] w-full object-cover' alt='' />

                {/* form */}
                <div className='flex-1 p-20 relative'>
                    {isSubmiting && <Spiner />}
                    <h1 className='text-3xl font-bold mb-10 text-center '>Se connecter </h1>
                    {
                        currentUser?.isNew && <p className='text-sm my-4 bg-green-100 text-green-500 p-4 rounded-md'> Compte crée avec succée </p>
                    }
                    {
                        errorMessage && <p className='text-sm my-4 bg-red-100 text-red-500 p-4 rounded-md'> {errorMessage} </p>
                    }


                    <form className='flex flex-col gap-4' action="" onSubmit={handleSubmit(onSubmit)}>
                        <InputText
                            name='username'
                            placeholder='Entrez votre nom et prénom'
                            label='Nom d’utilsateur'
                            type='text'
                            errors={errors}
                            register={register}
                            variant='cours'
                            validations={{
                                required: { value: true, message: "Le nom d’utilsateur est obligatoire" },
                            }}
                        />

                        <InputText
                            name='password'
                            placeholder='Entrez votre mot de passe'
                            label='Mot de passe'
                            type='password'
                            errors={errors}
                            register={register}
                            variant='cours'
                            validations={{
                                required: { value: true, message: "Le mot de passe est obligatoire" },
                            }}
                        />

                        <Button
                            text="Se connecter"
                            type='submit'
                            style='w-full  h-[55px] mt-5 bg-secondaryColor text-blackColor2 font-bold rounded-md'
                        />
                    </form>

                    <p className='mt-5'>
                        Vous n'avez pas encore de compte?<Link href='/register' className='text-secondaryColor font-semibold hover:underline '> s'insrire </Link> maintenant
                    </p>
                </div>
            </div>
        </div>
    )
}

