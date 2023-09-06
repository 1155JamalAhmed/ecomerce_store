import React from "react";
import styles from "../../styles/styles";
import HeroImage from "../../assets/images/Hero.jpg";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

const Hero = () => {
  return (
    <div
      className={`min-h-[70vh] relative 800px:min-h-[80vh] w-full bg-no-repeat bg-cover  ${styles.normalFlex} 800px:mt-0`}
      style={{ backgroundImage: `url(${HeroImage})` }}
    >
      <div
        className={`${styles.section} w-[95%] 800px:w-[65%] backdrop-blur-sm`}
      >
        <div className="bg-orange-200 bg-opacity-[.4] px-12 py-4 rounded-md ">
          <h1 className="text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize">
            Best collection for home Decoration
          </h1>
          <p className="pt-4 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam
            sed molestias reprehenderit modi nihil, vitae suscipit, quas
            quisquam quis vero fugiat dolore corrupti. Eaque voluptatem,
            aspernatur optio architecto eum ad.
          </p>
          <Link to="/products" className="inline-block">
            <Button
              variant="contained"
              size="large"
              style={{
                backgroundColor: "black",
                color: "white",
                marginTop: "1rem",
                fontSize: "14px",
              }}
            >
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
