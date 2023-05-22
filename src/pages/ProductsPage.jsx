import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import ProductCard from "../components/cards/ProductCard";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryFromParams = searchParams?.get("category");
  const [productsDataState, setProductsDataState] = useState();

  useEffect(() => {
    if (!categoryFromParams) {
      const data =
        productData && productData.sort((a, b) => a.total_sell - b.total_sell);

      setProductsDataState(data);
    } else {
      const data =
        productData &&
        productData.filter(
          (product) => product.category === categoryFromParams
        );

      setProductsDataState(data);
    }
  }, [categoryFromParams]);

  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />

      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {productsDataState &&
            productsDataState.map((product, index) => (
              <ProductCard key={index} data={product} />
            ))}
        </div>
        {productsDataState && !productsDataState.length && (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No product found!
          </h1>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
