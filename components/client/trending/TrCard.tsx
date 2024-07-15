import Image from 'next/image'
import React from 'react'
import Button from '../shared/buttons'
import Sizes from '../sidebar/Sizes'

export default function TrCard({src}:{src : string} ) {
    return (
        <div className='w-[400px] h-[500px] flex flex-col bg-bg_gray_light justify-between rounded-lg  flex-none p-4 '>
            <header className='w-full'>
                <div className='w-full flex justify-between items-center'>
                    <p className='opacity-50'>Jordan</p>
                    <p className='font-semibold '>25 000 FCFA</p>
                </div>
                <h2 className='font-semibold '>Jordan Jumpman MVP</h2>
                <div className='flex items-center gap-2 mt-3'>
                    <span className='w-[20px] h-[20px] rounded-full bg-[orange]'></span>
                    <span className='w-[20px] h-[20px] rounded-full bg-[green]'></span>
                    <span className='w-[20px] h-[20px] rounded-full bg-[red]'></span>
                </div>
            </header>

            <Image className='w-[80%] mx-auto' src={src} width={200} height={200} alt='' />

            <div className='w-full flex justify-between'>
                <Sizes sizes={[40, 41, 42, 43]}
                />
                <Button text='Ajouter au panier'style='bg-black text-white py-1 rounded-full' />
            </div>
        </div>
    )
}
