"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

// Animation variants for different entrance effects
const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
  },
  staggerChildren: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  },
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }
}

export function ScrollReveal({ 
  children, 
  animation = "fadeInUp", 
  threshold = 0.1, 
  delay = 0,
  className = "",
  once = true
}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  // Get the correct animation variant
  const variant = animations[animation] || animations.fadeInUp

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If we only want the animation to happen once
        if (once && isVisible) return
        
        // Update state when component enters viewport
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else if (!once) {
          // If we want the animation to repeat, reset visibility when out of view
          setIsVisible(false)
        }
      },
      {
        threshold, // Percentage of component visible before triggering
        rootMargin: "0px 0px -100px 0px" // Adjust when animation triggers (negative value means it triggers earlier)
      }
    )

    observer.observe(currentRef)

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [isVisible, once, threshold])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variant}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// For staggered animations (like lists or grids)
export function StaggerContainer({ children, className = "", delay = 0, threshold = 0.1 }) {
  return (
    <ScrollReveal 
      animation="staggerChildren" 
      className={className} 
      delay={delay}
      threshold={threshold}
    >
      {children}
    </ScrollReveal>
  )
}

export function StaggerItem({ children, className = "" }) {
  return (
    <motion.div variants={animations.staggerItem} className={className}>
      {children}
    </motion.div>
  )
}
