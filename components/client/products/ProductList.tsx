import { Product } from "@/types/product.type"
import ProductCard from "./ProductCard"

type ProductList = {
    products: Array<Product>,
    gridParamsStyle?: string
  }
  
export  const ProductList = ({ products, gridParamsStyle }: ProductList) => {
    if (!products) return <p>Quelques chose s'est mal passé</p>
    return (
      <ul className={`productsGrid grid ${gridParamsStyle} mt-10 gap-4 `} >
        {
          products?.map(product => (
            product.onStock && <ProductCard product={product} />
          ))
        }
      </ul>
    )
  }