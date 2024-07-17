import React from 'react'
import CategoryCard from './CategoryCard'
import { Category } from '@/types/category.type'
import Spiner from '@/components/client/shared/Spiner'


type CategoriesType = {
    categories: Category[]
    isLoading: boolean
    isFetching: boolean
    refetch: () => void
}
export default function Categories({ categories, isLoading, isFetching, refetch }: CategoriesType) {
    if (!isLoading)
        return (
            <ul className='space-y-10 relative '>
                {isFetching || isLoading && <Spiner />}
                {
                    categories.map(category => (
                        <CategoryCard
                            key={category._id}
                            category={category}
                            refetch={refetch}
                        />
                    ))
                }
            </ul>
        )
}
