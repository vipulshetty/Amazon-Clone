import { useEffect, useState } from "react";

import Product from "./Product";
import Banner from "../assets/banner.jpg";
import MobileCarousel from "./MobileCarousel";
import { getProducts } from "../utils/getProducts";

export default function ProductListing() {
  const [products, setProducts] = useState([]);

  // Fetch products data
  useEffect(() => {
    async function fetchedProducts() {
      const productsData = await getProducts();
      setProducts(productsData);
    }

    fetchedProducts();
  }, []);

  return (
    <>
      <div className="xl:grid-cols-4 md:grid-cols-3 grid-cols gap-6 sm:-mt-20 md:-mt-28 z-50 relative px-8 hidden sm:grid">
        {products?.slice(0, 4).map((product) => (
          <Product key={product.id} data={product} />
        ))}
        {products.length > 0 && (
          <img
            src={Banner}
            alt="Banner"
            className="col-span-full h-60 w-full"
          />
        )}

        <div className="md:col-span-2">
          {products?.slice(4, 5).map((product) => (
            <Product key={product.id} data={product} />
          ))}
        </div>
        {products?.slice(5, products?.length).map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
      <div className="sm:hidden -mt-20">
        <MobileCarousel products={products} />
      </div>
    </>
  );
}
