import BannerHome from "@/components/client/containers/BannerHome";
import Categories from "@/components/client/containers/Categories";
import Trending from "@/components/client/containers/Trending";
import { ProductsMock } from "@/constants/productsMock";
import Button from "@/components/client/buttons";
import RenderProductList from "@/components/client/containers/RenderProductList";
import Link from "next/link";


export default function Home() {

  return (
    <>
        <BannerHome />
        <Trending />
        <RenderProductList
          products={ProductsMock}
          title="NOS CHAUSSURES"
          style="mt-20"
          headerRightEl={
            <Link href='/products'>
            <Button text='Voir plus' style='bg-black text-white py-2 px-10 rounded-full' />
            </Link>
          }
          gridParamsStyle="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        />
        <Categories />
    </>

  );
}
