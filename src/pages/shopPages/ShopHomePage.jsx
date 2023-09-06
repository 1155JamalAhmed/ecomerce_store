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

  const isOwner = shopId === authShop?._id;

  useEffect(() => {
    axiosInstance
      .get(`/shops/get-shop-by-id/${shopId}`)
      .then((res) => {
        setShop(res.data.body);
      })
      .catch((err) => {
        setShopHasError(err.response.data.message);
      })
      .finally(() => {
        setShopIsLoading(false);
      });
  }, [shopId]);

  return (
    <div className={`${styles.section} bg-[#f5f5f5] `}>
      {shopIsLoading && <Loader />}
      {shop && !shopIsLoading && (
        <div className="w-full flex py-10 justify-between">
          <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-auto h-[90vh] sticky top-2 left-0 z-10">
            <ShopInfo isOwner={isOwner} shop={shop.shop} />
          </div>
          <div className="w-[72%] rounded-[4px] ">
            <ShopProfileData
              isOwner={isOwner}
              products={shop.products}
              events={shop.events}
            />
          </div>
        </div>
      )}
      {shopHasError && !shopIsLoading && <h1>{shopHasError}</h1>}
    </div>
  );
};

export default ShopHomePage;
