import React from "react";
import Backdrop from "../ui/Backdrop";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";

const ActionPopup = ({
  setOpen,
  open,
  message,
  productToBeDeleted,
  executeAction,
  isDeleting,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <Backdrop>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center w-full h-[100vh]"
          >
            <div className="bg-white rounded-md shadow-sm relative top-4 p-4">
              <h1 className="text-red-500 text-[16px] font-[500] text-center">
                {message}
              </h1>
              <div className="flex justify-around mt-4">
                <Button
                  variant="contained"
                  size="large"
                  color="error"
                  sx={{ width: "8rem" }}
                  onClick={() => executeAction(productToBeDeleted)}
                  endIcon={
                    isDeleting && <CircularProgress color="inherit" size={20} />
                  }
                  disabled={isDeleting}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  sx={{ width: "8rem" }}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default ActionPopup;
