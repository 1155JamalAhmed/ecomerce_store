import React from "react";
import styles from "../../styles/styles";
import { brandingData, categoriesData } from "../../static/data";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.section} hiddden sm:block`}>
        <div
          className={`my-12 grid grid-cols-2 gap-12 md:grid-cols-4 md:gap-2 w-full shadow-sm bg-white p-5 rounded-md `}
        >
          {brandingData &&
            brandingData.map((brand, index) => {
              return (
                <div key={index} className="flex items-start">
                  {brand.icon}
                  <div className="px-3">
                    <h3 className="font-bold text-sm md:text-base">
                      {brand.title}
                    </h3>
                    <p className="text-xs md:text-sm">{brand.Description}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div
        className={`${styles.section} bg-white p-6 rounded-xl mb-12`}
        id="categories"
      >
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {categoriesData &&
            categoriesData.map((category) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}&page=1&limit=10`);
              };

              return (
                <div
                  className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden shadow-md p-2 rounded-lg "
                  key={category.id}
                  onClick={() => handleSubmit(category)}
                >
                  <h5 className={`text-[18px] leading-[1.3] `}>
                    {category.title}
                  </h5>
                  <img
                    src={category.image_Url}
                    alt=""
                    className="w-[120px] object-cover"
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
