import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import FileUpload from "../../components/forms/FileUpload";
import { toast } from "react-toastify";
import { Input } from "../../components/forms/Input";

// ** IMPORTING STYLES
import styles from "../../styles/styles";

// ** IMPORTING ICONS
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar, RxImage } from "react-icons/rx";

// ** MUI
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // data from the redux store
  const { isAuthenticated } = useSelector((state) => state.user);

  // loggedin user don't have access to sign up
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newFormData = new FormData();
    newFormData.append("avatarImage", avatarImage);
    newFormData.append("name", name);
    newFormData.append("email", email);
    newFormData.append("password", password);
    if (bannerImage) {
      newFormData.append("bannerImage", bannerImage);
    }

    axiosInstance
      .post(`/users/create-user`, newFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        toast.success(`${response.data.message}, redirecting to home page...`);
        setName("");
        setEmail("");
        setPassword("");
        setAvatarImage(null);
        setBannerImage(null);
        setTimeout(() => navigate("/"), 3000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setIsSubmitting(false);
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
            <Input
              label="Full Name"
              type="text"
              name="name"
              isRequired={true}
              onChange={(value) => setName(value)}
              value={name}
              autoComplete
            />
            <Input
              label="Email"
              type="email"
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
            {/* UPLOAD IMAGE */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-6 sm:space-y-0">
              <FileUpload
                fileUpload={avatarImage}
                setFileUpload={setAvatarImage}
                label="Upload Avatar"
                id="avatar"
                isRequired={true}
                icon={<RxAvatar className="h-8 w-8" />}
              />
              <FileUpload
                fileUpload={bannerImage}
                setFileUpload={setBannerImage}
                label="Upload banner"
                id="banner"
                icon={<RxImage className="h-8 w-8" />}
              />
            </div>
            {/* SUBMIT BUTTON */}
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
            {/* ALTERNATIVE OPTION */}
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link to="/users/login" className="text-blue-600 ml-2">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
