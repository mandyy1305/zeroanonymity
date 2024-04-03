import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="flex w-full h-[calc(100vh-250px)] justify-center items-center text-xl font-semibold">
      Hehe, you can’t sawri.
      <div className="flex flex-row">
        <span className="absolute bottom-6 right-[167px] lg:bottom-6 lg:right-52 text-xs lg:text-sm">
          jk here’s our email:
        </span>
        <motion.span
          className="absolute bottom-6 right-4 lg:bottom-6 lg:right-4 text-xs lg:text-sm"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          whileTap={{ opacity: 1 }}
          onTapCancel={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          zero.anonymity@gmail.com
        </motion.span>
      </div>
    </div>
  );
};

export default Contact;
