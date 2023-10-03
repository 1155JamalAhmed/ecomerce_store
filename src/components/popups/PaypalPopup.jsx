import React from "react";
import PopupWrapper from "./PopupWrapper";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import styles from "../../styles/styles";
import Loader from "../layout/Loader";

const PaypalPopup = ({ open, setOpen, onApprove, createOrder }) => {
  const [{ isPending, isRejected }] = usePayPalScriptReducer();
  return (
    <PopupWrapper open={open} setOpen={setOpen}>
      <div className="mt-12">
        {isPending && <Loader />}
        {isRejected && (
          <h1 className={`${styles.error}`}>
            Something went wrong, please refresh the page
          </h1>
        )}
        <PayPalButtons
          style={{ layout: "vertical" }}
          onApprove={onApprove}
          createOrder={createOrder}
        />
      </div>
    </PopupWrapper>
  );
};

export default PaypalPopup;
