"use client"
import BannerHome from "@/components/client/containers/BannerHome";
import Categories from "@/components/client/containers/Categories";
import Button from "@/components/shared/buttons";
import RenderProductList from "@/components/client/products/RenderProductList";
import { initQueryParams, setQueryParams } from "@/redux/domains/products/queryParams.slice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useContext, useEffect } from "react";
import { setSelectColors } from "@/redux/domains/form/product/colors.slice";
import { setSelectSize } from "@/redux/domains/form/product/size.slice";
import { CATEGORY_KEY } from "@/constants/data";
import { ProductsContext } from "@/context/ProductContext";


export default function Home() {
  const { products, isLoading } = useContext(ProductsContext)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(initQueryParams())
    dispatch(setSelectColors([]))
    dispatch(setSelectSize([]))
    dispatch(setQueryParams([CATEGORY_KEY, 'all']))
    router.push(`/products`)
  }

  useEffect(() => {
    dispatch(initQueryParams())
    dispatch(setSelectColors([]))
    dispatch(setSelectSize([]))
    dispatch(setQueryParams([CATEGORY_KEY, 'all']))
  }, [])

  return (
    <>
      <BannerHome />
      <Categories />
      <RenderProductList
        isLoading={isLoading}
        products={products}
        title="NOS CHAUSSURES"
        headerRightEl={<Button handleClick={handleClick} text='Voir tous' style='bg-black text-white py-2 px-10 rounded-md' />}
        gridParamsStyle="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      />
    </>

  );
}
