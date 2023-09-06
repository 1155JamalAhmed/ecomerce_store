import { AiOutlineCamera } from "react-icons/ai";
import { backend_url } from "../../server";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "../forms/Input";
import { Button, CircularProgress } from "@mui/material";
import store from "../../redux/store";
import { toast } from "react-toastify";
import { updateUserData } from "../../redux/actions/userActions";
import axiosInstance from "../../utils/axiosInstance";

const ProfileUpdation = () => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [changedProfPic, setChangedProfPic] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (name.trim().length === 0 || phoneNumber.trim().length < 7) {
      return toast.error("Name and phone number is required");
    }
    await store.dispatch(
      updateUserData({ currentPassword: password, name, phoneNumber })
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
      await axiosInstance.patch("/users/change-avatarImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      setChangedProfPic(URL.createObjectURL(file));
      toast.success("Yohoo! profile picture has been changed");
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
                : `${backend_url}/${user?.avatarImage}`
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
              value={user?.email}
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
    </>
  );
};

export default ProfileUpdation;
