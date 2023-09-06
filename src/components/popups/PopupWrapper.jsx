import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "../ui/Backdrop";
import { CloseButton } from "../ui/Button";

const PopupWrapper = ({ open, setOpen, children }) => {
  return (
    <AnimatePresence>
      {open && (
        <Backdrop>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center w-full h-[100vh] z-50"
          >
            <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-auto 800px:h-[75vh] bg-white rounded-md shadow-sm relative top-4 p-4 z-50">
              <CloseButton
                size={35}
                setOpen={() => setOpen(false)}
                contClasses="absolute right-3 top-3 z-50"
              />
              <div>{children}</div>
            </div>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default PopupWrapper;
