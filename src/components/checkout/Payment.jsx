import React, { useState } from "react";
import CartData from "./CartData";
import { Button } from "@mui/material";
import { Input } from "../forms/Input";
import CustomDatePicker from "../forms/DatePicker";

const Payment = ({ setActive }) => {
  const [paymentThrough, setPaymentThrough] = useState(1);
  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 100px:w-[70%] block 800px:flex flex-wrap">
        <div className="w-full 800px:w-[65%]">
          <form className="w-full 800px:w-[97%] bg-white rounded-md py-8 px-4 space-y-6">
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
            <div className="flex items-end">
              <input
                type="radio"
                name="paymentThrough"
                id="paypal"
                value="paypal"
                className="w-6 h-6 mr-2 peer/paypal"
                onClick={() => setPaymentThrough(2)}
              />
              <label
                htmlFor="paypal"
                className="text-[17px] font-semibold text-black peer-checked/paypal:text-sky-600"
              >
                Pay with Paypal
              </label>
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
          </form>
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData />
        </div>
        <div className="flex justify-end w-full mt-4">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => {
              setActive(3);
            }}
          >
            Go to success
          </Button>
        </div>
      </div>
    </div>
  );
};

const PayThroughCard = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [dateOnCard, setDateOnCard] = useState(null);
  const [nameOnCard, setNameOnCard] = useState("");
  const [cvv, setCvv] = useState("");

  return (
    <div className=" w-full mt-6 space-y-4">
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
          <CustomDatePicker
            label="Card expiry date"
            isRequired={true}
            value={dateOnCard}
            placeholder="Enter your name"
            handleDateTimeChange={(e) => {
              setDateOnCard(e);
            }}
            format="MM/YY"
            views={["year", "month"]}
            disablePast={true}
          />
        </div>
      </div>
      <div className="block space-y-4 sm:space-x-6  sm:space-y-0 sm:flex">
        <Input
          label="Card Number"
          type="text"
          name="cardNumber"
          isRequired={true}
          value={cardNumber}
          placeholder="Enter your card number"
          onChange={setCardNumber}
          inputContClasses="w-[100%] sm:w-[50%]"
        />
        <Input
          label="Cvv"
          type="number"
          name="cardNumber"
          isRequired={true}
          value={cvv}
          placeholder="Enter your card cvv"
          onChange={setCvv}
          inputContClasses="w-[100%] sm:w-[50%]"
        />
      </div>
      <div className="flex justify-end">
        <Button variant="contained" color="tertiary" size="large">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Payment;
