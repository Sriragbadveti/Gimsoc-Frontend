"use client";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export function PointerHighlight({
  children,
  rectangleClassName = "",
  pointerClassName = "",
  containerClassName = "",
}) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`relative w-fit mx-auto ${containerClassName}`}
      ref={containerRef}
    >
      {children}
      {dimensions.width > 0 && dimensions.height > 0 && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 0.95, originX: 0.5, originY: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className={`absolute inset-0 border-2 border-gray-800 dark:border-gray-200 rounded-lg ${rectangleClassName}`}
            initial={{
              width: 0,
              height: 0,
              borderRadius: "0px",
            }}
            whileInView={{
              width: dimensions.width + 32,
              height: dimensions.height + 24,
              borderRadius: "12px",
            }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              borderRadius: { duration: 0.8, ease: "easeOut" }
            }}
          />
          <motion.div
            className="pointer-events-none absolute"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              x: dimensions.width + 36,
              y: dimensions.height + 12,
            }}
            style={{
              rotate: -90,
            }}
            transition={{
              opacity: { duration: 0.3, ease: "easeInOut" },
              scale: { duration: 0.4, ease: "easeOut" },
              duration: 1.2,
              ease: "easeInOut",
            }}
          >
            <Pointer
              className={`h-6 w-6 text-blue-500 ${pointerClassName}`}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

const Pointer = ({ className = "", ...props }) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
    </svg>
  );
}; 