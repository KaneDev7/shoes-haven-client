import React from 'react'
import CategoryCard from './CategoryCard'
import { Category } from '@/types/category.type'
import Spiner from '@/components/shared/Spiner'


type CategoriesType = {
    categories: Category[]
    isLoading: boolean
    isFetching: boolean
}
export default function Categories({ categories, isLoading, isFetching }: CategoriesType) {
    if (!isLoading)
        return (
            <ul className='space-y-10 relative '>
                {isFetching || isLoading && <Spiner />}
                {
                    categories.map(category => (
                        <CategoryCard
                            key={category._id}
                            category={category}
                        />
                    ))
                }
            </ul>
        )
}
