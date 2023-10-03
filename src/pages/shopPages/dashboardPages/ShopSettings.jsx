import { AiOutlineCamera } from "react-icons/ai";
import { backend_url } from "../../../server";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "../../../components/forms/Input";
import { Button, CircularProgress } from "@mui/material";
import store from "../../../redux/store";
import { toast } from "react-toastify";
import { updateShopData } from "../../../redux/actions/shopActions";
import axiosInstance from "../../../utils/axiosInstance";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ShopSettings = () => {
  const { shop } = useSelector((state) => state.shop);
  const [name, setName] = useState(shop?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(shop?.phone || "");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [changedProfPic, setChangedProfPic] = useState("");

  // for password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [cpVisible, setCpVisible] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [npVisbile, setNpVisbile] = useState(false);

  const [npConfirm, setNpConfirm] = useState("");
  const [npConfirmVisible, setNpConfirmVisible] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const passwordChangeSubmitHandler = (e) => {
    e.preventDefault();

    if (newPassword !== npConfirm) {
      return toast.error("new password and confirm new password are not same");
    }

    if (newPassword.length < 6) {
      return toast.error(
        "Password length should be greater than six characters"
      );
    }

    setIsSubmitting(true);

    axiosInstance
      .patch(
        "/shops/change-password",
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.body.message);
        setCurrentPassword("");
        setNewPassword("");
        setNpConfirm("");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (name.trim().length === 0 || phoneNumber.trim().length < 7) {
      return toast.error("Name and phone number is required");
    }
    await store.dispatch(
      updateShopData({ currentPassword: password, name, phoneNumber })
    );
    setSubmitting(false);
    setPassword("");
  };

  const profilePictureChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("newAvatarImage", file);
    try {
      await axiosInstance.patch("/shops/change-avatarImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      setChangedProfPic(URL.createObjectURL(file));
      toast.success("Yohoo! profile picture has been changed");
      window.location.reload();
    } catch (err) {
      toast.error(err.response.data.message);
      setChangedProfPic("");
    }
  };
  return (
    <>
      <div className="flex justify-center w-full">
        <div className="relative">
          <img
            src={
              changedProfPic
                ? changedProfPic
                : `${backend_url}/${shop?.avatarImage}`
            }
            alt=""
            className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
          />

          <label className="w-[30px] h-[30px] bg-[#e3e9ee] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
            <input
              type="file"
              className="sr-only"
              name="profilePicture"
              onChange={profilePictureChangeHandler}
              accept=".jpg,.jpeg,.png"
            />
            <AiOutlineCamera />
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full px-5">
        <form onSubmit={handleSubmit}>
          <div className="w-full flex-wrap flex justify-between pb-3 gap-y-3">
            <Input
              label="Name"
              type="text"
              value={name}
              isRequired={true}
              onChange={setName}
              placeholder="Name to be updated..."
              inputContClasses="800px:w-[45%] w-full"
            />
            <Input
              label="Email"
              type="email"
              value={shop?.email}
              disabled={true}
              inputContClasses="800px:w-[45%] w-full"
            />
          </div>
          <div className="w-full flex-wrap flex justify-between pb-3 gap-y-3">
            <Input
              label="Phone Number"
              type="text"
              isRequired={true}
              value={phoneNumber}
              onChange={setPhoneNumber}
              placeholder="Provide phone number to be updated..."
              inputContClasses="800px:w-[45%] w-full"
            />
            <Input
              label="Current Password"
              type="text"
              value={password}
              onChange={setPassword}
              isRequired={true}
              placeholder="Provide current password"
              inputContClasses="800px:w-[45%] w-full"
            />
          </div>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            endIcon={
              submitting && <CircularProgress color="inherit" size={20} />
            }
            disabled={submitting}
          >
            {submitting ? "Updating Profile" : "Update Profile"}
          </Button>
        </form>
      </div>
      <div className="px-5 w-full mt-8">
        <div className="flex w-full items-center justify-between mb-4">
          <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
            Change Password
          </h1>
        </div>
        <form onSubmit={passwordChangeSubmitHandler} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            name="currentPassword"
            isRequired={true}
            value={currentPassword}
            onChange={setCurrentPassword}
            placeholder="Please enter current password"
            passwordVisible={cpVisible}
            autoComplete={false}
            visibleIcon={
              <AiOutlineEye
                className="absolute top-2 right-2 cursor-pointer"
                size={25}
                onClick={() => setCpVisible(false)}
              />
            }
            hiddenIcon={
              <AiOutlineEyeInvisible
                className="absolute top-2 right-2 cursor-pointer"
                size={25}
                onClick={() => setCpVisible(true)}
              />
            }
          />
          <Input
            label="New Password"
            type="password"
            name="currentPassword"
            isRequired={true}
            value={newPassword}
            onChange={setNewPassword}
            placeholder="Please enter new password"
            passwordVisible={npVisbile}
            autoComplete={false}
            visibleIcon={
              <AiOutlineEye
                className="absolute top-2 right-2 cursor-pointer"
                size={25}
                onClick={() => setNpVisbile(false)}
              />
            }
            hiddenIcon={
              <AiOutlineEyeInvisible
                className="absolute top-2 right-2 cursor-pointer"
                size={25}
                onClick={() => setNpVisbile(true)}
              />
            }
          />
          <Input
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            isRequired={true}
            value={npConfirm}
            onChange={setNpConfirm}
            placeholder="Please enter new password"
            passwordVisible={npConfirmVisible}
            autoComplete={false}
            visibleIcon={
              <AiOutlineEye
                className="absolute top-2 right-2 cursor-pointer"
                size={25}
                onClick={() => setNpConfirmVisible(false)}
              />
            }
            hiddenIcon={
              <AiOutlineEyeInvisible
                className="absolute top-2 right-2 cursor-pointer"
                size={25}
                onClick={() => setNpConfirmVisible(true)}
              />
            }
          />
          <Button
            variant="contained"
            type="submit"
            size="large"
            endIcon={
              isSubmitting && <CircularProgress color="inherit" size={20} />
            }
            disabled={isSubmitting}
          >
            {isSubmitting ? "Changing Password" : "Change Password"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default ShopSettings;
