"use client"
import React, { useEffect, useRef, useState } from 'react'

//Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { Product } from '@/types/product.type';
import useWindowResize from '@/hooks/useWindowResize';

export default function ImageSildes({ product }: { product: Product }) {
    const [activeIndex, setActiveIndex] = useState(0)
    const swiperRef = useRef(null)
    const { innerWidth } = useWindowResize()

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(activeIndex);
        }
    }, [activeIndex])

    return (
        <div className='lg:w-[50%] w-full flex gap-4 flex-col-reverse lg:flex-row  '>
            {/* Small images */}
            <div className='flex flex-row lg:flex-col w-full h-full lg:h-[570px] lg:w-[70px] gap-6 '>
                <Swiper
                    ref={swiperRef}
                    className='w-full h-full'
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
    )
}
