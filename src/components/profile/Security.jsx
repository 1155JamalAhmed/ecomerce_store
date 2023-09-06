import React, { useState } from "react";
import { Input } from "../forms/Input";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Button, CircularProgress } from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const Security = () => {
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
        "/users/change-password",
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

  return (
    <div className="px-5 w-[90%] 800px:w-[60%] max-w-[480px] m-auto">
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
  );
};

export default Security;
