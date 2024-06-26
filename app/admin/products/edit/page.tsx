import Header from '@/components/admin/Header'
import InsertProduct from '@/components/admin/InsertProduct'
import React from 'react'

export default function EditProduct() {
    return (
        <div className='w-full'>
            <Header title='Modifer le produit' />
            <InsertProduct />
        </div>
    )
}
