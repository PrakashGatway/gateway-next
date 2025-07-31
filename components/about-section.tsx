"use client"
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const AboutSection = () => {
  return (
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-center">
          <div className="relative animate-fadeInLeft">
            <Image
              src="https://www.gatewayabroadeducations.com/uploads/1707463223790-Layer%201.png"
              alt="Education Illustration"
              width={500}
              height={400}
              className="w-full h-auto rounded-2xl shadow-lg"
            />
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce-slow"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-pulse-slow"></div>
          </div>

          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-bold text-gray-900"
            >
              Who Are We?
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-gray-600 leading-relaxed"
            >
              At Gateway Abroad Education, we are a trusted Overseas education consultants dedicated to helping students achieve their dreams of pursuing overseas study. Our expert team supports you at every step, from selecting the ideal course to excelling in test preparation for crucial exams, such as the English Proficiency test like IELTS, TOEFL, GRE, PTE, GMAT, SAT and more. We're more than just educators; we're your mentors and advisors, guiding you toward success in abroad education.
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-gray-600 leading-relaxed"
            >
              Whether it's securing a study abroad scholarship, navigating the study visa process, or applying for a study loan, we are here to make your journey smoother and brighter.
            </motion.div>

             <Link href="/contact" className="btn-primary inline-block text-center group">
                <span className="relative z-10">Know More</span>
              </Link>
          </div>
        </div>
  );
};

export default AboutSection;