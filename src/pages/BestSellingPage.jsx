import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import styles from "../styles/styles";
import ProductCard from "../components/cards/ProductCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../components/layout/Loader";
import axiosInstance from "../utils/axiosInstance";
import { Pagination } from "@mui/material";

const BestSellingPage = () => {
  const [searchParams] = useSearchParams();
  const pageFromParams = +searchParams?.get("page");

  const [products, setProducts] = useState(null);
  const [productsHasError, setProductsHasError] = useState(null);
  const [productsIsLoading, setPorductsIsLoading] = useState(true);
  const [totalProductCount, setTotalProductCount] = useState(1);

  const navigate = useNavigate();

  const paginationChangeHandler = (_, page) => {
    searchParams.set("page", page);
    navigate(`?${searchParams.toString()}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`/products/get-all-products?page=${pageFromParams || "1"}&limit=10`)
      .then((res) => {
        setProducts(res.data.body.products);
        setTotalProductCount(res.data.body.totalProductsCount);
      })
      .catch((err) => setProductsHasError(err.response.data.message))
      .finally(() => setPorductsIsLoading(false));
  }, [pageFromParams]);

  return (
    <div>
      <Header />
      <br />
      <br />

      <div className={`${styles.section}`}>
        {productsIsLoading && <Loader />}
        {!productsIsLoading && products && (
          <>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {products.map((product) => (
                <ProductCard key={product._id} data={product} />
              ))}
            </div>
            <br />
            <div className="flex justify-end">
              <Pagination
                count={Math.ceil(totalProductCount / 10)}
                page={pageFromParams}
                onChange={paginationChangeHandler}
                color="primary"
                shape="rounded"
                size="large"
              />
            </div>
            <br />
            <br />
          </>
        )}
        {!productsIsLoading && productsHasError && (
          <h1 className={`${styles.error}`}>{productsHasError}</h1>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BestSellingPage;
