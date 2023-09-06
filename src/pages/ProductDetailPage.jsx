import React, { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import ProductDetails from "../components/Product/ProductDetails";
import { useParams } from "react-router-dom";
import SuggestedProduct from "../components/Product/SuggestedProduct";
import axiosInstance from "../utils/axiosInstance";
import Loader from "../components/layout/Loader";
import styles from "../styles/styles";

const ProductDetailPage = () => {
  const { name } = useParams();
  const [productIsLoading, setProductIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [productHasError, setProductHasError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/products/${name}`)
      .then((res) => setProduct(res.data.body))
      .catch((err) => setProductHasError(err.response.data.message))
      .finally(() => setProductIsLoading(false));
  }, [name]);

  return (
    <div>
      <Header />
      {productIsLoading && <Loader />}
      {!productIsLoading && product && (
        <>
          <ProductDetails data={product} />
          <SuggestedProduct data={product.relatedProducts} />
        </>
      )}
      {!productIsLoading && productHasError && (
        <h1 className={`${styles.error}`}>{productHasError}</h1>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
