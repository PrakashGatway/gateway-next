"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"


export default function CardStackGridSection({video:cards}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: false, amount: 0.2 })

  const [hasAnimated, setHasAnimated] = useState(false) // Track if mobile animation already happened
  const [showGrid, setShowGrid] = useState(false)
  const [gridCols, setGridCols] = useState(3)

  const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768

  useEffect(() => {
    const updateGridCols = () => {
      const width = window.innerWidth
      if (width < 640) return 1
      if (width < 1024) return 2
      return 3
    }
    setGridCols(updateGridCols())

    const handleResize = () => setGridCols(updateGridCols())
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const mobile = isMobile()

    if (inView) {
      if (mobile) {
        if (!hasAnimated) {
          setShowGrid(false)
          setTimeout(() => setShowGrid(true), 200)
          setHasAnimated(true)
        }
      } else {
        setShowGrid(false)
        setTimeout(() => setShowGrid(true), 200)
      }
    } else {
      if (!isMobile()) {
        setShowGrid(false)
      }
    }
  }, [inView, hasAnimated])

  const numCards = cards.length
  const cardWidth = 380
  const cardHeight = 260
  const gap = 20

  const totalGridWidth = gridCols * cardWidth + (gridCols - 1) * gap
  const totalGridHeight = Math.ceil(numCards / gridCols) * cardHeight + (Math.ceil(numCards / gridCols) - 1) * gap

  // Pre-calculate grid positions (centered)
  const gridPositions = cards.map((_, index) => {
    const col = index % gridCols
    const row = Math.floor(index / gridCols)
    const targetX = col * (cardWidth + gap) - totalGridWidth / 2 + cardWidth / 2
    const targetY = row * (cardHeight + gap) - totalGridHeight / 2 + cardHeight / 2
    return { targetX, targetY }
  })

  // Variants
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  }

  const cardVariants = {
    hidden: (index: number) => ({
      x: 0,
      y: index * 10,
      rotate: (index - numCards / 2) * 3,
      scale: 1 - (numCards - index) * 0.02,
      opacity: 1,
      zIndex: numCards - index,
    }),
    visible: (index: number) => ({
      x: gridPositions[index].targetX,
      y: gridPositions[index].targetY,
      rotate: 0,
      scale: 1,
      opacity: 1,
      zIndex: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 18,
        duration: 1.7,
      },
    }),
  }

  const currentAnimationState = showGrid ? "visible" : "hidden"

  return (
    <div className="relative min-h-screen bg-pink-100 py-20 flex flex-col items-center justify-center">
      <div className="text-center mb-12 px-4">
             <h2 className="heading bottom-divider">What Our Students Say</h2>
      </div>

      {/* Animated Cards Container */}
      <motion.div
        ref={containerRef}
        className="relative w-full flex items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate={currentAnimationState}
        style={{
          height: showGrid ? totalGridHeight : cardHeight + (numCards - 1) * 10,
          minHeight: cardHeight + (numCards - 1) * 10,
          transition: "height 0.8s ease-in-out",
        }}
      >
        {cards.map((card, index) => {
          const videoSrc = `https://www.youtube.com/embed/${card.mediaLink}?autoplay=0&rel=0&showinfo=0&modestbranding=1`

          return (
            <motion.div
              key={card._id}
              custom={index}
              variants={cardVariants}
              className="absolute rounded-xl shadow-lg overflow-hidden bg-black"
              style={{
                width: cardWidth,
                height: cardHeight,
                zIndex: showGrid ? 1 : numCards - index,
              }}
            >
              {/* Video Frame */}
              <div className="relative w-full h-full bg-black">
                <iframe
                  src={videoSrc}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full rounded-t-xl"
                />
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}