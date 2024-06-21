import React from 'react'
import ReinsuranceCard from './ReinsuranceCard'

export default function Reinsurance() {
    return (
        <div className='w-full mt-10 globalMaxWidth'>
            <ul className='w-full grid sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-20'>
                <ReinsuranceCard
                    icon='CiDeliveryTruck'
                    title='Livraison GRATUITE à partir de 125 £'
                    text='3,50 £ Livraison standard au Royaume-Uni'
                />
                <ReinsuranceCard
                    icon='CiDeliveryTruck'
                    title='Livraison GRATUITE à partir de 125 £'
                    text='3,50 £ Livraison standard au Royaume-Uni'
                />
                <ReinsuranceCard
                    icon='CiDeliveryTruck'
                    title='Livraison GRATUITE à partir de 125 £'
                    text='3,50 £ Livraison standard au Royaume-Uni'
                />
                <ReinsuranceCard
                    icon='CiDeliveryTruck'
                    title='Livraison GRATUITE à partir de 125 £'
                    text='3,50 £ Livraison standard au Royaume-Uni'
                />
            </ul>
        </div>
    )
}
