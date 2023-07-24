import React from "react";
import clsx from "clsx";

export const Input = ({
  label,
  type,
  name,
  isRequired,
  onChange,
  value,
  autoComplete,
  endIcon,
  visibleIcon,
  hiddenIcon,
  passwordVisible,
  inputContClasses,
  labelClasses,
  fieldContClasses,
  fieldClasses,
}) => {
  console.log("autoComplete", autoComplete);
  return (
    <div className={`${inputContClasses}`}>
      {label && (
        <label
          htmlFor={name}
          className={clsx(
            "block text-sm font-medium text-gray-700",
            labelClasses
          )}
        >
          {label}
        </label>
      )}
      <div className={clsx("mt-1 relative", fieldContClasses)}>
        <input
          type={type === "password" && passwordVisible ? "text" : type}
          name={name}
          id={name}
          autoComplete={`${autoComplete ? "on" : "off"}`}
          required={isRequired}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={clsx(
            "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
            fieldClasses
          )}
        />
        {type !== "password" && endIcon}
        {passwordVisible && visibleIcon && type === "password" && visibleIcon}
        {!passwordVisible && hiddenIcon && type === "password" && hiddenIcon}
      </div>
    </div>
  );
};
