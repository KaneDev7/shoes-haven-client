import React from 'react'
import CatCard from '../categories/CatCard'
import { getCategories } from '@/api/categories'
import { useQuery } from '@tanstack/react-query'
import { Category } from '@/types/category.type'

export default function Categories() {
  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => getCategories()
  })

  const categories: Category[] = data


  if (!isLoading)
    return (
      <div className='w-full p-5 mt-10'>
        <div className='globalMaxWidth  mx-auto grid md:grid-cols-4 lg:grid-cols-3 grid-rows-2 gap-4 '>
          {
            categories.map(category => (
              <CatCard
                style='lg:col-span-1 md:col-span-2'
                category={category}
              />
            ))
          }
        </div>
      </div>
    )
}
