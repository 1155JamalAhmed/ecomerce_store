import React, { useState } from "react";
import { CloseButton } from "../ui/Button";
import Backdrop from "../ui/Backdrop";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../../styles/styles";
import { Input } from "../forms/Input";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import CustomDateTimePicker from "../forms/DateTimePicker";
import { Button, CircularProgress } from "@mui/material";
import { createCoupon } from "../../redux/actions/couponActions";
import store from "../../redux/store";

const CreateCouponPopup = ({ setOpen, open }) => {
  const [name, setName] = useState("");
  const [disPercentage, setDisPercentage] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const createCouponSubmitHandler = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    const couponData = {
      name,
      disPercentage,
      startDate,
      endDate,
    };

    if (minAmount) couponData.minAmount = minAmount;
    if (maxAmount) couponData.maxAmount = maxAmount;
    try {
      await store.dispatch(createCoupon(couponData));
      setName("");
      setDisPercentage("");
      setMinAmount("");
      setMaxAmount("");
      setStartDate(null);
      setEndDate(null);
      setOpen(false);
    } catch (err) {
      console.log("err", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEndDateTimeChange = (dateTime) => {
    // 1) check if the selected date is immediate successor i.e, "22 Aug 2023" start date and user selected "23 Aug 2023"
    if (
      dayjs(dateTime).subtract(1, "day").date() === startDate.date() &&
      dateTime.month() === startDate.month() &&
      dateTime.year() === startDate.year()
    ) {
      // 1.1) manupulate the time poper and make it point to the slot which is exactly after 1 days i.e, startDateTIme "22 Aug 2023 23:25" then user can only select time of 23:25 onward
      let newDateTime;
      if (
        dateTime.hour() > startDate.hour() ||
        (dateTime.hour() === startDate.hour() &&
          dateTime.minute() > startDate.minute())
      ) {
        newDateTime = dayjs(dateTime);
      } else {
        newDateTime = dayjs(startDate).add(1, "day");
      }
      setEndDate(newDateTime);
    } else {
      setEndDate(dateTime);
    }
  };

  const handleStartDateTimeChange = (dateTime) => {
    // 1) selected date is today
    if (
      dateTime.date() === dayjs().date() &&
      dateTime.month() === dayjs().month() &&
      dateTime.year() === dayjs().year()
    ) {
      const currentDateTime = dayjs();

      //   1.2)  check if it is PM of today and user want to select the AM of today and the dateTime has been selected before (because first time it get automatically to the next available slot) then show toast error and revert back to the prev state by adding 1 ms to keep the state and rerender
      if (currentDateTime.hour() >= 12 && dateTime.hour() < 12 && startDate) {
        toast.error("You can't select previous time");
        setStartDate((prevDateTime) => prevDateTime.add(1, "millisecond"));
        return;
      }

      // 1.1) automatically change the time to the upcomming time slot by manupulating the hour and min if next minute slot is 60, finally update the state
      if (Math.ceil(currentDateTime.minute() / 5) * 5 === 60) {
        currentDateTime.minute(0);
        currentDateTime.add(1, "hour");
      }

      let newDateTime;

      // 1.2) check if the time is more than the current time, then simply keep the selected time else go select the next avaliable slot
      if (
        dateTime.hour() > currentDateTime.hour() ||
        (dateTime.hour() === currentDateTime.hour() &&
          dateTime.minute() > currentDateTime.minute())
      ) {
        newDateTime = dayjs(dateTime);
      } else {
        newDateTime = dayjs(dateTime)
          .hour(currentDateTime.hour())
          .minute(Math.ceil(currentDateTime.minute() / 5) * 5);
      }

      setStartDate(newDateTime);
    } else {
      // 2) selected date is not today
      setStartDate(dateTime);
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
              <form onSubmit={createCouponSubmitHandler} className="space-y-3">
                <Input
                  label="Name"
                  type="text"
                  isRequired
                  value={name}
                  onChange={setName}
                  placeholder="Enter coupon code name"
                />
                <Input
                  label="Discount Percentage"
                  type="number"
                  isRequired
                  value={disPercentage}
                  onChange={setDisPercentage}
                  placeholder="Enter discount in percentage for this coupon"
                />
                <Input
                  label="Minimum Amount"
                  type="number"
                  value={minAmount}
                  onChange={setMinAmount}
                  placeholder="Enter minimum amount for this coupon"
                />
                <Input
                  label="Maximum Amount"
                  type="number"
                  value={maxAmount}
                  onChange={setMaxAmount}
                  placeholder="Enter Maximum amount for this coupon"
                />
                <CustomDateTimePicker
                  value={startDate}
                  setValue={setStartDate}
                  label="Start date"
                  isRequired={true}
                  minDateTime={dayjs()}
                  handleDateTimeChange={handleStartDateTimeChange}
                />
                <CustomDateTimePicker
                  value={endDate}
                  setValue={setEndDate}
                  label="End date"
                  isRequired={true}
                  minDateTime={startDate ? startDate.add(1, "day") : dayjs()}
                  disabled={!startDate}
                  handleDateTimeChange={handleEndDateTimeChange}
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
                  {submitting ? "Creating Coupon" : "Create Coupon"}
                </Button>
              </form>
            </div>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default CreateCouponPopup;
