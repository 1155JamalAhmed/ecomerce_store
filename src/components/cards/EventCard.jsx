import React from "react";
import styles from "../../styles/styles";

import CountDown from "../helpers/CountDown";

const EventCard = ({ active }) => {
  return (
    <div
      className={`w-full bg-white rounded-lg lg:flex p-4 ${
        active ? "mb-0" : "mb-12"
      } `}
    >
      <div className="w-[60vw] h-[50vh] lg:w-[50%] lg:h-full m-auto">
        <img
          src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
          alt=" "
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>Iphone 14pro max 8/256gb</h2>
        <p className="text-justify">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem
          velit, ex exercitationem alias repudiandae ea possimus non
          voluptatibus quibusdam molestiae error nemo, aut dolore, optio totam
          molestias aperiam deleniti mollitia! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eaque cumque hic animi voluptates illo,
          dolore deleniti! Neque suscipit tenetur quis, perspiciatis optio
          aspernatur quasi ea, porro ullam incidunt reiciendis consectetur!
        </p>
        <div className="flex py-2 justify-between w-full items-center">
          <h5 className="font-[500] text-[18px] text-[#d55b45] line-through pr-3">
            1099$
          </h5>
          <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
            999$
          </h5>
          <h5 className="pr-3 font-[400] text-[17px] text-[#44a55e] ml-auto">
            120 sold
          </h5>
        </div>
        <CountDown />
      </div>
    </div>
  );
};

export default EventCard;
