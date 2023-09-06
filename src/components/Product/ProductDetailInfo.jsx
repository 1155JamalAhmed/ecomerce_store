import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { backend_url } from "../../server";
import dayjs from "dayjs";
import { Button } from "@mui/material";

const ProductDetailInfo = ({ data }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 && <div className={`${styles.active_indicator}`} />}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 && <div className={`${styles.active_indicator}`} />}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 && <div className={`${styles.active_indicator}`} />}
        </div>
      </div>
      {active === 1 && (
        <div>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </div>
      )}
      {active === 2 && (
        <div className="w-full justify-center min-h-[40vh] flex items-center ">
          <p>No Reviews yet! </p>
        </div>
      )}
      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-ful 800px:w-[50%]">
            <div className="flex items-center">
              <img
                src={`${backend_url}/${data.shop.avatarImage}`}
                alt=""
                className="w-[50px] h-[50px] rounded-full"
              />

              <div className="ml-2">
                <h3 className={`${styles.shop_name} pb-1`}>{data.shop.name}</h3>
                <h5 className="pb-1 text-[15px]">
                  {data.shop.ratings} Ratings
                </h5>
              </div>
            </div>
            <p className="pt-2 text-justify">{data.shop.address}</p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[400]">
                  {" "}
                  {dayjs(data.shop.createdAt).format("DD MMM, YYYY")}
                </span>
              </h5>
              <h5 className="font-[600] pt-2">
                Total Products:{" "}
                <span className="font-[400]">{data.shop.totalProduct}</span>
              </h5>
              <h5 className="font-[600] pt-2">
                Total Reviews: <span className="font-[400]">0</span>
              </h5>
              <Link
                to={`/shops/${data.shop._id}`}
                className="inline-block  mt-2"
              >
                <Button variant="contained" color="tertiary">
                  Visit Shop
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailInfo;
