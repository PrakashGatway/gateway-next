"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReadMoreSection() {
  const [isOpen, setIsOpen] = useState(false);

  const text = `
Gateway abroad
The Gateway to the World is a gateway that is located in the city of New York. It is
`;

  const previewText = text.split("\n\n")[0]; // First paragraph as preview

  return (
    <section className="bg-white">

    <div className="container-sm mx-auto p-8 lg:p-16">
      <h2 style={{textAlign:"center"}} className="sub-heading lg:!text-2xl mb-4">
        Top Overseas Education Consultant In Udaipur
      </h2>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.p
            key="full"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-800 overflow-hidden text-md"
          >
            {text}
          </motion.p>
        ) : (
          <motion.p
            key="preview"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-800 overflow-hidden text-md"
          >
            {previewText}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-secondary mt-4 font-semibold !py-[6px] flex items-center space-x-2"
      >
        <span>{isOpen ? "Read Less" : "Read More"}</span>
      </button>
    </div>
    </section>

  );
}
