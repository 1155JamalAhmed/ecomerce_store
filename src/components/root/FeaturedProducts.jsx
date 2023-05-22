import React from "react";
import styles from "../../styles/styles";
import { productData } from "../../static/data";
import ProductCard from "../cards/ProductCard";

const FeaturedProducts = () => {
  return (
    <div>
      <div className={`${styles.section}`}>
        <h1 className={`${styles.heading}`}>Featured Products</h1>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {productData &&
            productData.map((product) => (
              <ProductCard data={product} key={product.id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;