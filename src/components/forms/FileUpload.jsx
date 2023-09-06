import React from "react";
import styles from "../../styles/styles";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { CloseButton } from "../ui/Button";
import { toast } from "react-toastify";

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
        className="ml-3 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
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

export const MultiFileUpload = React.memo(
  ({
    filesUpload,
    setFilesUpload,
    label,
    accept = ".jpg,.jpeg,.png",
    id,
    isRequired,
    totalImagesAllowed,
  }) => {
    // complexity 3n => O(n)
    const handleFilesUploadInputChange = (event) => {
      // O(n)
      const filesLoaded = Array.from(event.target.files);

      // O(n)
      const alreadyUploadedFilesName = new Set(
        filesUpload.map((file) => file.name)
      );

      // O(n)
      let mergedWithoutDups = [
        ...filesLoaded.filter(
          (file) => !alreadyUploadedFilesName.has(file.name)
        ),
        ...filesUpload,
      ];

      if (mergedWithoutDups.length > totalImagesAllowed) {
        mergedWithoutDups = mergedWithoutDups.slice(0, 3);
        toast.warn(
          `Selecting more than ${totalImagesAllowed} images are prohibited, hence got discarded`
        );
      }

      setFilesUpload(mergedWithoutDups);
      return;
    };

    const deleteImageIconClickHandler = (id) => {
      const filesAfterDeletion = filesUpload.filter((file) => file.name !== id);
      setFilesUpload(filesAfterDeletion);
    };

    return (
      <div className={`flex flex-col`}>
        <label
          htmlFor={id}
          className={`${
            filesUpload.length === totalImagesAllowed
              ? "cursor-not-allowed text-gray-400"
              : "cursor-pointer text-gray-700"
          } flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-50`}
        >
          <div className="mr-2">
            {filesUpload.length === 3
              ? `More than ${totalImagesAllowed} images are not allowed`
              : `${label} only ${totalImagesAllowed} allowed`}
          </div>
          <input
            type="file"
            name={id}
            id={id}
            required={isRequired}
            accept={accept}
            multiple={true}
            onChange={handleFilesUploadInputChange}
            className="sr-only"
            disabled={filesUpload.length === totalImagesAllowed ? true : false}
          />
          <AiOutlinePlusCircle
            size={30}
            color="inherit"
            className="min-w-[30px]"
          />
        </label>
        <div className="grid grid-col-1 400px:grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
          {filesUpload &&
            filesUpload.map((image) => (
              <div
                className="h-[150px] relative group cursor-pointer"
                key={image.name}
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                  className="w-[100%] h-[100%] object-cover border-[2px] border-gray-300"
                />
                <CloseButton
                  contClasses="absolute top-1 right-2 !w-[50px] group-hover:block hidden"
                  id={image.name}
                  onClickHandler={deleteImageIconClickHandler}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
);

export default React.memo(FileUpload);
