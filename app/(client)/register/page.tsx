"use client"
import Spiner from '@/components/shared/Spiner'
import { CREATE_USER, ERROR, ERROR_MESSAGE, PENDING } from '@/constants/data'
import useMutatationHook from '@/hooks/useMutatationHook'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import RegisterForm from '@/components/client/form/RegisterForm'


export default function Register() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { mutate, status, errorMessage } = useMutatationHook({ fonctionName: CREATE_USER })

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append('username', data.username)
    formData.append('email', data.email)
    formData.append('password', data.password)
    mutate(formData)
  }

  return (
    <div className='max-w-[1200px] w-full mx-auto flex justify-center items-center mt-20 shadow-sm rounded-md bg-white'>
      <div className='w-full flex md:flex-row flex-col-reverse'>
        {/* images */}
        <Image src='/login.jpg' width={1000} height={1000} className='md:w-[50%] w-full object-cover' alt='' />

        {/* form */}
        <div className=' flex-1 p-20 relative'>
          {status === PENDING && <Spiner />}
          <h1 className='text-3xl font-bold mb-10 text-center '>Créer un compte</h1>
          {status === ERROR && <p className='text-sm my-4 bg-red-100 text-red-500 p-4 rounded-md'> {errorMessage || ERROR_MESSAGE} </p>}

          <RegisterForm
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            watch={watch}
          />

          <p className='mt-5'>
            Vous avez deja un compte?
            <Link href='/login' className='text-secondaryColor font-semibold hover:underline '>
              se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

