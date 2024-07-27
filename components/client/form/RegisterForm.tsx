import InputText from '@/components/shared/InputText'
import Button from '@/components/shared/buttons'
import { emailValidationRegex } from '@/constants/validation'
import React, { FormEventHandler } from 'react'
import { FieldErrors, FieldValues, UseFormWatch } from 'react-hook-form'

export type AuthFormType = {
    onSubmit: () => FormEventHandler<HTMLFormElement> | undefined,
    handleSubmit: (data: any) => void,
    register: () => void
    watch: UseFormWatch<FieldValues>
    errors: FieldErrors<FieldValues>
  }

export default function RegisterForm({errors,handleSubmit,onSubmit,register,watch} : AuthFormType) {
  const [password, confirmPassword] = watch(['password', 'confirmPassword'])
    
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
    )
}
