import React, { useState } from "react";
import { Input } from "../../../components/forms/Input";
import TextArea from "../../../components/forms/TextArea";
import Select from "../../../components/forms/Select";
import { categoriesData } from "../../../static/data";
import { MultiFileUpload } from "../../../components/forms/FileUpload";
import { Button, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import store from "../../../redux/store";
import DateTimePicker from "../../../components/forms/DateTimePicker";

import dayjs from "dayjs";
import { createEvent } from "../../../redux/actions/eventActions";

const ShopCreateEvent = () => {
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleEndDateTimeChange = (dateTime) => {
    // 1) check if the selected date is immediate successor i.e, "22 Aug 2023" start date and user selected "25 Aug 2023"
    if (
      dayjs(dateTime).subtract(3, "day").date() === startDate.date() &&
      dateTime.month() === startDate.month() &&
      dateTime.year() === startDate.year()
    ) {
      // 1.1) manupulate the time poper and make it point to the slot which is exactly after 3 days i.e, startDateTIme "22 Aug 2023 23:25" then user can only select time of 23:25 onward
      let newDateTime;
      if (
        dateTime.hour() > startDate.hour() ||
        (dateTime.hour() === startDate.hour() &&
          dateTime.minute() > startDate.minute())
      ) {
        newDateTime = dayjs(dateTime);
      } else {
        newDateTime = dayjs(startDate).add(3, "day");
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

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      return toast.warn("Please select atleast one image");
    }

    setSubmitting(true);
    const eventForm = new FormData();
    eventForm.append("name", name);
    eventForm.append("description", description);
    eventForm.append("category", category);
    eventForm.append("tags", tags);
    eventForm.append("originalPrice", originalPrice);
    eventForm.append("discountPrice", discountPrice);
    eventForm.append("stock", stock);
    eventForm.append("startDate", startDate);
    eventForm.append("endDate", endDate);
    images.forEach((image) => {
      eventForm.append("images", image);
    });
    try {
      await store.dispatch(createEvent(eventForm));
      setImages([]);
      setDescription("");
      setCategory("");
      setTags("");
      setOriginalPrice("");
      setDiscountPrice("");
      setName("");
      setStock("");
      setEndDate(null);
      setStartDate(null);
    } catch (err) {
      console.log("err", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h5 className="text-[30px] font-Poppins text-center mb-4">
        Create Event
      </h5>
      {/* Create Event Product Form */}
      <form onSubmit={formSubmitHandler} className="space-y-4">
        <Input
          label="Name"
          name="name"
          type="text"
          isRequired={true}
          value={name}
          onChange={(value) => setName(value)}
          autoComplete={true}
          placeholder="Enter your event product name..."
        />
        <TextArea
          label="Description"
          name="description"
          type="text"
          isRequired={true}
          value={description}
          onChange={(value) => setDescription(value)}
          autoComplete={true}
          placeholder="Enter your event product description..."
        />
        <Select
          label="Category"
          name="category"
          isRequired={true}
          value={category}
          onChange={(value) => setCategory(value)}
          options={categoriesData}
        />
        <Input
          label="Tags"
          name="tags"
          type="text"
          value={tags}
          onChange={(value) => setTags(value)}
          autoComplete={true}
          placeholder="Enter your event product tags..."
        />
        <Input
          label="Original Price"
          name="originalPrice"
          type="number"
          value={originalPrice}
          onChange={(value) => setOriginalPrice(value)}
          autoComplete={true}
          placeholder="Enter your event product original price..."
        />
        <Input
          label="Price (After Discount)"
          name="discountPrice"
          type="number"
          isRequired={true}
          value={discountPrice}
          onChange={(value) => setDiscountPrice(value)}
          autoComplete={true}
          placeholder="Enter your event product price after discount..."
        />
        <Input
          label="Stock"
          name="stock"
          type="number"
          isRequired={true}
          value={stock}
          onChange={(value) => setStock(value)}
          autoComplete={true}
          placeholder="Enter total qauntity of product..."
        />
        <DateTimePicker
          value={startDate}
          setValue={setStartDate}
          label="Start date"
          isRequired={true}
          minDateTime={dayjs()}
          handleDateTimeChange={handleStartDateTimeChange}
        />
        <DateTimePicker
          value={endDate}
          setValue={setEndDate}
          label="End date"
          isRequired={true}
          minDateTime={startDate ? startDate.add(3, "day") : dayjs()}
          disabled={!startDate}
          handleDateTimeChange={handleEndDateTimeChange}
        />
        <MultiFileUpload
          label="Select Product Images"
          setFilesUpload={setImages}
          filesUpload={images}
          id="product_images"
          isRequired={true}
          totalImagesAllowed={3}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          size="large"
          endIcon={submitting && <CircularProgress color="inherit" size={20} />}
          disabled={submitting}
        >
          {submitting ? "Creating Event" : "Create Event"}
        </Button>
      </form>
    </>
  );
};

export default ShopCreateEvent;
