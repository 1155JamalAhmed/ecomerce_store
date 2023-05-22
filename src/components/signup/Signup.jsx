import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";

// ** IMPORTING STYLES
import styles from "../../styles/styles";

// ** IMPORTING ICONS
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar, RxImage } from "react-icons/rx";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);

  const handleAvatarImageInputChange = (event) => {
    const file = event.target.files[0];
    setAvatarImage(file);
  };
  const handleBannerImageInputChange = (event) => {
    const file = event.target.files[0];
    setBannerImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("avatarImage", avatarImage);
    newFormData.append("name", name);
    newFormData.append("email", email);
    newFormData.append("password", password);
    if (bannerImage) {
      newFormData.append("bannerImage", bannerImage);
    }
    axios
      .post(`${server}/users/create-user`, newFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        toast.success(response.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatarImage(null);
        setBannerImage(null);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a new user
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* FULL NAME */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
                />
              </div>
            </div>
            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
                />
              </div>
            </div>
            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute top-2 right-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute top-2 right-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            {/* UPLOAD IMAGE */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-6 sm:space-y-0">
              <div className={`${styles.normalFlex}`}>
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatarImage ? (
                    <img
                      src={URL.createObjectURL(avatarImage)}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="avatar-input"
                  className="ml-3 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload avatar</span>
                  <input
                    type="file"
                    name="avatar"
                    id="avatar-input"
                    required={true}
                    accept=".jpg,.jpeg,.png"
                    onChange={handleAvatarImageInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
              <div className="flex sm:flex-row sm:justify-start items-center flex-row-reverse justify-end">
                <span className="inline-block h-8 w-14 rounded-md overflow-hidden">
                  {bannerImage ? (
                    <img
                      src={URL.createObjectURL(bannerImage)}
                      alt="banner"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <RxImage className="h-8 w-14" />
                  )}
                </span>
                <label
                  htmlFor="banner-input"
                  className="sm:ml-3 mr-3 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload banner</span>
                  <input
                    type="file"
                    name="banner"
                    id="banner-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleBannerImageInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            {/* SUBMIT BUTTON */}
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            {/* ALTERNATIVE OPTION */}
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link to="/login" className="text-blue-600 ml-2">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
