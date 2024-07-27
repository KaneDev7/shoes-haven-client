import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import Spiner from '@/components/shared/Spiner'
import { useDispatch } from 'react-redux'
import { Mark } from '@/types/mark'
import { DefaultValueMarkContext, token } from './InsertMark'
import { deleteMark } from '@/api/marks'
import { IoCloseCircle } from 'react-icons/io5'

type MarkCardType = {
    mark: Mark,
}

export default function MarkCard({ mark }: MarkCardType) {
    const { name } = mark
    const { refetch } = useContext(DefaultValueMarkContext)
    const [isDeleting, setIsDeleting] = useState(false)

    const { mutate } = useMutation({
        mutationFn: async () => {
            return await deleteMark(token, mark._id)
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


    const hendleDeleteCategory = () => {
        const confirm = window.confirm('Voulez vous vraiment continuer')
        if (!confirm) return
        setIsDeleting(true)
        mutate()
    }

    return (
        <li className='w-[120px] h-[120px] flex flex-col items-center gap-2 shadow-md rounded-md text-blackColor2  px-6 py-4 bg-gray-50 relative'>
            {isDeleting && <Spiner />}
            <Image
                src={`/uploads/marks/${mark.uri}`}
                width={100} height={100}
                className='rounded-md w-[50px] h-[50px] object-contain '
                alt='' />
            <p className='text-xs uppercase text-center'>{mark.name}</p>
            <IoCloseCircle
                onClick={hendleDeleteCategory}
                className='absolute right-1 top-1 text-gray-500 opacity-60 hover:opacity-100'
                size={25}
            />
        </li>
    )
}
