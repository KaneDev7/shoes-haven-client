"use client"
import SideBar from '@/components/client/SideBar'
import Productlist from '@/components/client/containers/ProductList'
import { ProductsMock } from '@/constants/productsMock'
import { store } from '@/redux/store/store'
import Image from 'next/image'
import React from 'react'
import { Provider } from 'react-redux'

export default function Products() {
    return (
    <Provider store={store}>
        <div className='p-4'>
            <header className='globalMaxWidth mb-10'>
                <Image
                    width={1000}
                    height={1000}
                    src='/categories/5.jpg'
                    alt=''
                    className='w-full max-h-[400px] object-cover'
                />
            </header>
            <section className='mt-20 '>
                <div className='globalMaxWidth lg:flex sm:block gap-5 relative'>
                    <SideBar />
                    <div className=''>
                        {<Productlist
                            products={ProductsMock}
                            title="CHAUSSURE DE SPORT"
                            gridParamsStyle='productsPage sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '
                            headerRightEl={
                                <select>
                                    <option selected hidden value="Tirer par"></option>
                                    <option value="">Prix inferieur</option>
                                    <option value="">Pris superieur</option>
                                </select>
                            }
                        />}
                    </div>
                </div>
            </section>
        </div>
    </Provider>

    )
}
