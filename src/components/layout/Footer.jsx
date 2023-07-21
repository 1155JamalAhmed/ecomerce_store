import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import {
  footerProductLinks,
  footerSupportLinks,
  footercompanyLinks,
} from "../../static/data";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const Footer = () => {
  return (
    <div className="bg-[#000] text-white ">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#342ac8] py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[#56d879]">Subscribe</span> us to get news
          <br /> events and offers
        </h1>
        <div className="flex items-center">
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-800 md:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <Button
            variant="contained"
            style={{
              backgroundColor: "#56d879",
              color: "white",
              padding: "10px 12px",
            }}
          >
            Submit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 text-center">
        <ul className="lg:px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            src="https://img.icons8.com/external-itim2101-lineal-color-itim2101/64/null/external-online-shopping-shopping-and-ecommerce-itim2101-lineal-color-itim2101-4.png"
            alt="website logo"
            style={{ filter: "brightness(0.8)" }}
          />
          <br />
          <p>The home and elements needed to create beatiful products.</p>
          <div className="flex items-center mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiOutlineTwitter size={25} className="ml-[15px] cursor-pointer" />
            <AiFillInstagram size={25} className="ml-[15px] cursor-pointer" />
            <AiFillYoutube size={25} className="ml-[15px] cursor-pointer" />
          </div>
        </ul>
        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Company</h1>
          {footerProductLinks.map((productLink) => (
            <li key={productLink.name}>
              <Link
                to={productLink.link}
                className="text-gray-400 hover:text-teal-400 duration-30 text-sm cursor-pointer leading-6"
              >
                {productLink.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Shop</h1>
          {footercompanyLinks.map((productLink) => (
            <li key={productLink.name}>
              <Link
                to={productLink.link}
                className="text-gray-400 hover:text-teal-400 duration-30 text-sm cursor-pointer leading-6"
              >
                {productLink.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Company</h1>
          {footerSupportLinks.map((productLink) => (
            <li key={productLink.name}>
              <Link
                to={productLink.link}
                className="text-gray-400 hover:text-teal-400 duration-30 text-sm cursor-pointer leading-6"
              >
                {productLink.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 md:gap-10 text-center py-4 text-gray-400 border-t-2 border-gray-800">
        <span>@2020 Jamal Ahmed. All rights reserved.</span>
        <span>Terms & Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
