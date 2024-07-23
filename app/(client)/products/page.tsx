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
import useCategoryUri from '@/hooks/useCategoryUri'
import { setQueryParams } from '@/redux/domains/products/queryParams.slice'

export default function Products() {
    const queryParams = useSelector(state => state.queryParams)
    const selectMarks = useSelector(state => state.selectMarks)
    const selectColors = useSelector(state => state.selectColors)
    const selectSizes = useSelector(state => state.selectSizes)
    const { categoryUri } = useCategoryUri(queryParams.category)
    const dispatch = useDispatch()

    const { data: products, isLoading, error, isFetching, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => getProducts(queryParams)
    })

    const handleSortBy = (event : React.ChangeEvent<HTMLSelectElement>) =>{
       const value =  event.target.value
       dispatch(setQueryParams(['sort_price', value]))
    }

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
            if (queryParams.mark) {
                querySelected.push({
                    type: 'mark',
                    value: selectMarks
                })
            }

            dispatch(setSelectedFilter(querySelected))
            refetch()
        }
        selectedFilterFn()
    }, [queryParams, selectColors, selectSizes, selectMarks])

    function isObjEmpty (obj) {
        return Object.keys(obj).length === 0;
    }

    useEffect(() => {
        if ( isObjEmpty(queryParams)) {
            dispatch(setQueryParams(['category', 'all']))
        }
    }, [])

    return (
        <div className='p-4'>
            {
                categoryUri &&
                <header className='globalMaxWidth mb-10 overflow-hidden rounded-md mt-4'>
                    <Image
                        width={1000}
                        height={1000}
                        src={`/uploads/categories/${categoryUri}`}
                        alt=''
                        className='w-full max-h-[300px] object-cover'
                    />
                </header>
            }

            <section className='mt-20 '>
                <div className='globalMaxWidth block lg:flex items-start justify-start gap-5 relative'>
                    <SideBar />
                    <div className='flex-1 relative '>
                        {isFetching && <Spiner />}
                        <RenderProductList
                            products={products}
                            loading={isLoading}
                            title={(queryParams.category && queryParams.category !== 'all') ? queryParams.category : 'TOUS LES PRODUITS'}
                            gridParamsStyle='productsPage sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '
                            headerRightEl={
                                <select onChange={handleSortBy} className='p-2'>
                                    <option selected hidden value="">Tirer par</option>
                                    <option value="asc">Prix inferieur</option>
                                    <option value="desc">Pris superieur</option>
                                </select>
                            }
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}
