import React, { useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Checkout from "../../components/checkout/Checkout";
import Payment from "../../components/checkout/Payment.jsx";
import CheckoutSteps from "../../components/checkout/CheckoutSteps";

const CheckoutPage = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <br />
      <br />
      <CheckoutSteps active={active} />
      {active === 1 && <Checkout setActive={setActive} />}
      {active === 2 && <Payment setActive={setActive} />}
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default CheckoutPage;
