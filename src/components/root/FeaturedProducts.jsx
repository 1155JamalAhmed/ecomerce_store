import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import ProductCard from "../cards/ProductCard";
import axiosInstance from "../../utils/axiosInstance";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState(null);
  const [fpIsLoading, setFpIsLoading] = useState(true);
  const [fpHasError, setFpHasError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/products/featured-products")
      .then((res) => setFeaturedProducts(res.data.body))
      .catch((err) => setFpHasError(err.response.data.message))
      .finally(() => setFpIsLoading(false));
  }, []);

  return (
    <div>
      <div className={`${styles.section}`}>
        <h1 className={`${styles.heading}`}>Featured Products</h1>

        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {!fpIsLoading &&
            featuredProducts &&
            featuredProducts.map((product) => (
              <ProductCard data={product} key={product._id} />
            ))}
          {fpIsLoading &&
            [1, 2, 3, 4].map((item) => <ProductCard key={item} />)}
        </div>
        {!fpIsLoading && fpHasError && (
          <h1 className={`${styles.error}`}>{fpHasError}</h1>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
