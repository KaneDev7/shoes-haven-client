"use client"
import BannerHome from "@/components/client/containers/BannerHome";
import Categories from "@/components/client/containers/Categories";
import Trending from "@/components/client/containers/Trending";
import { ProductsMock } from "@/constants/productsMock";
import Button from "@/components/client/shared/buttons";
import RenderProductList from "@/components/client/containers/RenderProductList";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/products";


export default function Home() {
  const {data : products , isLoading, error} = useQuery({
    queryKey : ['products'],
    queryFn :  async () => getProducts()
} )
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
          <Link href='/products'>
            <Button text='Voir plus' style='bg-black text-white py-2 px-10 rounded-full' />
          </Link>
        }
        gridParamsStyle="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      />
      {/* <Trending /> */}

    </>

  );
}
