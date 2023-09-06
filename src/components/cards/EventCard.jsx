import React from "react";
import styles from "../../styles/styles";

import CountDown from "../helpers/CountDown";
import { backend_url } from "../../server";

const EventCard = ({ active, data }) => {
  return (
    <div
      className={`w-[100%] mx-auto bg-white rounded-lg lg:flex py-6 px-4 ${
        active ? "lg:w-[90%] my-2 border-2 border-gray-200 shadow-md" : "mb-12"
      } `}
    >
      <div className="w-[100%] h-[50vh] lg:flex-[40%] overflow-hidden rounded-t-lg lg:mr-6">
        <img
          src={`${backend_url}/${data.images[0]}`}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="lg:flex-[55%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p className="text-justify">{data.description}</p>
        <div className="flex py-2 justify-between w-full items-center">
          <h5 className="font-[500] text-[18px] text-[#d55b45] line-through pr-3">
            {data.originalPrice}$
          </h5>
          <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
            {data.discountPrice}$
          </h5>
          <h5 className="pr-3 font-[400] text-[17px] text-[#44a55e] ml-auto">
            {data.sold_out} sold
          </h5>
        </div>
        <CountDown endDate={data.endDate} />
      </div>
    </div>
  );
};

export default EventCard;
