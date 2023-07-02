import { RxCross1 } from "react-icons/rx";
import { clsx } from "clsx";

export const CloseButton = ({
  setOpen,
  contClasses,
  iconClasses,
  iconSize = 40,
}) => {
  return (
    <div className={clsx("w-full text-right", contClasses)}>
      <RxCross1
        size={iconSize}
        className={clsx(
          "cursor-pointer inline-block hover:scale-110 hover:text-[red] hover:bg-gray-100 p-2 rounded-full",
          iconClasses
        )}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(false);
        }}
      />
    </div>
  );
};
