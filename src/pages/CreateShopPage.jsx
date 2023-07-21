import React, { useState } from "react";
import { server } from "../server";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// ** IMPORTING STYLES
import styles from "../styles/styles";

// ** IMPORTING ICONS
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Input } from "../components/forms/Input";
import TextArea from "../components/forms/TextArea";
import FileUpload from "../components/forms/FileUpload";
import { RxAvatar } from "react-icons/rx";

const CreateShopPage = () => {
  const [shopName, setShopName] = useState("");
  const [shopEmail, setShopEmail] = useState("");
  const [shopProfileImage, setShopeProfileImage] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [shopPassword, setShopPassword] = useState("");
  const [shopPhoneNumber, setShopPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [visible, setVisible] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("email", shopEmail);
    newFormData.append("name", shopName);
    newFormData.append("phone", shopPhoneNumber);
    newFormData.append("address", shopAddress);
    newFormData.append("zipCode", zipCode);
    newFormData.append("password", shopPassword);
    newFormData.append("shopImage", shopProfileImage);

    axios
      .post(`${server}/shops/create-shop`, newFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        toast.success(response.data.message);
        setShopName("");
        setShopEmail("");
        setShopeProfileImage("");
        setShopAddress("");
        setShopPassword("");
        setShopPhoneNumber("");
        setZipCode("");
        setShopeProfileImage("");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create A Shop
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={onSubmitHandler}>
            <Input
              label="Shop Name"
              type="text"
              name="shopName"
              isRequired={true}
              onChange={(value) => setShopName(value)}
              value={shopName}
              autoComplete
            />
            <Input
              label="Shop Email"
              type="email"
              name="shopEmail"
              isRequired={true}
              onChange={(value) => setShopEmail(value)}
              value={shopEmail}
              autoComplete
            />
            <Input
              label="Shop Phone Number"
              type="number"
              name="phone"
              isRequired={true}
              onChange={(value) => setShopPhoneNumber(value)}
              value={shopPhoneNumber}
              autoComplete
            />

            <TextArea
              label="Shop Address"
              name="shopAddress"
              isRequired={true}
              autoComplete
              value={shopAddress}
              onChange={(value) => setShopAddress(value)}
            />

            <Input
              label="Zip Code"
              type="number"
              name="zipCode"
              isRequired={true}
              onChange={(value) => setZipCode(value)}
              value={zipCode}
              autoComplete
            />

            <Input
              type="password"
              label="Password"
              name="password"
              isRequired={true}
              onChange={(value) => setShopPassword(value)}
              value={shopPassword}
              autoComplete
              passwordVisible={visible}
              visibleIcon={
                <AiOutlineEye
                  className="absolute top-2 right-2 cursor-pointer"
                  size={25}
                  onClick={() => setVisible(false)}
                />
              }
              hiddenIcon={
                <AiOutlineEyeInvisible
                  className="absolute top-2 right-2 cursor-pointer"
                  size={25}
                  onClick={() => setVisible(true)}
                />
              }
            />

            <FileUpload
              fileUpload={shopProfileImage}
              setFileUpload={setShopeProfileImage}
              label="Upload Image"
              isRequired={true}
              icon={<RxAvatar className="h-8 w-8" />}
            />

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link to="/shop-login" className="text-blue-600 ml-2">
                sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateShopPage;
