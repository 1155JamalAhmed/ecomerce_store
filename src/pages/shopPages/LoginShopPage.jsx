import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input } from "../../components/forms/Input";

// ** IMPORTING STYLES
import styles from "../../styles/styles";

// ** IMPORTING ICONS
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Button, CircularProgress } from "@mui/material";
import store from "../../redux/store";
import { loginShop } from "../../redux/actions/shopActions";

const LoginShopPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { isShopAuthenticated, shop } = useSelector((state) => state.shop);

  useEffect(() => {
    if (isShopAuthenticated) {
      navigate(`/shops/${shop._id}`, { replace: true });
    }
  }, [isShopAuthenticated, navigate, shop]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await store.dispatch(
        loginShop({ email, password, rememberMe })
      );
      console.log("res", res);
      // once the above action got performed
      // the isAuthenticated gets truthy
      // hence user will be automatically redirected to home page
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your Shop
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
                  onChange={() => setRememberMe((prevState) => !prevState)}
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
                  Forget shop password ?
                </a>
              </div>
            </div>
            <div>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                endIcon={
                  isSubmitting && <CircularProgress color="inherit" size={20} />
                }
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting" : "Submit"}
              </Button>
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Not have an account?</h4>
              <Link to="/shops/create-shop" className="text-blue-600 ml-2">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginShopPage;
