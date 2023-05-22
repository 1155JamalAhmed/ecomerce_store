import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import styles from "../styles/styles";
import { productData } from "../static/data";
import ProductCard from "../components/cards/ProductCard";

const BestSellingPage = () => {
  const [bestSellingProducts, setBestSellingProducts] = useState([]);

  useEffect(() => {
    const data = productData.length
      ? productData.sort((a, b) => a.total_sell - b.total_sell)
      : [];
    setBestSellingProducts(data);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />

      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {bestSellingProducts.length > 0 &&
            bestSellingProducts.map((product, index) => (
              <ProductCard key={index} data={product} />
            ))}
        </div>
        {!bestSellingProducts.length && (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No product found!
          </h1>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BestSellingPage;
