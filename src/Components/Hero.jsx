"use client";


import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"

const SplitText = ({
  text,
  className,
  delay = 0,
  duration = 1,
  staggerChildren = 0.03,
}) => {
  const characters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren, delayChildren: delay },
    }),
  };
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
  };
  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={child}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-white min-h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover sm:object-fill"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://res.cloudinary.com/dllp1nsmt/video/upload/q_auto,f_auto/v1749914669/pao7gduan5aambzppvgp.mov"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/* Video Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <Navbar />

      <div className="relative isolate px-6 pt-14 lg:px-8 z-10">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-white bg-white bg-opacity-20 backdrop-blur-sm ring-1 ring-white ring-opacity-30 hover:ring-opacity-50">
              Announcing GIMSOC's 3rd Annual International Conference{" "}
              <a href="#" className="font-semibold text-white">
                Read more →
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
              <span className="block">MEDCON'25:</span>
              <span className="block" style={{ whiteSpace: "nowrap" }}>
                <SplitText text="Outbreaks" delay={0.2} />
              </span>
              <span className="block">
                <SplitText text="to Breakthroughs" delay={0.4} />
              </span>
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-white sm:text-xl/8">
              <SplitText
                text="The premier Medical Conference for students and Healthcare professionals. This 2025, join us in reshaping the future of Infectious Disease!"
                delay={0.8}
                staggerChildren={0.01}
              />
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <motion.a
                onClick={() => navigate("/login")}
                className="rounded-md bg-gradient-to-br from-[#c43410] to-[#461307] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:opacity-90 hover:scale-105 transition-transform duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c43410] cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                Register Now
              </motion.a>

              <motion.a
                href="#"
                className="text-sm/6 font-semibold text-white px-3 py-2 rounded-md bg-gradient-to-br from-[#4aa053] to-[#1e4923] hover:opacity-90 hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.5 }}
              >
                Learn more <span aria-hidden="true">→</span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}