"use client"
import { getProducts } from '@/api/products'
import { CATEGORY_KEY } from '@/constants/data'
import { setSelectedFilter } from '@/redux/domains/products/SelectedFilter.slice'
import { setQueryParams } from '@/redux/domains/products/queryParams.slice'
import { isObjEmpty, selectedFilterFn } from '@/utils/commun'
import { useQuery } from '@tanstack/react-query'
import React, { ReactNode, createContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const ProductsContext = createContext(null)

export default function ProductContextProvider({ children }: {children : ReactNode} ) {
    const queryParams = useSelector(state => state.queryParams)
    const dispatch = useDispatch()

    const { data: products, isLoading, error, isFetching, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => getProducts(queryParams)
    })

    useEffect(() => {
        const querySelected = selectedFilterFn(queryParams)
        dispatch(setSelectedFilter(querySelected))
        refetch()
    }, [queryParams])


    useEffect(() => {
        if (isObjEmpty(queryParams)) {
            dispatch(setQueryParams([CATEGORY_KEY, 'all']))
        }
    }, [])

    return (
        <ProductsContext.Provider value={{
            products,
            isLoading,
            error,
            isFetching,
            refetch
        }}>
            {children}
        </ProductsContext.Provider>

    )
}
