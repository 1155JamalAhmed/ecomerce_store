import clsx from "clsx";
import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const Select = ({
  label,
  isRequired,
  name,
  value,
  disabled,
  onChange,
  options,
  addressSpecOptions,
  contClasses,
}) => {
  return (
    <div className={clsx(contClasses)}>
      {label && (
        <label
          htmlFor={name}
          className={clsx("block text-sm font-medium text-gray-700")}
        >
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className={clsx("mt-1 relative")}>
        <select
          className={`${
            value === "" && "text-gray-400"
          } appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-neutral-200 disabled:cursor-not-allowed`}
          id={name}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          required={isRequired}
          value={value}
        >
          <option disabled value="" className="text-gray-400">
            Select an option...
          </option>
          {addressSpecOptions &&
            addressSpecOptions?.map((option, index) => (
              <option
                key={index}
                value={option.isoCode}
                className="text-gray-800"
              >
                {option.name}
              </option>
            ))}
          {options &&
            options?.map((option) => (
              <option
                key={option.title}
                value={option.title}
                className="text-gray-800"
              >
                {option.title}
              </option>
            ))}
        </select>
        <RiArrowDropDownLine
          size={24}
          className="text-gray-600 absolute top-[8px] right-3"
        />
      </div>
    </div>
  );
};

export default Select;
