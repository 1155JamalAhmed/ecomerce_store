import React, { useState } from "react";
import ProductCard from "../cards/ProductCard";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import EventCard from "../cards/EventCard";
import ReviewList from "../reviews/ReviewList";
import styles from "../../styles/styles";
import Loader from "../layout/Loader";

const shopProfileNav = ["Products", "Events", "Reviews"];

const ShopProfileData = ({
  isOwner,
  products,
  events,
  reviews,
  reviewsHasError,
  reviewsIsLoading,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="w-full">
      <div className="flex flex-col w-full 800px:flex-row 800px:items-center 800px:justify-between">
        <div className="flex w-full items-center order-1 800px:order-[0]">
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
        <div className="mb-4 800px:mb-0">
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
      {active === 2 && <ShopRunningEvents events={events} />}
      {active === 3 && (
        <ShopReviews
          reviews={reviews}
          reviewsHasError={reviewsHasError}
          reviewsIsLoading={reviewsIsLoading}
        />
      )}
    </div>
  );
};

const ShopProducts = ({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
      {products?.map((product, index) => (
        <ProductCard data={product} key={index} />
      ))}
    </div>
  );
};

const ShopRunningEvents = ({ events }) => {
  return (
    <div className="space-y-4">
      {events?.map((event) => (
        <EventCard data={event} key={event?._id} />
      ))}
    </div>
  );
};
const ShopReviews = ({ reviews, reviewsHasError, reviewsIsLoading }) => {
  return (
    <div className="mb-8">
      {reviewsIsLoading && <Loader />}
      {reviews && <ReviewList reviews={reviews} />}
      {reviewsHasError && !reviewsIsLoading && (
        <h1 className={`${styles.error}`}>{reviewsHasError}</h1>
      )}
    </div>
  );
};
export default ShopProfileData;
