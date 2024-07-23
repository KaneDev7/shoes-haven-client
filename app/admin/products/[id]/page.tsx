"use client"
import { deleteProduct, getOneProduct, toggleStock } from '@/api/products'
import Button from '@/components/admin/shared/Button.admin'
import Header from '@/components/admin/shared/Header'
import { token } from '@/components/admin/form/product/InsertProduct'
import ToggleInput from '@/components/admin/productDetail/Toggle'
import { setSelectCategories } from '@/redux/domains/form/category/categories.slice'
import { setSelectColors } from '@/redux/domains/form/product/colors.slice'
import { setIsProducUpdate } from '@/redux/domains/form/product/isProducUpdate'
import { setProductDefaultValue } from '@/redux/domains/form/product/productDefaultValue'
import { setSelectSize } from '@/redux/domains/form/product/size.slice'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ProductNav from '@/components/admin/shared/ProductNav'

export default function ProductDetail() {
    const productId = useParams().id as string

    const { data: product, isLoading, error } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => getOneProduct(productId)
    })

    const [isProductOnStock, setIsProductOnStock] = useState<boolean>()

    const dispatch = useDispatch()
    const route = useRouter()

    const hadleEditProduct = () => {
        dispatch(setProductDefaultValue(product))
        dispatch(setSelectCategories(product.category.split(',')))
        dispatch(setSelectColors(product.color.split(',')))
        dispatch(setSelectSize(product.size.split(',')))
        dispatch(setIsProducUpdate(true))
        route.push('/admin/products/edit')
    }

    const hadleDeletProduct = async () => {
        const confirm = window.confirm('Voulez-vous supprimer ce produit ?')
        if (!confirm) return
        await deleteProduct(token, product._id)
        route.push('/admin/products')
    }

    const onToggleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsProductOnStock(!isProductOnStock)
        await toggleStock(token, product._id, !isProductOnStock)
        route.push(`/admin/products/${product._id}`)
    }

    useEffect(() => {
        setIsProductOnStock(product?.onStock)

    }, [product])

    if (!isLoading)
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
                <ProductNav />

                <div className='flex gap-4 flex-wrap mt-5 bg-white p-4'>
                    {
                        product?.uri?.map(src => (
                            <Image
                                src={`/uploads/${src}`}
                                width={200}
                                height={200}
                                alt=''
                                className=''
                            />
                        ))
                    }
                </div>

                <div className='bg-white p-10'>
                    <div className='text-blackColor2'>
                        <div className=' flex flex-col gap-4 mt-5 '>
                            <h1 className='text-3xl font-bold'> {product.title} </h1>
                            <div className='max-w-[70%] text-sm'>
                                <h2 className='mb-4 font-semibold'> Description: </h2>
                                <p className='opacity-90'>{product.description}</p>
                            </div>

                            <div className='flex text-sm items-center gap-4'>
                                <h2 className='font-semibold'> Identifiant: </h2>
                                <p className='opacity-90'>{product.productId}</p>
                            </div>

                            <div className='flex text-sm items-center gap-4'>
                                <h2 className='font-semibold'> Catégories : </h2>
                                <p className='opacity-90'>{product.category}</p>
                            </div>

                            <div className='flex text-sm items-center gap-4'>
                                <h2 className='font-semibold'> Marque : </h2>
                                <p className='opacity-90'>{product.mark}</p>
                            </div>

                            <div className='flex text-sm items-center gap-4'>
                                <h2 className='font-semibold'> Prix : </h2>
                                <p className='opacity-90'>{product.price} FCFA</p>
                            </div>

                            <div className='flex text-sm items-center gap-4'>
                                <h2 className='font-semibold'> Couleurs : </h2>
                                <p className='opacity-90'>{product.color}</p>
                            </div>

                            <div className='flex text-sm items-center gap-4'>
                                <h2 className='font-semibold'> Taille : </h2>
                                <p className='opacity-90'>{product.size}</p>
                            </div>

                            <div className='flex text-sm items-center gap-4'>
                                <h2 className='font-semibold'> En Stock : </h2>
                                <p className='opacity-90'>{product.onStock ? 'Oui' : 'Non'}</p>
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
                                        handleClick={hadleDeletProduct}
                                        text='Supprimier'
                                        style='bg-red-400 text-white'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
}
