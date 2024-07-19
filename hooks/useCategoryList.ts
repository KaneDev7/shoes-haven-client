"use client"
import { getCategories } from '@/api/categories'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

export default function useCategoryList() {
    const [categories, setCategories] = useState([])

    const { data } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => getCategories()
      })

      useEffect(() => {
        if(data?.length > 0){
           setCategories(data.map(category => category.name) )
        }
      },[data])

  return {categories}
}
