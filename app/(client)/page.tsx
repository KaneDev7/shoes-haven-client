import BannerHome from "@/components/client/containers/BannerHome";
import Categories from "@/components/client/containers/Categories";
import ProductList from "@/components/client/containers/ProductList";
import Trending from "@/components/client/containers/Trending";
import { ProductsMock } from "@/constants/productsMock";
import Button from "@/components/client/buttons";



export default function Home() {
  return (
    <>
      <BannerHome />
      <Trending />
      <ProductList
        products={ProductsMock}
        title="NOS CHAUSSURES"
        style="mt-20"
        headerRightEl={<Button text='Voir plus' style='bg-black text-white py-2 px-10 rounded-full' />}
        gridParamsStyle="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      />
      <Categories />

    </>

  );
}
