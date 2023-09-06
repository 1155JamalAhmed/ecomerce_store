import React, { useEffect, useState } from "react";
import ProductCard from "../cards/ProductCard";
import styles from "../../styles/styles";
import axiosInstance from "../../utils/axiosInstance";

const BestDeals = () => {
  const [data, setData] = useState(null);
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [dataHasError, setDataHasError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/products/best-deals")
      .then((res) => setData(res.data.body))
      .catch((err) => setDataHasError(err.response.data.message))
      .finally(() => setDataIsLoading(false));
  }, []);

  return (
    <div className={`${styles.section}`}>
      <h1 className={`${styles.heading}`}>Best Deals</h1>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
        {!dataIsLoading &&
          data &&
          data.map((product) => (
            <ProductCard data={product} key={product._id} />
          ))}
        {dataIsLoading &&
          [1, 2, 3, 4].map((item) => <ProductCard key={item} />)}
      </div>
      {!dataIsLoading && dataHasError && (
        <h1 className={`${styles.error}`}>{dataHasError}</h1>
      )}
    </div>
  );
};

export default BestDeals;
