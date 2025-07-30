"use client";

import { useCallback } from "react"; // Removed unused useEffect
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

// --- Data remains the same ---
const students = [
  { name: "Bhanu", score: "GRE 332", image: "https://www.gatewayabroadeducations.com/uploads/1712850215181-Ananya%20  (8).png", content: "Top GRE performer." },
  { name: "Nikhil", score: "GRE 340", image: "https://www.gatewayabroadeducations.com/uploads/1712850215181-Ananya%20  (8).png", content: "Highest scorer." },
  { name: "Ramesh", score: "GRE 325", image: "https://www.gatewayabroadeducations.com/uploads/1712850215181-Ananya%20  (8).png", content: "Consistent achiever." }
];

const scores = [
  "Mohit SAT 1540", "Nikita SAT 1500", "Priyanshi SAT 1510", "Yatti SAT 1490",
  "Adi_Khandelwal TOEFL 105", "Nishtha_Choudhary TOEFL 112", "Prashant_Soni TOEFL 108",
  "Ritika_Sharma TOEFL 107", "Vikas TOEFL 110", "Abhinandan Singh GMAT 710",
  "Khush GMAT 780", "Nikhil GMAT 770", "Sidharth GMAT 785", "Gloriya GRE 320",
  "Ramesh GRE 325", "Kamayani IELTS 8.5", "Mariyam IELTS 8.5", "Prabhat IELTS 7.5",
  "Purva IELTS 7.5", "Sakshi IELTS 8.5", "Anchal PTE 76", "Anshul PTE 76"
];
// --- End Data ---

export default function StudentInfoSection() {
  // Image carousel with autoplay and hover controls
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 2000, stopOnInteraction: false })
  ]);

  const pauseCarousel = useCallback(() => {
    emblaApi?.plugins()?.autoplay?.stop();
  }, [emblaApi]);

  const resumeCarousel = useCallback(() => {
    emblaApi?.plugins()?.autoplay?.play();
  }, [emblaApi]);

  // Score slider animation controls (variants remain the same)
  const topSliderVariants = {
    animate: {
      x: ["0%", "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          duration: 40,
          ease: "linear"
        }
      }
    }
  };

  const bottomSliderVariants = {
    animate: {
      x: ["-100%", "0%"],
      transition: {
        x: {
          repeat: Infinity,
          duration: 40,
          ease: "linear"
        }
      }
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-purple-100 to-pink-100">
      {/* Top Section - Made Responsive */}
      <section className="py-16 pb-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 sm:gap-10 items-center">
        {/* Student Info & Carousel */}
        <div>
          <h3 className="text-center font-medium sm:font-semibold text-base sm:text-lg leading-relaxed px-2">
            Established in <span className="bg-red-600 text-white px-2 py-0.5 sm:px-2 sm:py-1 rounded text-sm sm:text-base">2009</span>, this institute is a leader in preparing students for standardized tests like GMAT, GRE, SAT, TOEFL, IELTS, and PTE.
          </h3>

          <div
            className="relative mt-6 overflow-hidden"
            ref={emblaRef}
            onMouseEnter={pauseCarousel}
            onMouseLeave={resumeCarousel}
          >
            <div className="flex">
              {students.map((s, i) => (
                <div key={i} className="flex-[0_0_100%] text-center min-w-0 px-2 sm:px-4">
                  {/* Responsive Image Size */}
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 mx-auto">
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      className="object-cover rounded-full border-4 border-white shadow-lg"
                      sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 224px, 240px"
                      priority={i === 0}
                    />
                  </div>
                  {/* Responsive Name/Score Display */}
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mt-4 flex-wrap">
                    <h5 className="font-bold text-base sm:text-lg">{s.name}</h5>
                    <div className="text-center bg-purple-700 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-lg shadow-md">
                      <p className="text-[10px] sm:text-xs uppercase tracking-wide">{s.score.split(" ")[0]} Score</p>
                      <h5 className="font-bold text-base sm:text-lg">{s.score.split(" ")[1]}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Register Form - Made Responsive */}
        <div className="bg-white p-4 sm:p-5 md:p-6 rounded-2xl shadow-xl w-full">
          <h3 className="text-center text-lg sm:text-xl font-bold mb-4 uppercase tracking-wider">Register Now</h3>
          <form className="flex flex-col gap-3 sm:gap-4">
            <input className="border p-2 sm:p-2.5 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm sm:text-base" placeholder="Name" />
            <input className="border p-2 sm:p-2.5 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm sm:text-base" placeholder="Email" type="email" />
            <input className="border p-2 sm:p-2.5 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm sm:text-base" placeholder="Phone" type="tel" />
            <select className="border p-2 sm:p-2.5 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm sm:text-base">
              <option value="">Test Preparation</option>
              <option value="GMAT">GMAT</option>
              <option value="GRE">GRE</option>
              <option value="SAT">SAT</option>
              <option value="TOEFL">TOEFL</option>
              <option value="IELTS">IELTS</option>
              <option value="PTE">PTE</option>
            </select>
            <textarea className="border p-2 sm:p-2.5 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm sm:text-base" placeholder="Message" rows={3}></textarea>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white py-2 sm:py-2.5 rounded-lg font-bold transition-colors duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </section>

      {/* Score Sliders Section - Made Responsive */}
      <div className="">
        {/* Top Slider (Red) */}
        <section className="relative bg-[#D82C2C] text-white overflow-hidden py-1.5 sm:py-2">
          {/* Responsive Badge */}
          <div className="absolute top-0 left-0 z-10 bg-black text-white px-3 py-0.5 sm:px-4 sm:py-1 font-bold text-xs sm:text-sm rounded-br-lg rounded-tl-none rounded-tr-none rounded-bl-none">
            Since 2009
          </div>

          <div className="w-full overflow-hidden pl-[72px] sm:pl-24"> {/* Adjust pl based on badge width */}
            <motion.div
              className="flex whitespace-nowrap"
              variants={topSliderVariants}
              animate="animate"
              // Note: Hover pause logic simplified or removed for clarity/focus on responsiveness
            >
              {[...scores, ...scores].map((s, i) => (
                <div key={`top-${i}`} className="px-2 sm:px-4 flex items-center">
                  <span className="font-medium text-xs sm:text-sm">{s}</span>
                  {i < scores.length * 2 - 1 && <span className="mx-1 sm:mx-2 text-xs">|</span>}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Bottom Slider (Blue) */}
        <section className="relative bg-[#1E40AF] text-white overflow-hidden py-1.5 sm:py-2">
          <div className="w-full overflow-hidden">
            <motion.div
              className="flex whitespace-nowrap"
              variants={bottomSliderVariants}
              animate="animate"
              // Note: Hover pause logic simplified or removed for clarity/focus on responsiveness
            >
              {[...scores, ...scores].map((s, i) => (
                <div key={`bottom-${i}`} className="px-2 sm:px-4 flex items-center">
                  <span className="font-medium text-xs sm:text-sm">{s}</span>
                  {i < scores.length * 2 - 1 && <span className="mx-1 sm:mx-2 text-xs">|</span>}
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}