import React from 'react'
import Input from '../shared/Input'
import Button from '../shared/buttons'

export default function Subcribe() {
    return (
        <div className='globalMaxWidth mt-10 flex justify-center'>
            <div className='max-w-[550px] w-full flex items-center justify-center flex-col gap-4'>
                <h2 className='text-2xl font-bold text-center'>Enregistre-moi!</h2>
                <p className='text-center'>Recevez les dernières nouvelles de nos offres et vols directement dans votre boîte de réception...</p>
                <form action="" className='w-full'>
                    <div className='w-full h-[50px] flex items-center gap-2'>
                        <Input
                            value=''
                            placeholder='Votre email'
                            type='text'
                            style='flex-1'
                        />
                        <Button text="S'abonner" style='w-[25%] h-full bg-secondaryColor py-2 text-black font-bold ' />
                    </div>
                </form>
            </div>
        </div>
    )
}
