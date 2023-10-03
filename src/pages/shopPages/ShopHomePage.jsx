import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import ShopInfo from "../../components/shop/ShopInfo.jsx";
import ShopProfileData from "../../components/shop/ShopProfileData";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import Loader from "../../components/layout/Loader";

const ShopHomePage = () => {
  const { id: shopId } = useParams();
  const { shop: authShop } = useSelector((state) => state.shop);

  const [shop, setShop] = useState(null);
  const [shopIsLoading, setShopIsLoading] = useState(true);
  const [shopHasError, setShopHasError] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [reviewsHasError, setReviewsHasError] = useState(null);
  const [reviewsIsLoading, setReviewsIsLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/reviews/get-reviews-by-shop/${shopId}`)
      .then((res) => setReviews(res?.data?.body))
      .catch((err) => setReviewsHasError(err?.response?.data?.message))
      .finally(() => {
        setReviewsIsLoading(false);
      });
  }, [shopId]);

  const isOwner = shopId === authShop?._id;

  useEffect(() => {
    axiosInstance
      .get(`/shops/get-shop-by-id/${shopId}`)
      .then((res) => {
        setShop(res?.data.body);
      })
      .catch((err) => {
        setShopHasError(err?.response?.data?.message);
      })
      .finally(() => {
        setShopIsLoading(false);
      });
  }, [shopId]);

  return (
    <div className={`${styles.section} bg-[#f5f5f5] `}>
      {shopIsLoading && <Loader />}
      {shop && (
        <div className="flex-col 580px:flex-row w-full flex py-10 justify-between">
          <div className="order-1 580px:order-[0] w-full 580px:w-[25%] 580px:min-w-[220px] bg-[#fff] rounded-[4px] shadow-sm overflow-y-auto 580px:h-[90vh] 580px:sticky 580px:top-2 580px:left-0 z-10">
            <ShopInfo
              isOwner={isOwner}
              shop={shop?.shop}
              totalProducts={shop?.products?.length}
            />
          </div>
          <div className="flex-1 rounded-[4px] 580px:ml-10">
            <ShopProfileData
              isOwner={isOwner}
              products={shop?.products}
              events={shop?.events}
              reviews={reviews}
              reviewsHasError={reviewsHasError}
              reviewsIsLoading={reviewsIsLoading}
            />
          </div>
        </div>
      )}
      {shopHasError && !shopIsLoading && <h1>{shopHasError}</h1>}
    </div>
  );
};

export default ShopHomePage;
