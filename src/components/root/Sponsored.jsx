import React from "react";
import styles from "../../styles/styles";
import { sponsored } from "../../static/data";

const Sponsored = () => {
  return (
    <>
      <div className={`${styles.section} `}>
        <h1 className={`${styles.heading}`}>Sponsors</h1>
        <div className="800px:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl">
          <div className="flex flex-col items-center space-y-4 800px:flex-row 800px:justify-between 800px:space-x-4 w-full">
            {sponsored &&
              sponsored.map((sponsore) => (
                <div
                  className="flex justify-center w-[150px]"
                  key={sponsore.name}
                >
                  <img
                    src={sponsore.url}
                    alt={sponsore.name}
                    className="w-[80%] object-cover"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sponsored;
