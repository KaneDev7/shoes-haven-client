import InputText from '@/components/shared/InputText'
import Button from '@/components/shared/buttons'
import React, { FormEventHandler } from 'react'
import { FieldErrors, FieldValues } from 'react-hook-form'

export type AuthFormType = {
    onSubmit: () => FormEventHandler<HTMLFormElement> | undefined,
    handleSubmit: (data: any) => void,
    register: () => void
    errors: FieldErrors<FieldValues>
}

export default function LoginForm({ errors, handleSubmit, onSubmit, register }: AuthFormType) {

    return (
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
    )
}
