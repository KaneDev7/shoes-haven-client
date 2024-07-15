import React from 'react'
import ReinsuranceCard from './ReinsuranceCard'
import { CiDeliveryTruck } from 'react-icons/ci'

export default function Reinsurance() {
    return (
        <div className='w-full mt-10 globalMaxWidth'>
            <ul className='w-full grid sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-20'>
                <ReinsuranceCard
                    icon={<CiDeliveryTruck size={40} className='flex-shrink-0' />}
                    title='Livraison GRATUITE à partir de 125 £'
                    text='3,50 £ Livraison standard au Royaume-Uni'
                    style='opacity-80 col-span-1 '
                />
                <ReinsuranceCard
                    icon={<CiDeliveryTruck size={40} className='flex-shrink-0' />}
                    title='Livraison GRATUITE à partir de 125 £'
                    text='3,50 £ Livraison standard au Royaume-Uni'
                    style='opacity-80 col-span-1 '
                />
                <ReinsuranceCard
                    icon={<CiDeliveryTruck size={40} className='flex-shrink-0' />}
                    title='Livraison GRATUITE à partir de 125 £'
                    text='3,50 £ Livraison standard au Royaume-Uni'
                    style='opacity-80 col-span-1 '
                />
                <ReinsuranceCard
                    icon={<CiDeliveryTruck size={40} className='flex-shrink-0' />}
                    title='Livraison GRATUITE à partir de 125 £'
                    text='3,50 £ Livraison standard au Royaume-Uni'
                    style='opacity-80 col-span-1 '
                />
            </ul>
        </div>
    )
}
