"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

interface CardData {
  id: string
  title: string
  content: string
}

// Generate dummy card data
const cards: CardData[] = Array.from({ length: 6 }, (_, i) => ({
  id: `card-${i + 1}`,
  title: `Feature ${i + 1}`,
  content: `Discover the power of feature ${i + 1} and how it can transform your workflow.`,
}))

export default function CardStackGridSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: false, amount: 0.3 })
  const [showGrid, setShowGrid] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (inView) {
      setShowGrid(false) // Start in stacked state
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current) // Clear any previous timeout
      }
      timeoutRef.current = setTimeout(() => {
        setShowGrid(true) // After delay, transition to grid
      }, 200) // 1 second delay for a smoother transition
    } else {
      // When leaving view, reset to stacked state and clear any pending transition
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      setShowGrid(false) // Always reset to stacked when out of view
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [inView]) // Re-run effect when inView status changes

  const numCards = cards.length

  // Define grid dimensions and card sizes
  const cardWidth = 300
  const cardHeight = 350
  const gap = 20
  const gridCols = 3 // Fixed for now, can be made responsive later

  // Calculate total grid dimensions for centering
  const totalGridWidth = gridCols * cardWidth + (gridCols - 1) * gap
  const totalGridHeight = Math.ceil(numCards / gridCols) * cardHeight + (Math.ceil(numCards / gridCols) - 1) * gap

  // Pre-calculate target grid positions for each card
  const gridPositions = cards.map((_, index) => {
    const col = index % gridCols
    const row = Math.floor(index / gridCols)
    // Calculate target grid position relative to the center of the inner container
    const targetX = col * (cardWidth + gap) - totalGridWidth / 2 + cardWidth / 2
    const targetY = row * (cardHeight + gap) - totalGridHeight / 2 + cardHeight / 2
    return { targetX, targetY }
  })

  // Variants for the parent container to stagger child animations
  const containerVariants = {
    hidden: { opacity: 1 }, // Keep container visible even if cards are stacked
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Each child animates with a 0.05 second delay after the previous one
      },
    },
  }

  // Variants for individual cards
  const cardVariants = {
    hidden: (index: number) => ({
      x: 0,
      y: index * 10, // Stack downwards with a larger offset
      rotate: (index - numCards / 2) * 2, // Rotate around the center of the stack
      scale: 1 - (numCards - index) * 0.02, // Smaller cards at the bottom of the stack
      opacity: 1, // Cards are fully visible in the stacked state
      zIndex: numCards - index, // Z-index for stacking order
    }),
    visible: (index: number) => ({
      x: gridPositions[index].targetX,
      y: gridPositions[index].targetY,
      rotate: 0,
      scale: 1,
      opacity: 1,
      zIndex: 1, // Final Z-index for grid
      transition: {
        type: "spring", // Smooth spring animation
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    }),
  }

  // Determine the current animation state based on `showGrid`
  const currentAnimationState = showGrid ? "visible" : "hidden"

  return (
    <div className="relative min-h-screen bg-gray-50 py-20 flex flex-col items-center justify-center">
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Unlock Your Potential</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our powerful features designed to streamline your workflow and boost productivity.
        </p>
      </div>

      {/* Container for the cards, which will trigger the animation */}
      <motion.div
        ref={containerRef}
        className="relative w-full flex items-center justify-center"
        variants={containerVariants}
        initial="hidden" // Always start from the 'hidden' (stacked) state
        animate={currentAnimationState} // Animate based on the `showGrid` state
        // Dynamic height for the container to accommodate the grid layout
        style={{
          height: showGrid ? totalGridHeight : cardHeight + (numCards - 1) * 10, // Adjust height based on state
          minHeight: cardHeight + (numCards - 1) * 10, // Ensure minimum height for the stack
          transition: "height 0.8s ease-in-out", // Smooth height transition
        }}
      >
        {cards.map((card, index) => {
          return (
            <motion.div
              key={card.id}
              className="absolute rounded-lg shadow-lg bg-white"
              style={{ width: cardWidth, height: cardHeight }} // Use calculated dimensions
              custom={index} // Pass index as custom prop to variants
              variants={cardVariants}
            >
              <Card className="w-full h-full flex flex-col justify-between p-4">
                <div className="text-lg font-semibold">{card.title}</div>
                <div className="text-sm text-gray-600">{card.content}</div>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
