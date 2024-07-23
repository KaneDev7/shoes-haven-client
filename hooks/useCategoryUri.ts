"use client"
import { getCategories } from '@/api/categories'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

export default function useCategoryUri(categoryName) {
    const [categoryUri, setCategoryUri] = useState('')

    const { data } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => getCategories()
      })

      useEffect(() => {
        if(data?.length > 0){
            const categoriesFiltred = data.filter(category => category.name === categoryName)
            setCategoryUri(categoriesFiltred[0]?.uri)
        }
      },[data, categoryName])

  return {categoryUri}
}
