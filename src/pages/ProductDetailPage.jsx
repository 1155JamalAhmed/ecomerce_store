import React, { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import ProductDetails from "../components/Product/ProductDetails";
import { useParams } from "react-router-dom";
import { productData } from "../static/data";
import SuggestedProduct from "../components/Product/SuggestedProduct";

const ProductDetailPage = () => {
  const { name } = useParams();
  const [product, setProduct] = useState(null);
  const productName = name.replace(/-/g, " ");

  useEffect(() => {
    const data = productData.find((product) => product.name === productName);
    setProduct(data);
  }, [productName]);

  return (
    <div>
      <Header />
      <ProductDetails data={product} />
      {product && <SuggestedProduct data={product} />}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
