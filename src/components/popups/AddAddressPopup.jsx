import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Backdrop from "../ui/Backdrop";
import { CloseButton } from "../ui/Button";
import { Button, CircularProgress } from "@mui/material";
import styles from "../../styles/styles";
import Select from "../forms/Select";
import { Country, State, City } from "country-state-city";
import { Input } from "../forms/Input";
import TextArea from "../forms/TextArea";
import store from "../../redux/store";
import { addUserAddress } from "../../redux/actions/userActions";

const AddAddressPopup = ({ open, setOpen }) => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [addressType, setAddressType] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const createAddressClickHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const addressData = {
      country: country,
      state: state,
      city: city,
      fullAddress,
      zipCode,
      addressType,
    };

    try {
      await store.dispatch(addUserAddress(addressData));
      setOpen(false);
      setCountry("");
      setState("");
      setCity("");
      setZipCode("");
      setFullAddress("");
      setAddressType("");
    } catch (err) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <Backdrop>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center w-full h-[100vh] z-50"
          >
            <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-auto 800px:h-[75vh] bg-white rounded-md shadow-sm relative top-4 p-4 z-50">
              <CloseButton
                size={35}
                setOpen={() => setOpen(false)}
                contClasses="absolute right-3 top-3 z-50"
              />
              <h1 className={`${styles.heading}`}>Create Coupon</h1>
              <form onSubmit={createAddressClickHandler} className="space-y-4">
                <Select
                  label="Country"
                  isRequired={true}
                  name="country"
                  value={country}
                  onChange={setCountry}
                  addressSpecOptions={Country.getAllCountries()}
                />
                <Select
                  label="State"
                  isRequired={true}
                  name="State"
                  disabled={country ? false : true}
                  value={state}
                  onChange={setState}
                  addressSpecOptions={State.getStatesOfCountry(country)}
                />
                <Select
                  label="City"
                  name="City"
                  disabled={state ? false : true}
                  value={city}
                  onChange={setCity}
                  addressSpecOptions={City.getCitiesOfState(country, state)}
                />
                <Select
                  label="Address Type"
                  name="type"
                  value={addressType}
                  onChange={setAddressType}
                  isRequired={true}
                  options={[
                    { title: "Default" },
                    { title: "Home" },
                    { title: "Office" },
                  ]}
                />
                <Input
                  label="Zipcode"
                  name="zipcode"
                  type="number"
                  isRequired={true}
                  value={zipCode}
                  onChange={setZipCode}
                  placeholder="Enter your Zipcode"
                />
                <TextArea
                  label="Full Address"
                  name="fullAddress"
                  isRequired={true}
                  value={fullAddress}
                  onChange={setFullAddress}
                  placeholder="Enter complete address"
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  size="large"
                  endIcon={
                    submitting && <CircularProgress color="inherit" size={20} />
                  }
                  disabled={submitting}
                >
                  {submitting ? "Creating Address" : "Create Address"}
                </Button>
              </form>
            </div>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default AddAddressPopup;
