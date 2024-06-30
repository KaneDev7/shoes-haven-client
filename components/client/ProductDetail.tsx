"use client"
import { Product } from '@/types/product.type'
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { MdShoppingCart } from "react-icons/md";

// Import Swiper styles
import 'swiper/css';
import useFetch from '@/hooks/useFetch';
import Link from 'next/link';
import { sizes } from '@/constants/productsMock';
import Button from '../admin/Button.admin';
import ReinsuranceCard from './ReinsuranceCard';
import { CiDeliveryTruck } from 'react-icons/ci';

type ProductDetailType = {
    product: Product
}

type SameTypeProductType = {
    currentProductId: string,
    sameName: string
}

const SameTypeProduct = ({ currentProductId, sameName }: SameTypeProductType) => {
    const { data, loading, error } = useFetch('/products')
    const products = data as Product[]
    return <div className='flex gap-2 flex-wrap'>
        {
            products?.map((product) => (
                product._id !== currentProductId &&
                <Link href={`/products/${product._id}`}>
                    <div className={`border border-black/50 rounded-md`} >
                        <Image
                            className={`w-[50px] h-[50px]  object-contain rounded-md `}
                            src={`/uploads/${product.uri[0]}`}
                            height={200}
                            width={200} alt="" />
                    </div>
                </Link>
            ))
        }
    </div>
}

export default function ProductDetail({ product }: ProductDetailType) {
    const [activeIndex, setActiveIndex] = useState(0)
    const swiperRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(activeIndex); // Navigue vers le slide spécifique
        }
    }, [activeIndex])

    return (
        <div className='globalMaxWidth flex flex-col gap-10 lg:flex-row mt-10 bg-white  '>

            <div className='lg:w-[50%] w-full flex gap-4 flex-col-reverse lg:flex-row items-center  '>

                {/* Small images */}
                <div className='flex flex-row lg:flex-col w-full lg:w-[15%] gap-6'>
                    {
                        product?.uri.map((src, index) => (
                            <div className=' '>
                                <Image
                                    onClick={() => setActiveIndex(index)}
                                    className={`w-full object-cover border-2  ${activeIndex === index ? 'border-secondaryColor' : 'border-transparent'} rounded-md`}
                                    src={`/uploads/${src}`}
                                    height={200}
                                    width={200} alt="" />
                            </div>
                        ))
                    }
                </div>

                {/* Silddes */}
                <div className='lg:w-[80%] h-full w-full flex items-center select-none'>
                    <Swiper
                        ref={swiperRef}
                        className='flex items-center'
                        spaceBetween={50}
                        slidesPerView={1}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    >
                        {
                            product?.uri.map(src => (
                                <SwiperSlide
                                    className='w-full'>

                                    <Image
                                        className='w-full h-full object-cover'
                                        src={`/uploads/${src}`}
                                        height={1000}
                                        width={1000} alt="" />
                                </SwiperSlide>

                            ))
                        }
                    </Swiper>
                </div>
            </div>

            <div className='flex-1'>
                <div className='flex flex-col gap-8 text-blackColor2'>
                    <h1 className='text-4xl font-extrabold'> {product.title} </h1>
                    <p className='lg:max-w-[80%] w-full '> {product.description} </p>
                    <h2 className='text-3xl font-semibold'> {product.price?.toLocaleString()} FCFA</h2>
                    <SameTypeProduct
                        currentProductId={product._id}
                        sameName={product.title}
                    />
                    <div className='flex flex-col gap-4'>
                        <h2 className='text-[18px] font-semibold'>Selectionnez une Taille</h2>
                        <div className='flex gap-2 flex-wrap'>
                            {
                                sizes.map((size, index) => (
                                    <div className={`w-[60px] h-[40px] cursor-pointer font-semibold  rounded-lg flex items-center justify-center ${index === 3 ? 'bg-secondaryColor' : 'bg-gray-100'}   text-blackColor2`} >
                                        {size}
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <Button
                        text='Ajouter au panier'
                        style='h-[60px] lg:w-[70%] flex justify-center items-center  bg-black text-white round rounded-full text-[20px] '
                        icon={<MdShoppingCart
                            size={30}

                        />}
                    />

                    <ReinsuranceCard
                        title='Livraison GRATUITE à partir de 125 £'
                        icon={<CiDeliveryTruck size={40} />}
                    />
                </div>
            </div>
        </div>
    )
}

