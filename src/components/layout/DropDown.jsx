import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const submitHandle = (category) => {
    navigate(`/products?category=${category.title}&page=1&limit=10`);
    setDropDown(false);
  };

  return (
    <div className="pb-4 w-[270px] bg-[#fff] absolute z-[30] rounded-b-md shadow-sm">
      {categoriesData &&
        categoriesData.map((category, index) => (
          <div
            key={index}
            className={`${styles.normalFlex}`}
            onClick={() => submitHandle(category)}
          >
            <img
              src={category.image_Url}
              alt=""
              className="w-[25px] height-[25px] object-contain ml-2.5 select-none"
            />
            <h3 className="m-3 cursor-pointer select-none">{category.title}</h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
