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
            <div>
                <h2 className='text-2xl font-bold text-blackColor2 pb-10'>Liste  des catégories</h2>
                <ul className='space-y-10 relative h-[70vh] overflow-y-auto scrollStyle px-5 '>
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
            </div>

        )
}
