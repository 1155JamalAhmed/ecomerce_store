import React from "react";
import styles from "../../styles/styles";
import { sponsored } from "../../static/data";

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full">
        {sponsored &&
          sponsored.map((sponsore) => (
            <div className="flex items-start" key={sponsore.name}>
              <img
                src={sponsore.url}
                alt={sponsore.name}
                style={{ width: "150px", objectFit: "contain" }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sponsored;
