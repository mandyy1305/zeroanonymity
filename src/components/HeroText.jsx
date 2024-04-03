import React from "react";
import { motion } from "framer-motion";
const HeroText = ({ text }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03},
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 400,
      transition: {
        type: "stiff",
      },
    },
    visible: {
      opacity: 1,
      y: -5,
      transition: {
        type: "stiff",
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex" }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "0px" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default HeroText;

// import React from "react";
// import { motion } from "framer-motion";

// const HeroText = () => {
//   const textVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         delay: 0,
//         staggerChildren: 0.08,
//       },
//     },
//   };

//   const letterVariants = {
//     hidden: { opacity: 0, y: -50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         damping: 10,
//         stiffness: 100,
//       },
//     },
//   };

//   return (
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       variants={textVariants}
//       className="text-7xl"
//     >
//       {"Zero-Anonymity".split("").map((char, index) => (
//         <motion.span key={index} variants={letterVariants}>
//           {char}
//         </motion.span>
//       ))}
//     </motion.div>
//   );
// };

// export default HeroText;
