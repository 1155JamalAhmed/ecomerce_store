import React, { useEffect, useState } from "react";
import { server } from "../server";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// ** IMPORTING STYLES
import styles from "../styles/styles";

// ** IMPORTING ICONS
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Input } from "../components/forms/Input";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `${server}/users/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      toast.success("Login successful!");
      navigate("/");
      window.location.reload();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={onSubmitHandler}>
            <Input
              label="Email Address"
              type="text"
              name="email"
              isRequired={true}
              onChange={(value) => setEmail(value)}
              value={email}
              autoComplete
            />
            <Input
              type="password"
              label="Password"
              name="password"
              isRequired={true}
              onChange={(value) => setPassword(value)}
              value={password}
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
            <div className={`${styles.normalFlex} justify-between`}>
              <div className={`${styles.normalFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2 border-gray-300"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forget your password ?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Not have an account?</h4>
              <Link to="/sign-up" className="text-blue-600 ml-2">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
