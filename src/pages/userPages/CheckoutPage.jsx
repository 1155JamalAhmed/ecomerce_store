import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import CheckoutSteps from "../../components/checkout/CheckoutSteps";
import { Outlet } from "react-router-dom";
import CartData from "../../components/checkout/CartData";

const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <br />
      <br />
      <CheckoutSteps />

      <div className="w-full flex flex-col items-center py-8">
        <div className="w-[90%] 100px:w-[70%] block 800px:flex flex-wrap">
          <div className="w-full 800px:w-[65%]">
            <Outlet />
          </div>
          <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
            <CartData />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
