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
  placeholder,
  endIcon,
  visibleIcon,
  hiddenIcon,
  passwordVisible,
  disabled = false,
  inputContClasses,
  labelClasses,
  fieldContClasses,
  fieldClasses,
}) => {
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
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className={clsx("mt-1 relative", fieldContClasses)}>
        <input
          type={type === "password" && passwordVisible ? "text" : type}
          name={name}
          id={label}
          autoComplete={`${autoComplete ? "on" : "off"}`}
          required={isRequired}
          autoFocus={false}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={clsx(
            "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-neutral-200 disabled:cursor-not-allowed",
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

// placeholder-gray-400 focus:outline-none focus:ring-blue-500
