import React, { useState } from "react";
import styles from "../../styles/styles";
import { Input } from "../../components/forms/Input";
import { useSelector } from "react-redux";
import Select from "../../components/forms/Select";
import { Country, State, City } from "country-state-city";
import TextArea from "../../components/forms/TextArea";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EnterShippingAddress = () => {
  const { user } = useSelector((state) => state.user);
  const [fullName, setFullName] = useState(user.name);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const navigate = useNavigate();

  const gotoPaymentHandler = (e) => {
    e.preventDefault();
    if (
      (!fullName ||
        !phoneNumber ||
        !zipcode ||
        !country ||
        !state ||
        !fullAddress) &&
      !JSON.parse(sessionStorage.getItem("shippingAddress"))
    ) {
      return toast.error("Please provide all the required fields");
    }
    sessionStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        phoneNumber,
        zipcode,
        country,
        state,
        city,
        fullAddress,
      })
    );
    navigate("/users/checkout/enter-payment-info");
  };

  return (
    <div className="w-full 800px:w-[97%] bg-white rounded-md py-8 px-4">
      <h5 className="text-[18px] font-[500]">Shipping Information</h5>
      <br />
      <form className="space-y-4" onSubmit={gotoPaymentHandler}>
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
        <div className="flex justify-end w-full mt-4">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            type="submit"
            onClick={gotoPaymentHandler}
          >
            Proceed to payment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EnterShippingAddress;
