import React from "react";
import { motion } from "framer-motion";

const Backdrop = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10"
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
