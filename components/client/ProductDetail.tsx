"use client"
import { Product } from '@/types/product.type'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import { MdShoppingCart } from "react-icons/md";
import Link from 'next/link';
import { sizes } from '@/constants/productsMock';
import ReinsuranceCard from './ReinsuranceCard';
import { CiDeliveryTruck } from 'react-icons/ci';
import { getSameProducts } from '@/api/products';
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
import { useRouter } from 'next/navigation';

// Toast 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './buttons';

type ProductDetailType = {
    product: Product
}

type SameTypeProductType = {
    currentProductId: string,
    productId: string
}

type SizeRenderype = {
    ProductSize: string,
    selectSize: string
    onSelectSizeChange: (size: string) => void
}

const SameTypeProduct = ({ currentProductId, productId }: SameTypeProductType) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => getSameProducts(productId)
    })

    const products = data as Product[]
    return <div className='flex flex-col gap-4 pb-6 border-b'>
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


const SizeRender = ({ ProductSize, selectSize, onSelectSizeChange }: SizeRenderype) => {
    const ProductSizeArr = ProductSize?.split(',')

    const isSizeMatch = (size: string) => {
        return ProductSizeArr.map(item => item.trim()).includes(size)
    }
    return <div className='flex gap-2 flex-wrap'>
        {
            sizes.map((size) => (
                <div
                    onClick={() => onSelectSizeChange(size)}
                    className={`w-[50px] h-[40px] relative cursor-pointer font-semibold overflow-hidden rounded-lg flex items-center justify-center ${!isSizeMatch(size.toString()) && 'pointer-events-none opacity-70'} ${selectSize === size ? 'bg-secondaryColor' : 'bg-gray-100'}   text-blackColor2`} >
                    {size}
                    {
                        !isSizeMatch(size.toString()) &&
                        <span className='h-[200%] w-[1px] bg-black opacity-30 absolute right-0 rotate-[50deg] origin-top-right top-0 '></span>

                    }
                </div>
            ))
        }
    </div>
}

export default function ProductDetail({ product }: ProductDetailType) {
    const currentUser: User = useSelector(state => state.currentUser)
    const { updataQuantity } = useContext(CartContext)
    const {updateTotalPrice} = useContext(CartContext)
    const [activeIndex, setActiveIndex] = useState(0)
    const [selectSize, setSelectSize] = useState(product?.size?.split(',')[0])
    const [quantity, setQuantity] = useState(1)
    const { innerWidth } = useWindowResize()
    const swiperRef = useRef(null)
    const router = useRouter()

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(activeIndex);
        }
    }, [activeIndex])

    const onSelectSizeChange = (newSelectSize) => {
        setSelectSize(newSelectSize)
    }

    const addQuantity = () => {
        setQuantity(v => v + 1)
    }

    const decreaseQuantity = () => {
        setQuantity(v => v > 1 ? v - 1 : 1)
    }

    const handleAddToPanier = async () => {
        if (!currentUser) return router.push('/login')
      
            const newCart: CartItem = {
            user_id: currentUser._id as string,
            item: {
                productId: product._id,
                quantity,
                size: selectSize
            }
        }
        await addToCart(newCart, currentUser.token)
        updataQuantity(quantity)
        updateTotalPrice(product?.price * quantity)
        return toast.success("Produit ajouté au panier avec succée", { hideProgressBar: true })
    }

    return (
        <div className='globalMaxWidth flex flex-col gap-10 lg:flex-row mt-10 bg-white'>
            <ToastContainer />

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

            <div className='flex-1 text-blackColor2'>
                <div className='flex flex-col gap-8 text-blackColor2'>
                    <h1 className='text-4xl font-extrabold'> {product.title} </h1>
                    <h2 className='text-2xl font-semibold'> {product.price?.toLocaleString()} FCFA</h2>

                    <div className='flex flex-col gap-4 pb-6 border-b'>
                        <h2 className='text-[18px] font-semibold'>Description</h2>
                        <p className='lg:max-w-[80%] w-full '> {product.description} </p>
                    </div>

                    <SameTypeProduct
                        currentProductId={product._id}
                        productId={product.productId}
                    />



                    {/* quantity */}
                    <div className='flex flex-col gap-4 pb-6 border-b'>
                        <h2 className='text-[18px] font-semibold'>Choisissez la quantité</h2>
                        <div className='w-[130px] h-[40px] flex justify-between items-center border font-bold cursor-pointer select-none rounded-md 0 overflow-hidden'>
                            <div onClick={() => decreaseQuantity()} className='w-full h-full flex justify-center items-center border-r bg-gray-100'>-</div>
                            <div className='w-full h-full flex justify-center items-center border-l'>{quantity}</div>
                            <div onClick={() => addQuantity()} className='w-full h-full flex justify-center items-center border-l bg-gray-100'>+</div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-4 pb-6 border-b'>
                        <h2 className='text-[18px] font-semibold'>Selectionnez une Taille</h2>
                        <SizeRender
                            ProductSize={product?.size}
                            selectSize={selectSize}
                            onSelectSizeChange={onSelectSizeChange}
                        />
                    </div>

                    <Button
                        text='Ajouter au panier'
                        handleClick={handleAddToPanier}
                        icon={<MdShoppingCart size={30} />}
                        style='h-[60px] lg:w-[70%] flex justify-center items-center gap-2 bg-secondaryColor text-blackColor2 round rounded-md font-bold text-[20px] '
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

