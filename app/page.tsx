import BannerHome from "@/components/containers/BannerHome";
import Categories from "@/components/containers/Categories";
import ProductList from "@/components/containers/ProductList";
import Trending from "@/components/containers/Trending";
import Trust from "@/components/common/Trust";
import { ProductsMock } from "@/constants/productsMock";


export default function Home() {
  return (
    <>
      <BannerHome />
      <Trending />
      <ProductList  products={ProductsMock}/>
      <Categories/>
      <Trust/>
    </>
  );
}
