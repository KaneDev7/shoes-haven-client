"use client"
import { getProducts } from '@/api/products'
import SideBar from '@/components/client/sidebar/SideBar'
import RenderProductList from '@/components/client/containers/RenderProductList'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedFilter } from '@/redux/domains/products/SelectedFilter.slice';
import Spiner from '@/components/client/shared/Spiner'

export default function Products() {
    const queryParams = useSelector(state => state.queryParams)
    const selectColors = useSelector(state => state.selectColors)
    const selectSizes = useSelector(state => state.selectSizes)

    console.log('queryParams', queryParams)
    const dispatch = useDispatch()

    const { data: products, isLoading, error, isFetching, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => getProducts(queryParams)
    })


    useEffect(() => {
        const selectedFilterFn = () => {
            let querySelected = []
            if (queryParams.color) {
                querySelected.push({
                    type: 'color',
                    value: selectColors
                })
            }
            if (queryParams.size) {
                querySelected.push({
                    type: 'size',
                    value: selectSizes
                })
            }

            dispatch(setSelectedFilter(querySelected))
            refetch()
        }
        selectedFilterFn()
    }, [queryParams, selectColors, selectSizes])


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
                    <div className='flex-1 relative'>
                        {isFetching && <Spiner />}
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
