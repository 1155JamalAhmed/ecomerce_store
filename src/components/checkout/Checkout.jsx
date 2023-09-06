import React, { useState } from "react";
import styles from "../../styles/styles";
import { Input } from "../forms/Input";
import { useSelector } from "react-redux";
import Select from "../forms/Select";
import { Country, State, City } from "country-state-city";
import TextArea from "../forms/TextArea";
import { Button } from "@mui/material";
import CartData from "./CartData";

const Checkout = ({ setActive }) => {
  const { user } = useSelector((state) => state.user);
  const [fullName, setFullName] = useState(user.name);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [fullAddress, setFullAddress] = useState("");

  const gotoPaymentHandler = () => {
    setActive(2);
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 100px:w-[70%] block 800px:flex flex-wrap">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            fullName={fullName}
            setFullName={setFullName}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            zipcode={zipcode}
            setZipcode={setZipcode}
            country={country}
            setCountry={setCountry}
            state={state}
            setState={setState}
            city={city}
            setCity={setCity}
            fullAddress={fullAddress}
            setFullAddress={setFullAddress}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData />
        </div>
        <div className="flex justify-end w-full mt-4">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={gotoPaymentHandler}
          >
            Proceed to payment
          </Button>
        </div>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  fullName,
  setFullName,
  phoneNumber,
  setPhoneNumber,
  zipcode,
  setZipcode,
  country,
  setCountry,
  state,
  setState,
  city,
  setCity,
  fullAddress,
  setFullAddress,
}) => {
  return (
    <div className="w-full 800px:w-[97%] bg-white rounded-md py-8 px-4">
      <h5 className="text-[18px] font-[500]">Shipping Information</h5>
      <br />
      <form className="space-y-4">
        <div className="block space-y-4 sm:space-x-6  sm:space-y-0 sm:flex">
          <Input
            label="Full Name"
            name="fullName"
            type="text"
            isRequired={true}
            value={fullName}
            onChange={setFullName}
            placeholder="Enter your full name"
            inputContClasses="w-[100%] sm:w-[50%]"
          />

          <Input
            label="Email Address"
            name="email"
            type="text"
            isRequired={true}
            value={user.email}
            disabled={true}
            inputContClasses="w-[100%] sm:w-[50%]"
          />
        </div>

        <div className="block space-y-4 sm:space-x-6  sm:space-y-0 sm:flex">
          <Input
            label="Phone Number"
            name="phoneNumber"
            type="number"
            isRequired={true}
            value={phoneNumber}
            onChange={setPhoneNumber}
            placeholder="Enter your phone number"
            inputContClasses="w-[100%] sm:w-[50%]"
          />
          <Input
            label="Zipcode"
            name="zipcode"
            type="nunmber"
            isRequired={true}
            value={zipcode}
            onChange={setZipcode}
            placeholder="Enter your zipcode"
            inputContClasses="w-[100%] sm:w-[50%]"
          />
        </div>

        <div className="block space-y-4 sm:space-x-6  sm:space-y-0 sm:flex">
          <Select
            label="Country"
            isRequired={true}
            name="country"
            value={country}
            onChange={setCountry}
            addressSpecOptions={Country.getAllCountries()}
            contClasses="w-[100%] sm:w-[50%]"
          />
          <Select
            label="State"
            isRequired={true}
            name="State"
            disabled={country ? false : true}
            value={state}
            onChange={setState}
            addressSpecOptions={State.getStatesOfCountry(country)}
            contClasses="w-[100%] sm:w-[50%]"
          />
          <Select
            label="City"
            name="City"
            disabled={state ? false : true}
            value={city}
            onChange={setCity}
            addressSpecOptions={City.getCitiesOfState(country, state)}
            contClasses="w-[100%] sm:w-[50%]"
          />
        </div>

        <TextArea
          label="Full Address"
          name="fullAddress"
          isRequired={true}
          value={fullAddress}
          onChange={setFullAddress}
          placeholder="Enter complete address"
        />
      </form>
      <div className="mt-6">
        <h1 className="text-[18px] font-[500] mb-2">
          Choose from saved addresses
        </h1>
        {user.addresses.map((address) => (
          <div className={`${styles.normalFlex} mb-1 `} key={address._id}>
            <input
              type="radio"
              name="saved-address-picked"
              id={address.addressType}
              className="h-4 w-4 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2 border-gray-300"
              onChange={() => {
                setZipcode(address.zipCode);
                setCountry(address.country);
                setState(address.state);
                setCity(address.city);
                setFullAddress(address.fullAddress);
              }}
            />
            <label
              htmlFor={address.addressType}
              className="ml-2 text-sm text-gray-900"
            >
              {address.addressType}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkout;
