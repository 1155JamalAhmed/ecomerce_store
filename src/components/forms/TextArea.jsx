import clsx from "clsx";
import React from "react";

const TextArea = ({
  label,
  name,
  isRequired,
  textAreaContClasses,
  labelClasses,
  autoComplete,
  onChange,
  value,
  placeholder,
}) => {
  return (
    <div className={`${textAreaContClasses}`}>
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
      <textarea
        autoComplete={`${autoComplete ? "on" : "off"}`}
        className="mt-1 h-20 px-3 appearance-none block w-full py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        onChange={(e) => onChange(e.target.value)}
        required={isRequired}
        value={value}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

export default TextArea;
