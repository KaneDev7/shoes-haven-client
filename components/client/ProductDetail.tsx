"use client"
import { Product } from '@/types/product.type'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import { MdShoppingCart } from "react-icons/md";
import Link from 'next/link';
import { sizes } from '@/constants/productsMock';
import Button from '../admin/Button.admin';
import ReinsuranceCard from './ReinsuranceCard';
import { CiDeliveryTruck } from 'react-icons/ci';
import { getProducts, getSameProducts } from '@/api/products';
import { token } from '../admin/InsertProduct';
import { useQuery } from '@tanstack/react-query';

//Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import useWindowResize from '@/hooks/useWindowResize';
import { useSelector } from 'react-redux';
import { CartItem, User } from '@/types/user.type';
import { CartContext } from '@/context/cartContext';
import { addToCart } from '@/api/cart';

type ProductDetailType = {
    product: Product
}

type SameTypeProductType = {
    currentProductId: string,
    productId: string
}

const SameTypeProduct = ({ currentProductId, productId }: SameTypeProductType) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => getSameProducts(token, productId)
    })

    const products = data as Product[]
    return <div className='flex flex-col gap-4'>
        <h2 className='text-[18px] font-semibold'>Les couleurs dusponibles</h2>
        <div className='flex gap-2 flex-wrap'>

            {
                products?.map((product) => (

                    <Link href={`/products/${product._id}`}>
                        <div className={`border border-black/50 rounded-md ${product._id === currentProductId && 'border-secondaryColor'} `} >
                            <Image
                                className={`w-[50px] h-[50px]  object-contain rounded-md `}
                                src={`/uploads/${product.uri[0]}`}
                                placeholder='blur'
                                blurDataURL='/placeholder.jpg'
                                height={200}
                                width={200} alt="" />
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>

}

export default function ProductDetail({ product }: ProductDetailType) {
    const currentUser : User = useSelector(state => state.currentUser)
    const {addItemToCart} = useContext(CartContext)
    const [activeIndex, setActiveIndex] = useState(0)
    const {innerWidth} = useWindowResize()
    const swiperRef = useRef(null);
    

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(activeIndex); // Navigue vers le slide spécifique
        }
    }, [activeIndex])

    const handleAddToPanier = async () => {
        console.log('panier', currentUser)
        const newCart : CartItem= {
            user_id: currentUser._id as string,
            item: {
              productId: product._id,
              quantity: 1,
            }
        }

        addItemToCart({
            productId: product._id,
            quantity: 1,
        }) 
        await addToCart(newCart, currentUser.token)     
    }


    return (
        <div className='globalMaxWidth flex flex-col gap-10 lg:flex-row mt-10 bg-white'>

            <div className='lg:w-[50%] w-full flex gap-4 flex-col-reverse lg:flex-row   '>

                {/* Small images */}
                <div className='flex flex-row lg:flex-col w-full h-full lg:h-[570px] lg:w-[70px] gap-6'>
                    <Swiper
                        ref={swiperRef}
                        className='w-full h-full '
                        spaceBetween={20}
                        slidesPerView={4}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                        direction={innerWidth <= 1024 ? 'horizontal' : 'vertical'}
                        breakpoints={{
                            768: {
                                slidesPerView: 7,
                            },
                        }}
                    >
                        {
                            product?.uri.map((src, index) => (
                                <SwiperSlide
                                    className='w-full'>
                                    <Image
                                        onClick={() => setActiveIndex(index)}
                                        className={`w-full object-cover border-2  ${activeIndex === index ? 'border-secondaryColor' : 'border-transparent'} rounded-md`}
                                        src={`/uploads/${src}`}
                                        placeholder='blur'
                                        blurDataURL='/placeholder.jpg'
                                        height={200}
                                        width={200} alt="" />
                                </SwiperSlide>

                            ))
                        }
                    </Swiper>
                </div>


                {/* Silddes */}
                <div className='lg:w-[90%] h-full w-full flex items-center lg:items-start select-none'>
                    <Swiper
                        ref={swiperRef}
                        className='flex items-center'
                        spaceBetween={50}
                        slidesPerView={1}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                        navigation={true}
                        modules={[Navigation]}
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
                        productId={product.productId}
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
                        handleClick={handleAddToPanier}
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

