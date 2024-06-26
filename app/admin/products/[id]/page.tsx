"use client"
import { toggleStock } from '@/api/products'
import Button from '@/components/admin/Button.admin'
import Header from '@/components/admin/Header'
import { token } from '@/components/admin/InsertProduct'
import ToggleInput from '@/components/admin/Toggle'
import useFetch from '@/hooks/useFetch'
import { validateSelectListForFirstCheckWhileUpdating } from '@/redux/domains/form/SelectValidation.slice'
import { setSelectCategories } from '@/redux/domains/form/caregories.slice'
import { setSelectColors } from '@/redux/domains/form/colors.slice'
import { setIsProducUpdate } from '@/redux/domains/form/isProducUpdate'
import { setProductDefaultValue } from '@/redux/domains/form/productDefaultValue'
import { Product } from '@/types/product.type'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export default function ProductDetail() {
    const param = useParams()
    const { data, error, loading } = useFetch(`/products/${param.id}`)
    const product = data as Product

    const [isProductOnStock, setIsProductOnStock] = useState<boolean>()

    const dispatch = useDispatch()
    const route = useRouter()

    const hadleEditProduct = () => {
        dispatch(setProductDefaultValue(product))
        dispatch(setSelectCategories(product.category.split(',')))
        dispatch(setSelectColors(product.color.split(',')))
        dispatch(validateSelectListForFirstCheckWhileUpdating())
        dispatch(setIsProducUpdate(true))
        route.push('/admin/products/edit')
    }

    const onToggleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsProductOnStock(!isProductOnStock)
        await toggleStock(token, product._id, !isProductOnStock)
        route.push(`/admin/products/${product._id}`)
    }

    useEffect(() => {
        setIsProductOnStock(product?.onStock)
        
    },[product])

    if (!loading)
        return (
            <div className='mb-4'>
                <Header title={product.title}  >
                    <Link href='/admin/products'>
                        <Button
                            text='Retour'
                            style='bg-transparent border-2 border-secondaryColor'

                        />
                    </Link>
                </Header>
                <div className='grid grid-cols-3 mt-5 bg-white p-4'>
                    {
                        product?.uri?.map(src => (
                            <Image
                                src={`/uploads/${src}`}
                                width={300}
                                height={300}
                                alt=''
                                className='col-span-1'
                            />
                        ))
                    }
                </div>

                <div className='bg-white p-10'>
                    <div className=''>
                        <div className=' flex flex-col gap-6 mt-5 '>
                            <h1 className='text-4xl font-bold'> {product.title} </h1>
                            <div className='max-w-[70%]'>
                                <h2 className='text-[20px] font-semibold mb-4'> Description: </h2>
                                <p>{product.description}</p>
                            </div>

                            <div className='flex items-center gap-4'>
                                <h2 className='text-[20px] font-semibold'> Identifiant : </h2>
                                <p>{product.productId}</p>
                            </div>

                            <div className='flex items-center gap-4'>
                                <h2 className='text-[20px] font-semibold'> Catégories : </h2>
                                <p>{product.category}</p>
                            </div>

                            <div className='flex items-center gap-4'>
                                <h2 className='text-[20px] font-semibold'> Marque : </h2>
                                <p>{product.mark}</p>
                            </div>

                            <div className='flex items-center gap-4'>
                                <h2 className='text-[20px] font-semibold'> Prix : </h2>
                                <p>{product.price} FCFA</p>
                            </div>

                            <div className='flex items-center gap-4'>
                                <h2 className='text-[20px] font-semibold'> Couleurs : </h2>
                                <p>{product.color}</p>
                            </div>

                            <div className='flex items-center gap-4'>
                                <h2 className='text-[20px] font-semibold'> Taille : </h2>
                                <p>{product.size}</p>
                            </div>

                            <div className='flex items-center gap-4'>
                                <h2 className='text-[20px] font-semibold'> En Stock : </h2>
                                <p>{product.onStock ? 'Oui' : 'Non'}</p>
                            </div>

                            <div className='w-full flex justify-end items-center mt-4'>
                                <div className='flex items-center gap-4'>
                                    <ToggleInput
                                        onToggleInput={onToggleInput}
                                        checked={isProductOnStock}
                                        label='En stock' />

                                    <Button
                                        handleClick={hadleEditProduct}
                                        text='Modifier'
                                        style='bg-transparent border-2 border-secondaryColor'
                                    />

                                    <Button
                                        text='Supprimier'
                                        style='bg-red-500 text-white bg-red-400'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
}
