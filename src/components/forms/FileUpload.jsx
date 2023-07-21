import React from "react";
import styles from "../../styles/styles";

const FileUpload = ({
  fileUpload,
  setFileUpload,
  label,
  icon,
  accept = ".jpg,.jpeg,.png",
  id,
  isRequired,
}) => {
  const handleFileUploadInputChange = (event) => {
    const file = event.target.files[0];
    setFileUpload(file);
  };

  return (
    <div className={`${styles.normalFlex}`}>
      <span className="flex items-center justify-center h-10 w-10 rounded-full overflow-hidden">
        {fileUpload ? (
          <img
            src={URL.createObjectURL(fileUpload)}
            alt={id}
            className="w-full h-full object-cover"
          />
        ) : (
          <>{icon}</>
        )}
      </span>
      <label
        htmlFor={id}
        className="ml-3 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <span>{label}</span>
        <input
          type="file"
          name={id}
          id={id}
          required={isRequired}
          accept={accept}
          onChange={handleFileUploadInputChange}
          className="sr-only"
        />
      </label>
    </div>
  );
};

export default FileUpload;
