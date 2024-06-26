import React, { PropsWithChildren, ReactNode } from 'react'

export default function Header({children, title} : {title? : string, children? : ReactNode } ) {
    return (
        <header className='flex justify-between flex-wrap items-center p-7 bg-white w-full'>
            <h1 className='text-2xl font-bold'> {title ? title : 'Produits'}</h1>
            <div className='flex lg:items-center items-start lg:flex-row flex-col-reverse gap-4'>
                {children}
            </div>
        </header>
    )
}
