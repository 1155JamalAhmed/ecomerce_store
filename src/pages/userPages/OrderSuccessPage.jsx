import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import successAnimation from "../../assets/animations/Success.json";
import Lottie from "react-lottie";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    renderSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Your Order is successful 😍
      </h5>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
