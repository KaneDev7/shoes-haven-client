import { Category } from '@/types/category.type'
import Button from '@/components/client/shared/buttons'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useState } from 'react'
import { deleteCategory } from '@/api/categories'
import { token } from '../form/InsertProduct'
import Spiner from '@/components/client/shared/Spiner'

type CategoryCardType = {
    category: Category,
    refetch: () => void
}

export default function CategoryCard({ category, refetch }: CategoryCardType) {

    const [isDeleting, setIsDeleting] = useState(false)

    const { mutate } = useMutation({
        mutationFn: async () => {
            return await deleteCategory(token, category._id)
        },
        onSettled: (data, error, context) => {
            if (data?.status === 200) {
                refetch()
                setIsDeleting(false)
            } else {
                console.log('fileld')
            }
        },
    })

    const handleEdit = () => {

    }

    const hendleDeleteCategory = () => {
        const confirm = window.confirm('Voulez vous vraiment supprimer continuer')
        if (!confirm) return
        setIsDeleting(true)
        mutate()
    }

    return (
        <li className='text-blackColor2 relative'>
            {isDeleting && <Spiner/>}
            <div className='flex gap-5'>
                <Image
                    src={`/uploads/categories/${category.uri}`}
                    width={150} height={150}
                    className='rounded-md w-[120px] h-[120px] object-cover '
                    alt='' />
                <div>
                    <h1 className='text-[20px] font-bold'>{category.name}</h1>
                    <p className='text-sm mt-2'>{category.description} </p>
                </div>
            </div>

            <div className='flex items-center justify-end mt-4'>
                <div className='flex gap-4 '>
                    <Button
                        handleClick={handleEdit}
                        text='Modifier'
                        style='border-2 border-secondaryColor text-xs px-6 py-2 font-bold rounded-md text-blackColor2'
                    />
                    <Button
                        handleClick={hendleDeleteCategory}
                        text='Supprimer'
                        style='bg-red-400 text-white px-6 py-2  text-xs font-bold rounded-md '
                    />
                </div>
            </div>
        </li>
    )
}
