"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReadMoreSection() {
  const [isOpen, setIsOpen] = useState(false);

  const text = `
In the heart of Udaipur, YES Germany stands as the premier overseas education consultant, 
setting itself apart through unparalleled dedication and expertise. With a deep understanding 
of the intricacies of the German education landscape, YES Germany offers students a pathway 
to academic excellence. Their team of seasoned consultants provides personalized guidance, 
ensuring that each student makes informed choices tailored to their unique aspirations.From aiding in university selection to navigating the visa process, YES Germany's commitment 
to student success shines. Their impressive track record of placing students in esteemed 
German institutions underscores their unmatched proficiency, making them the preferred choice 
for Udaipur's ambitious minds seeking to study in Germany.If you are a student in Udaipur who is serious about studying abroad, contact YES Germany 
today to schedule a free consultation. We will help you develop a plan to achieve your goals 
and make your study abroad dreams a reality.in the heart of Udaipur, YES Germany stands as the premier overseas education consultant, 
setting itself apart through unparalleled dedication and expertise. With a deep understanding 
of the intricacies of the German education landscape, YES Germany offers students a pathway 
to academic excellence. Their team of seasoned consultants provides personalized guidance, 
ensuring that each student makes informed choices tailored to their unique aspirations.From aiding in university selection to navigating the visa process, YES Germany's commitment 
to student success shines. Their impressive track record of placing students in esteemed 
German institutions underscores their unmatched proficiency, making them the preferred choice 
for Udaipur's ambitious minds seeking to study in Germany.If you are a student in Udaipur who is serious about studying abroad, contact YES Germany 
today to schedule a free consultation. We will help you develop a plan to achieve your goals 
and make your study abroad dreams a reality.In the heart of Udaipur, YES Germany stands as the premier overseas education consultant, 
setting itself apart through unparalleled dedication and expertise. With a deep understanding 
of the intricacies of the German education landscape, YES Germany offers students a pathway 
to academic excellence. Their team of seasoned consultants provides personalized guidance, 
ensuring that each student makes informed choices tailored to their unique aspirations.From aiding in university selection to navigating the visa process, YES Germany's commitment 
to student success shines. Their impressive track record of placing students in esteemed 
German institutions underscores their unmatched proficiency, making them the preferred choice 
for Udaipur's ambitious minds seeking to study in Germany.

If you are a student in Udaipur who is serious about studying abroad, contact YES Germany 
today to schedule a free consultation. We will help you develop a plan to achieve your goals 
and make your study abroad dreams a reality.In the heart of Udaipur, YES Germany stands as the premier overseas education consultant, 
setting itself apart through unparalleled dedication and expertise. With a deep understanding 
of the intricacies of the German education landscape, YES Germany offers students a pathway 
to academic excellence. Their team of seasoned consultants provides personalized guidance, 
ensuring that each student makes informed choices tailored to their unique aspirations.

From aiding in university selection to navigating the visa process, YES Germany's commitment 
to student success shines. Their impressive track record of placing students in esteemed 
German institutions underscores their unmatched proficiency, making them the preferred choice 
for Udaipur's ambitious minds seeking to study in Germany.

If you are a student in Udaipur who is serious about studying abroad, contact YES Germany 
today to schedule a free consultation. We will help you develop a plan to achieve your goals 
and make your study abroad dreams a reality.In the heart of Udaipur, YES Germany stands as the premier overseas education consultant, 
setting itself apart through unparalleled dedication and expertise. With a deep understanding 
of the intricacies of the German education landscape, YES Germany offers students a pathway 
to academic excellence. Their team of seasoned consultants provides personalized guidance, 
ensuring that each student makes informed choices tailored to their unique aspirations.

From aiding in university selection to navigating the visa process, YES Germany's commitment 
to student success shines. Their impressive track record of placing students in esteemed 
German institutions underscores their unmatched proficiency, making them the preferred choice 
for Udaipur's ambitious minds seeking to study in Germany.

If you are a student in Udaipur who is serious about studying abroad, contact YES Germany 
today to schedule a free consultation. We will help you develop a plan to achieve your goals 
and make your study abroad dreams a reality.In the heart of Udaipur, YES Germany stands as the premier overseas education consultant, 
setting itself apart through unparalleled dedication and expertise. With a deep understanding 
of the intricacies of the German education landscape, YES Germany offers students a pathway 
to academic excellence. Their team of seasoned consultants provides personalized guidance, 
ensuring that each student makes informed choices tailored to their unique aspirations.

From aiding in university selection to navigating the visa process, YES Germany's commitment 
to student success shines. Their impressive track record of placing students in esteemed 
German institutions underscores their unmatched proficiency, making them the preferred choice 
for Udaipur's ambitious minds seeking to study in Germany.

If you are a student in Udaipur who is serious about studying abroad, contact YES Germany 
today to schedule a free consultation. We will help you develop a plan to achieve your goals 
and make your study abroad dreams a reality.

`;

  const previewText = text.split("\n\n")[0]; // First paragraph as preview

  return (
    <section className="bg-[#F4DFEF]">

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
