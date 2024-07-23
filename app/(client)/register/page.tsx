"use client"
import { createUser } from '@/api/authentification'
import InputText from '@/components/admin/form/product/InputText'
import Button from '@/components/client/shared/buttons'
import Spiner from '@/components/client/shared/Spiner'
import { emailValidationRegex } from '@/constants/validation'
import { setcurrentUser } from '@/redux/domains/users/currentUser.slice'
import { handleResponseError } from '@/utils/errorResponse'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'


export default function Register() {
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmiting, setIsSubmiting] = useState(false)

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [password, confirmPassword] = watch(['password', 'confirmPassword'])
  const router = useRouter()
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    console.log('data', data)
    const formData = new FormData()
    formData.append('username', data.username)
    formData.append('email', data.email)
    formData.append('password', data.password)

    setIsSubmiting(true)

    const response = await createUser(formData)
    console.log('response', response)

    const errorHandeler = handleResponseError(response)
    if (errorHandeler.message) {
      setIsSubmiting(false)
      return setErrorMessage(errorHandeler.message)
    }
    dispatch(setcurrentUser({
      username: data.username,
      password: data.password,
      email: data.email,
      isNew : true,
    }))

    router.push('/login')

  }

  return (
    <div className='max-w-[1200px] w-full mx-auto flex justify-center items-center mt-20 shadow-sm rounded-md bg-white'>
      <div className='w-full flex md:flex-row flex-col-reverse'>
        {/* images */}
        <Image src='/login.jpg' width={1000} height={1000}
          className='md:w-[50%] w-full object-cover' alt='' />

        {/* form */}
        <div className=' flex-1 p-20 relative'>
          {isSubmiting && <Spiner />}
          <h1 className='text-3xl font-bold mb-10 text-center '>Créer un compte</h1>
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
                maxLength: {
                  value: 20,
                  message: "Le nom d'utilisateiurs ne doit pas dépasser 20 charactères"
                },
                minLength: {
                  value: 5,
                  message: "Le nom d'utilisateiurs ne doit avoir au minimmum  5 charactères"
                }
              }}
            />

            <InputText
              name='email'
              placeholder='Entrez votre email'
              label='Email'
              type='text'
              errors={errors}
              register={register}
              variant='cours'
              validations={{
                required: { value: true, message: "L'email est obligatoire" },
                pattern: {
                  value: emailValidationRegex,
                  message: "Entrez un email valide"
                },

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
                minLength: {
                  value: 3,
                  message: "Le mot de passe est trop petit"
                },
                required: { value: true, message: "Le mot passse est obligatoire" },
                validate: () => password === confirmPassword || "Les mots de passes ne se coreespondent pas"
              }}
            />

            <InputText
              name='confirmPassword'
              placeholder='Entrez la confirmation de votre mot de passe'
              label='Comfirmer le  mot de passe '
              type='password'
              errors={errors}
              register={register}
              variant='cours'
              validations={{
                required: { value: true, message: "La confirmation du mot de passe est obligatoire" },
                validate: () => password === confirmPassword || "Les mots de passes ne se coreespondent pas"
              }}
            />
            <Button
              text="S'inscrire"
              type='submit'
              style='w-full  h-[55px] mt-5 bg-secondaryColor text-blackColor2 font-bold rounded-md'
            />
          </form>

          <p className='mt-5'>
            Vous avez deja un compte?<Link href='/login' className='text-secondaryColor font-semibold hover:underline '> se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

