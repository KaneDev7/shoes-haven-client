import { Collections, supports } from '@/constants/links'
import { FaFacebook, FaTiktok } from "react-icons/fa";

import React from 'react'
import Input from '../../shared/Input'
import Button from '../../shared/buttons'
import { RiInstagramFill } from 'react-icons/ri';
import { SiTwitter } from 'react-icons/si';
import LinkList from '../footer/LinkList';


export default function Footer() {
    return (
        <div className='w-full bg-secondaryColor/40 mt-10 pt-20 '>
            <div className='globalMaxWidth flex gap-20 px-4 pb-20 flex-wrap'>
                <div className='space-y-4'>
                    <h2 className='font-bold'>NOTRE AMOUR POUR LES CHAUSSURES</h2>
                    <div className='space-y-4 text-footerTextColor text-sm max-w-[500px] '>
                        <p>
                            Nous avons créé une excellente gamme de collections de
                            chaussures provenant des meilleures marques de chaussures, avec plus de tailles et de coupes que celles que vous trouverez dans le commerce. Vous pouvez choisir des styles à porter
                            n'importe où, n'importe quel jour de la semaine.
                        </p>
                        <p>
                            Nous pensons que vos pieds et votre garde-robe méritent le meilleur de tout, des chaussures magnifiquement confectionnées
                            avec des matériaux de qualité qui sont à la fois respectueux de votre sac à main et de vos pieds !
                        </p>
                        <p>
                            N'est-il pas temps de mettre à jour votre collection
                            de chaussures ?
                            Il est temps de choisir vos favoris sur shoe-shop.com.
                        </p>
                    </div>
                </div>

                <div className='space-y-4'>
                    <LinkList
                        linksList={Collections}
                        title='COLLECTIONS'
                        titleStyle='font-bold'
                        linkStyle='text-footerTextColor'
                    />
                </div>

                <div className='space-y-4'>
                    <LinkList
                        linksList={supports}
                        title='SUPPORTS'
                        titleStyle='font-bold'
                        linkStyle='text-footerTextColor'
                    />
                </div>


                <div className=' flex-1 space-y-4 max-w-[500px] '>
                    <h2 className='font-bold'>S'ABONNER</h2>
                    <p className='text-footerTextColor text-sm '>
                        Recevez les dernières nouvelles de nos offres et vols directement dans votre boîte de réception...
                    </p>
                    <form action="" className='w-full'>
                        <div className='w-full h-[45px] flex items-center flex-wrap gap-2 '>
                            <Input
                                value=''
                                placeholder='Votre email'
                                type='email'
                                style='flex-1 bg-white'
                            />
                            <Button text="S'abonner" style=' h-full bg-black rounded-md px-6 text-white font-bold  ' />
                        </div>
                    </form>
                </div>
            </div>
            <div className='w-full max-h-[70px]  px-4 bg-black flex justify-center items-center'>
                <div className='globalMaxWidth  py-6 flex justify-between items-center flex-wrap gap-4'>
                    <p className='text-xs text-white'>Copyright © Boîte à chaussures. Tous droits réservés</p>
                    <div className='flex items-center  opacity-60 text-white gap-4'>
                        <FaFacebook size={25} />
                        <RiInstagramFill size={25} />
                        <SiTwitter size={25} />
                        <FaTiktok size={25} />
                    </div>
                </div>
            </div>
        </div>
    )
}
