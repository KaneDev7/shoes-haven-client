import { Category } from '@/types/category.type'
import Button from '@/components/shared/buttons'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { deleteCategory } from '@/api/categories'
import { token } from '../form/product/InsertProduct'
import Spiner from '@/components/shared/Spiner'
import { setCategorytDefaultValue } from '@/redux/domains/form/category/categoryDefaultValue'
import { useDispatch } from 'react-redux'
import { setIsCategoryUpdate } from '@/redux/domains/form/category/isCategoryUpdate'
import { DefaultValueCategoryContext } from '../form/category/InsertCategory'
import { MdEditSquare } from 'react-icons/md'
import { AiOutlineDelete } from 'react-icons/ai'

type CategoryCardType = {
    category: Category,
}

export default function CategoryCard({ category }: CategoryCardType) {
    const { name, description } = category
    const { setValue, refetch } = useContext(DefaultValueCategoryContext)
    const [isDeleting, setIsDeleting] = useState(false)
    const dispatch = useDispatch()

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

    const handleEditCategory = () => {
        dispatch(setCategorytDefaultValue(category))
        setValue('name', name, { shouldValidate: true })
        setValue('description', description, { shouldValidate: true })
        dispatch(setIsCategoryUpdate(true))
    }

    const hendleDeleteCategory = () => {
        const confirm = window.confirm('Voulez vous vraimen continuer')
        if (!confirm) return
        setIsDeleting(true)
        mutate()
    }

    return (
        <li className='text-blackColor2 relative'>
            {isDeleting && <Spiner />}
            <div className='flex gap-5'>
                <Image
                    src={`/uploads/categories/${category.uri}`}
                    width={150} height={150}
                    className='rounded-md w-[70px] h-[70px] object-cover '
                    alt='' />
                <div>
                    <h1 className='text-[20px] font-bold'>{category.name}</h1>
                    <p className='text-sm mt-2'>{category.description} </p>
                </div>
            </div>

            <div className='flex items-center justify-end mt-2 '>
                <div className='flex gap-4 '>
                    <MdEditSquare onClick={handleEditCategory} size={25} className='text-blue-500'/>
                    <AiOutlineDelete onClick={hendleDeleteCategory} size={25} className='text-red-500'/>
                </div>
            </div>
        </li>
    )
}
