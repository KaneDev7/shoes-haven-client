"use client"
import { getProducts } from '@/api/products'
import SideBar from '@/components/client/SideBar'
import RenderProductList from '@/components/client/containers/RenderProductList'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Products() {
    const queryParams = useSelector(state => state.queryParams)
    const [selectedFilter, setSelectedFilter] = useState([])

    const { data: products, isLoading, error, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => getProducts(queryParams)
    })

    console.log('queryParams', queryParams)

    useEffect(() => {
        const selectedFilterFactory = () => {
            let querySelected = ''
            if (queryParams.color) {
                querySelected += `${queryParams.color}`
            }
            if (queryParams.size) {
                querySelected += `,${queryParams.size}`
            }
            setSelectedFilter(querySelected.split(','))
            refetch()
        }
        selectedFilterFactory()
    }, [queryParams])



    return (
        <div className='p-4'>
            <header className='globalMaxWidth mb-10 overflow-hidden rounded-md mt-4'>
                <Image
                    width={1000}
                    height={1000}
                    src='/categories/5.jpg'
                    alt=''
                    className='w-full max-h-[300px] object-cover'
                />
            </header>
            <section className='mt-20 '>
                <div className='globalMaxWidth lg:flex sm:block gap-5 relative'>
                    <SideBar />
                    <div className='flex-1'>
                        <div className='flex items-center gap-4  mb-5'>
                            {
                                selectedFilter.length > 0 &&
                                selectedFilter.map(item => (
                                    <div className='px-4 bg-secondaryColor text-sm text-blackColor2 font-semibold rounded-full'> {item} </div>
                                ))
                            }
                        </div>
                        <RenderProductList
                            products={products}
                            loading={isLoading}
                            title="CHAUSSURE DE SPORT"
                            gridParamsStyle='productsPage sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '
                            headerRightEl={
                                <select className='p-2'>
                                    <option selected hidden value="">Tirer par</option>
                                    <option value="">Prix inferieur</option>
                                    <option value="">Pris superieur</option>
                                </select>
                            }
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}
