import InputText from '@/components/shared/InputText'
import Button from '@/components/shared/buttons'
import React, { FormEventHandler } from 'react'
import { FieldErrors, FieldValues } from 'react-hook-form'
import { emailValidationRegex } from '@/constants/validation'

export type AuthFormType = {
    onSubmit: () => FormEventHandler<HTMLFormElement> | undefined,
    handleSubmit: (data: any) => void,
    register: () => void
    errors: FieldErrors<FieldValues>
}

export default function UserInfosForm({ errors, handleSubmit, onSubmit, register }: AuthFormType) {
    return (
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
    )
}
