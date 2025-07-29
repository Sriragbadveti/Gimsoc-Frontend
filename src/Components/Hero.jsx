"use client"

import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar"

const SplitText = ({ text, className, delay = 0, duration = 1, staggerChildren = 0.03 }) => {
  const characters = Array.from(text)
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren, delayChildren: delay },
    }),
  }
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 200, duration },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: { type: "spring", damping: 12, stiffness: 200, duration },
    },
  }
  return (
    <motion.span className={className} variants={container} initial="hidden" animate="visible" aria-label={text}>
      {characters.map((char, index) => (
        <motion.span key={`${char}-${index}`} variants={child} style={{ display: "inline-block", whiteSpace: "pre" }}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function Hero() {
  const navigate = useNavigate()

  return (
    <div className="relative bg-black min-h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source
            src={`https://res.cloudinary.com/dllp1nsmt/video/upload/q_auto,f_auto/v1749914669/pao7gduan5aambzppvgp.mov?t=${Date.now()}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/* Video Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <Navbar />

      <div className="relative isolate px-6 pt-20 sm:pt-14 lg:px-8 z-10">
        <div className="mx-auto max-w-6xl py-16 px-4 sm:py-32 lg:py-40 sm:px-0">
          <div className="hidden sm:mb-6 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-xs sm:text-sm text-white bg-white bg-opacity-20 backdrop-blur-sm ring-1 ring-white ring-opacity-30 hover:ring-opacity-50 text-center">
              <span className="whitespace-nowrap">Announcing GIMSOC's 3rd Annual International Conference</span>{" "}
              <a href="/learnmore" className="font-semibold text-white whitespace-nowrap">
                Read more →
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white leading-tight break-words">
              <SplitText text="MEDCON'25" delay={0.2} />
            </h1>
            <div className="mt-6 sm:mt-8 px-2 sm:px-2">
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium text-white leading-relaxed max-w-4xl mx-auto tracking-wider break-words">
                <div className="block">
                  <SplitText text="OUTBREAKS TO BREAKTHROUGHS" delay={0.8} staggerChildren={0.02} />
                </div>
              </div>
            </div>
            <div className="mt-8 sm:mt-10 px-4 sm:px-2">
              <div className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-white leading-relaxed max-w-2xl mx-auto break-words hyphens-auto">
                <div className="block mb-2">
                  <span className="inline-block">
                    <SplitText
                      text="The premier Medical Conference for students and Healthcare professionals."
                      delay={1.2}
                      staggerChildren={0.01}
                    />
                  </span>
                </div>
                <div className="block">
                  <span className="inline-block">
                    <SplitText
                      text="This 2025, join us in reshaping the future of Infectious Diseases!"
                      delay={1.4}
                      staggerChildren={0.01}
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-3">
              <motion.button
                onClick={() => navigate("/comingsoon")}
                className="w-full sm:w-auto rounded-md bg-gradient-to-br from-[#c43410] to-[#461307] px-6 py-3 text-sm font-semibold text-white shadow-xs hover:opacity-90 hover:scale-105 transition-transform duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c43410] cursor-pointer whitespace-nowrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              >
                Register Now
              </motion.button>

              <motion.button
                onClick={() => (window.location.href = "/learnmore")}
                className="w-full sm:w-auto text-sm font-semibold text-white px-6 py-3 rounded-md bg-gradient-to-br from-[#4aa053] to-[#1e4923] hover:opacity-90 hover:scale-105 transition-transform duration-300 whitespace-nowrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0, duration: 0.5 }}
              >
                Learn more <span aria-hidden="true">→</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
