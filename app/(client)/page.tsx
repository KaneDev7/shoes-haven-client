"use client"
import BannerHome from "@/components/client/containers/BannerHome";
import Categories from "@/components/client/containers/Categories";
import Button from "@/components/client/shared/buttons";
import RenderProductList from "@/components/client/containers/RenderProductList";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/products";
import { initQueryParams, setQueryParams } from "@/redux/domains/products/queryParams.slice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setSelectColors } from "@/redux/domains/form/product/colors.slice";
import { setSelectSize } from "@/redux/domains/form/product/size.slice";


export default function Home() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => getProducts()
  })

  const router = useRouter()
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(initQueryParams())
    dispatch(setSelectColors([]))
    dispatch(setSelectSize([]))
    dispatch(setQueryParams(['category', 'all']))
    router.push(`/products`)
  }

  useEffect(()=> {
    dispatch(initQueryParams())
    dispatch(setSelectColors([]))
    dispatch(setSelectSize([]))
    dispatch(setQueryParams(['category', 'all']))
  },[])

  return (
    <>
      <BannerHome />
      <Categories />
      <RenderProductList
        products={products}
        loading={isLoading}
        title="NOS CHAUSSURES"
        style="mt-20"
        headerRightEl={
          <Button handleClick={handleClick} text='Voir plus' style='bg-black text-white py-2 px-10 rounded-full' />
        }
        gridParamsStyle="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      />
    </>

  );
}
