import React, { FormEventHandler } from 'react'
import InputSelect from '../admin/InputSelect.admin'
import { FieldErrors, FieldValues, useForm } from 'react-hook-form'
import InputText from '../admin/InputText'
import Button from './buttons'
import { emailValidationRegex } from '@/constants/validation'

const ExpeditionData: ExpeditionCardType[] = [
    {
        text: 'Livraison Locale',
    },
    {
        text: 'Expédition gratuit',
        number: '100'
    },
    {
        text: 'Livraison Locale',
        number: '3'
    }
]

type ExpeditionCardType = {
    text: string,
    number?: string
}


const ExpeditionCard = ({ text, number }: ExpeditionCardType) => {
    return <div className='flex justify-between items-center opacity-60 font-semibold'>
        <div className='flex gap-2 items-center '>
            <span className='w-[13px] h-[13px] bg-black/20 rounded-full'></span>
            <p className=' font-semibold'>{text} </p>
        </div>
        <p>{number && number} </p>
    </div>
}
type ProductFormType = {
    onSubmit: () => FormEventHandler<HTMLFormElement> | undefined,
    handleSubmit: (data: any) => void,
    register: () => void
    errors: FieldErrors<FieldValues>
}


export default function Checkout() {

    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm({
        defaultValues: {

        }
    })

    const onSubmit = async () => {

    }

    return (
        <div className='col-span-1 p-10 border'>
            <header className='space-y-3 pb-4 border-b'>
                <h1 className='text-2xl font-bold '>CART TOTAL</h1>
                <div className='flex justify-between font-semibold'>
                    <p>TOTAL</p>
                    <p>45 000 FCFA</p>
                </div>
            </header>

            <div className='mt-10'>
                <h2 className='font-bold text-xl'> Expédition </h2>
                <div className='space-y-2 mt-5'>
                    {
                        ExpeditionData.map(item => (
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
                            validations={
                                {
                                    required: { value: true, message: 'Séléctionner d\'abord la ville ou département' }
                                }
                            }
                        />

                        <InputText
                            placeholder='Quartier'
                            variant='single'
                            name='street'
                            errors={errors}
                            register={register}
                            validations={
                                {
                                    required: { value: true, message: 'Séléctionner d\'abord la Quartier ou nous vous livrons le produit' }
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
                        text="Passer la commande"
                        type='submit'
                        style='w-full h-[55px] mt-10 bg-secondaryColor text-blackColor2 font-bold rounded-md'
                    />
                </form>

            </div>
        </div>
    )
}
