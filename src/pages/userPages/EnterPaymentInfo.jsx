import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Input } from "../../components/forms/Input";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import PaypalPopup from "../../components/popups/PaypalPopup";

const EnterPaymentInfo = () => {
  const [paymentThrough, setPaymentThrough] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    if (!JSON.parse(sessionStorage.getItem("shippingAddress"))) {
      toast.warn("Please fill shipping address first");
      navigate("/users/checkout/enter-shipping-info");
      return;
    }
  }, [navigate]);

  return (
    <>
      <div className="w-full 800px:w-[97%] bg-white rounded-md py-8 px-4 space-y-6">
        <div className="flex items-end flex-wrap">
          <input
            type="radio"
            name="paymentThrough"
            id="credit-card"
            value="credit-card"
            className="w-6 h-6 mr-2 peer/creditCard"
            defaultChecked
            onClick={() => setPaymentThrough(1)}
          />
          <label
            htmlFor="credit-card"
            className="text-[17px] font-semibold text-black peer-checked/creditCard:text-sky-600"
          >
            Pay with Debit/Credit Card
          </label>
          {paymentThrough === 1 && <PayThroughCard />}
        </div>
        <div className="flex items-end flex-wrap">
          <input
            type="radio"
            name="paymentThrough"
            id="payWithPaypal"
            value="paypal"
            className="w-6 h-6 mr-2 peer/paypal"
            onClick={() => setPaymentThrough(2)}
          />
          <label
            htmlFor="payWithPaypal"
            className="text-[17px] font-semibold text-black peer-checked/paypal:text-sky-600"
          >
            Pay with Paypal
          </label>
          {paymentThrough === 2 && <PayThroughPaypal />}
        </div>
        <div className="flex items-end">
          <input
            type="radio"
            name="paymentThrough"
            id="on-delivery"
            value="ondelivery"
            className="w-6 h-6 mr-2 peer/onDelivery"
            onClick={() => setPaymentThrough(3)}
          />
          <label
            htmlFor="on-delivery"
            className="text-[17px] font-semibold text-black peer-checked/onDelivery:text-sky-600"
          >
            Cash on delivery
          </label>
        </div>
      </div>
    </>
  );
};

const PayThroughCard = () => {
  const { user } = useSelector((state) => state.user);
  const [nameOnCard, setNameOnCard] = useState(user.name);
  const [paying, setPaying] = useState(false);

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();
    setPaying(true);
    try {
      const res = await axiosInstance.post(
        "/payments/create-intent",
        {
          appliedCoupon: sessionStorage.getItem("appliedCoupon"),
        },
        { withCredentials: true }
      );

      if (!stripe || !elements || !res.data.body.clientSecret) {
        return toast.error("Something went wrong! Please refresh the page");
      }

      const result = await stripe.confirmCardPayment(
        res.data.body.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement),
          },
        }
      );

      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const orderData = {
          couponApplied: sessionStorage.getItem("appliedCoupon"),
          shippingAddress: JSON.parse(
            sessionStorage.getItem("shippingAddress")
          ),
          paymentInfo: {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            paymentType: "Credit Card",
          },
        };

        await axiosInstance.post("/orders/create-order", orderData, {
          withCredentials: true,
        });
        await axiosInstance.delete("/carts/delete-cart-by-user", {
          withCredentials: true,
        });

        toast.success("Order created successfully");
        navigate("/users/orders/placed-successfully");
        window.location.reload();
      }
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setPaying(false);
    }
  };

  return (
    <form className=" w-full mt-6 space-y-4" onSubmit={paymentHandler}>
      <div className="block space-y-4 sm:space-x-6  sm:space-y-0 sm:flex">
        <Input
          label="Name on card"
          type="text"
          name="cardName"
          isRequired={true}
          value={nameOnCard}
          placeholder="Enter your name"
          onChange={setNameOnCard}
          inputContClasses="w-[100%] sm:w-[50%]"
        />
        <div className="w-[100%] sm:w-[50%]">
          <label
            htmlFor="expiryDate"
            className={clsx("block text-sm font-medium text-gray-700")}
          >
            Expiry date <span className="text-red-500">*</span>
          </label>
          <CardExpiryElement
            id="expiryDate"
            options={{
              style: {
                base: {
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "black",
                },
                empty: {
                  "::placeholder": {
                    color: "#d1d5db",
                  },
                },
              },
            }}
            className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-Roboto"
          />
        </div>
      </div>
      <div className="block space-y-4 sm:space-x-6  sm:space-y-0 sm:flex">
        <div className="w-[100%] sm:w-[50%]">
          <label
            htmlFor="expiryDate"
            className={clsx("block text-sm font-medium text-gray-700")}
          >
            Card Number <span className="text-red-500">*</span>
          </label>
          <CardNumberElement
            id="cardNumber"
            options={{
              style: {
                base: {
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "black",
                },
                empty: {
                  "::placeholder": {
                    color: "#d1d5db",
                  },
                },
              },
            }}
            className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-Roboto"
          />
        </div>
        <div className="w-[100%] sm:w-[50%]">
          <label
            htmlFor="Cvc"
            className={clsx("block text-sm font-medium text-gray-700")}
          >
            Cvc <span className="text-red-500">*</span>
          </label>
          <CardCvcElement
            id="Cvc"
            options={{
              style: {
                base: {
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "black",
                },
                empty: {
                  "::placeholder": {
                    color: "#d1d5db",
                  },
                },
              },
            }}
            className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-Roboto"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          variant="contained"
          color="tertiary"
          size="large"
          type="submit"
          endIcon={paying && <CircularProgress color="inherit" size={20} />}
          disabled={paying}
        >
          {paying ? "Submitting" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

const PayThroughPaypal = () => {
  const navigate = useNavigate();
  const [openPaypalPopup, setOpenPaypalPopup] = useState(false);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: 499,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderId) => {
        console.log(orderId);
        return orderId;
      });
  };
  const payWithPaypalHandler = async (paymentInfo) => {
    console.log(paymentInfo);

    const orderData = {
      couponApplied: sessionStorage.getItem("couponApplied"),
      shippingAddress: JSON.parse(sessionStorage.getItem("shippingAddress")),
      paymentInfo: {
        id: paymentInfo.payer_id,
        status: "succeeded",
        paymentType: "Paypal",
      },
    };

    await axiosInstance.post("/order/create-order", orderData, {
      withCredentials: true,
    });

    await axiosInstance.delete("/carts/delete-cart-by-user", {
      withCredentials: true,
    });

    toast.success("Order created successfully");
    navigate("/users/orders/placed-successfully");
    window.location.reload();
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      let paymentInfo = payer;
      if (paymentInfo) {
        payWithPaypalHandler(paymentInfo);
      }
    });
  };

  return (
    <div className="flex w-full mt-4">
      <Button
        size="large"
        color="tertiary"
        variant="contained"
        onClick={() => setOpenPaypalPopup(true)}
      >
        Pay now with Paypal
      </Button>
      <PaypalPopup
        open={openPaypalPopup}
        setOpen={setOpenPaypalPopup}
        onApprove={onApprove}
        createOrder={createOrder}
      />
    </div>
  );
};

export default EnterPaymentInfo;
