import React from 'react'
import ReinsuranceCard from './ReinsuranceCard'
import { CiDeliveryTruck } from 'react-icons/ci'
import { MdSecurity } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { IoIosHappy } from "react-icons/io";


export default function Reinsurance() {
    return (
        <div className='w-full flex justify-center items-center mt-20 globalMaxWidth'>
            <ul className='w-full flex items-center justify-center flex-wrap gap-10'>
                <ReinsuranceCard
                    icon={<CiDeliveryTruck size={80} opacity={.8} className='flex-shrink-0' />}
                    title='Livraison Rapide'
                    style='opacity-80 col-span-1 '
                />
                <ReinsuranceCard
                    icon={<MdSecurity size={80} opacity={.8} className='flex-shrink-0' />}
                    title='Paiment Sécurisé'
                    style='opacity-80 col-span-1'
                />
                <ReinsuranceCard
                    icon={<IoIosHappy size={80} opacity={.8} className='flex-shrink-0' />}
                    title='SATISFAIT OU REMBOURSÉ'
                    style='opacity-80 col-span-1 '
                />
                <ReinsuranceCard
                    icon={<RiCustomerService2Fill size={80} opacity={.8} className='flex-shrink-0' />}
                    title='SERVICE CLIENT'
                    style='opacity-80 col-span-1 '
                />
            </ul>
        </div>
    )
}
