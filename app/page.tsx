import BannerHome from "@/components/containers/BannerHome";
import Categories from "@/components/containers/Categories";
import Trending from "@/components/containers/Trending";

import Image from "next/image";

export default function Home() {
  return (
    <>
      <BannerHome />
      <Trending />
      <Categories/>
    </>
  );
}
