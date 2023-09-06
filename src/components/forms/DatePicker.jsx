import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import clsx from "clsx";

const CustomDatePicker = ({
  label,
  value,
  labelClasses,
  isRequired,
  handleDateTimeChange,
  disablePast,
  disabled = false,
  format,
  views,
}) => {
  return (
    <div>
      {label && (
        <label
          className={clsx(
            "block text-sm font-medium text-gray-700 mb-1",
            labelClasses
          )}
        >
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <DatePicker
        disabled={disabled}
        value={value}
        closeOnSelect={false}
        onChange={handleDateTimeChange}
        slotProps={{
          textField: { size: "small", required: isRequired },
        }}
        format={format}
        disablePast={disablePast}
        views={views}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm  sm:text-sm"
        sx={{
          "& fieldset": {
            borderColor: "#d1d5db !important",
            borderRadius: ".375rem",
          },
          "& > .MuiInputBase-root:hover fieldset": { borderColor: "#d1d5db" },
          "& > .MuiInputBase-root.Mui-focused fieldset": {
            borderColor: "#3b82f6",
            borderWidth: "1px",
          },
          "& input": {
            fontSize: "14px",
            color: "black",
          },
        }}
      />
    </div>
  );
};

export default CustomDatePicker;
