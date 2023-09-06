import React from "react";
import Lottie from "react-lottie";
import MainLoader from "../../assets/animations/MainLoader.json";
import clsx from "clsx";

const Loader = ({ className }) => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: MainLoader,
    renderSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      className={clsx(
        "w-full h-[100vh] flex items-center justify-center",
        className
      )}
    >
      <Lottie options={defaultOptions} width={300} height={300} />
    </div>
  );
};

export default Loader;
