import Header from '@/components/admin/shared/Header'
import InsertProduct from '@/components/admin/form/product/InsertProduct'
import React from 'react'

export default function EditProduct() {
    return (
        <div className='w-full'>
            <Header title='Modifer le produit' />
            <InsertProduct />
        </div>
    )
}
