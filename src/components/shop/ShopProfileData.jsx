import React, { useState } from "react";
import ProductCard from "../cards/ProductCard";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const shopProfileNav = ["Shop Products", "Running Events", "Shop Reviews"];

const ShopProfileData = ({ isOwner, products, events }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full items-center">
          {shopProfileNav.map((nav, index) => (
            <div
              className="flex items-center pr-[20px]"
              onClick={() => setActive(index + 1)}
              key={index}
            >
              <h5
                className={`${
                  active === index + 1 && "text-red-500"
                } font-[600] text-[20px]  cursor-pointer`}
              >
                {nav}
              </h5>
            </div>
          ))}
        </div>
        <div>
          {isOwner && (
            <Button
              variant="contained"
              color="tertiary"
              fullWidth
              size="large"
              sx={{ width: "180px" }}
            >
              <Link to="/shops/dashboard">Go to Dashboard</Link>
            </Button>
          )}
        </div>
      </div>
      <br />
      {active === 1 && <ShopProducts products={products} />}
      {active === 2 && <ShopRunningEvents />}
      {active === 3 && <ShopReviews />}
    </div>
  );
};

const ShopProducts = ({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
      {products.map((product, index) => (
        <ProductCard data={product} key={index} />
      ))}
    </div>
  );
};

const ShopRunningEvents = () => {
  return <></>;
};
const ShopReviews = () => {
  return <></>;
};
export default ShopProfileData;
