import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Product from "./Product";

export default function MobileCarousel({ products }) {
  const responsive = {
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
    >
      {products.map((product) => (
        <Product key={product.id} data={product} />
      ))}
    </Carousel>
  );
}
