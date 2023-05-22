import React, { useEffect, useState } from "react";
import ProductCard from "../cards/ProductCard";
import { productData } from "../../static/data";
import styles from "../../styles/styles";

const BestDeals = () => {
  const [bestDeals, setBestDeals] = useState();

  useEffect(() => {
    const bestDealsData =
      productData &&
      productData.sort((a, b) => {
        return b.total_sell - a.total_sell;
      });
    const firstFiveBestDeals = bestDealsData.slice(0, 5);
    setBestDeals(firstFiveBestDeals);
  }, []);

  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Best Deals</h1>
      </div>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
        {bestDeals &&
          bestDeals.map((deal) => <ProductCard key={deal.id} data={deal} />)}
      </div>
    </div>
  );
};

export default BestDeals;
