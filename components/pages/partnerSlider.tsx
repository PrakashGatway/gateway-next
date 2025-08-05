"use client"

import type React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

// Dummy logo data
const dummyLogos = [
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "Abertay University" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "Auburn University" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "Bishop Grosseteste University" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "Brunel University London" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "Caltech" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "University of Chester" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "City University London" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "Cleveland State University" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "De Montfort University Leicester" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "Drexel University" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "Imperial College London" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "University of the Incarnate Word" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "La Trobe University" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "University of Leicester" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "University of Liverpool" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "London Metropolitan University" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "Loughborough University" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "Macquarie University" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "Massachusetts Institute of Technology" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "Newcastle University" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "University of Oxford" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "University of Plymouth" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "PNW University" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "Queen's University Belfast" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "Queen Mary University of London" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "Ravensbourne University London" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "University of Roehampton London" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "University of Sheffield" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "Sonoma State University" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "The University of Manchester" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "University of Aberdeen" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "University of Birmingham" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "University of Cambridge" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "University of Cumbria" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "University of Dayton" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "University of Hertfordshire" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "University of London" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "The University of Nottingham" },
  { src: "https://www.gradding.com/_next/image?url=%2Fhomepage%2Funiversity%2FImperial-College-London.png&w=256&q=75", alt: "University of Portsmouth" },
]

interface Logo {
  src: string
  alt: string
}

interface SliderRowProps {
  logos: Logo[]
  direction: "left" | "right"
  speed: number // in seconds
}

const SliderRow: React.FC<SliderRowProps> = ({ logos, direction, speed }) => {
  const logoWidth = 150 // px
  const logoHeight = 40 // px
  const gap = 32 // px, for gap-x-8

  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos]

  // Calculate the total width of one full set of original logos plus their gaps
  const originalSetWidth = logos.length * logoWidth + (logos.length - 1) * gap

  // Keen Slider setup (primarily for ref and potential future keen-slider features)
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true, // Keen-slider's loop, though framer-motion handles the continuous animation
    renderMode: "performance",
    drag: false, // Disable keen-slider's drag as we want continuous animation
    slides: {
      perView: "auto",
      spacing: gap,
    },
  })

  return (
    <div className="relative overflow-hidden py-4">
      <div ref={sliderRef} className="keen-slider">
        <motion.div
          className="keen-slider__track flex flex-nowrap w-max gap-x-8"
          animate={{
            x: direction === "right" ? [`-${originalSetWidth}px`, "0px"] : ["0px", `-${originalSetWidth}px`],
          }}
          transition={{
            x: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: speed,
              ease: "linear",
            },
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: `${logoWidth}px`, height: `${logoHeight}px` }}
            >
              <Image
                src={logo.src || "/placeholder.svg"}
                alt={logo.alt}
                width={logoWidth}
                height={logoHeight}
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
      <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-gray-100 to-transparent backdrop-blur-[1px] pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-gray-100 to-transparent backdrop-blur-[1px] pointer-events-none z-10" />
    </div>
  )
}

export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12">
      <div className="w-full px-4">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">Our Partners</h2>
        <div className="space-y-8">
          <SliderRow logos={dummyLogos.slice(0, 20)} direction="right" speed={30} />
          <SliderRow logos={dummyLogos.slice(10, 30)} direction="left" speed={35} />
          <SliderRow logos={dummyLogos.slice(15, 30)} direction="right" speed={28} />
          <SliderRow logos={dummyLogos.slice(20, 39)} direction="left" speed={32} />
        </div>
      </div>
    </div>
  )
}
