import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ControlsAlert({ message, isError, isVisible, onHide }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide();
      }, 5000); // Hide after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`text-center ${isError ? "text-danger" : "text-success"}`}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export default ControlsAlert;
