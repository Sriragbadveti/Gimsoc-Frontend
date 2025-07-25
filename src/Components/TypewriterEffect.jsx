"use client";

import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect, useState } from "react";

export const TypewriterEffect = ({
  words,
  className = "",
  cursorClassName = "",
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={`dark:text-white text-black opacity-0 hidden ${word.className || ""}`}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    <div
      className={`text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center ${className}`}
    >
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={`inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500 ${cursorClassName}`}
      ></motion.span>
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className = "",
  cursorClassName = "",
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Combine all words into one string
  const fullText = words.map(word => word.text).join(" ");
  const colorMap = {};
  let charCount = 0;
  
  words.forEach(word => {
    const wordLength = word.text.length;
    if (word.className) {
      for (let i = 0; i < wordLength; i++) {
        colorMap[charCount + i] = word.className;
      }
    }
    charCount += wordLength + 1; // +1 for space
  });

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 80); // Smooth, consistent timing
      
      return () => clearTimeout(timer);
    } else {
      // Add a small delay before stopping the cursor
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 1200);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, fullText, isTyping]);

  // Render text with colors
  const renderColoredText = () => {
    const chars = displayText.split('');
    return chars.map((char, index) => {
      const colorClass = colorMap[index];
      return (
        <span key={index} className={colorClass || "text-white"}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className={`flex items-center justify-center my-4 ${className}`}>
      <div className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-white text-center">
        {renderColoredText()}
        {isTyping && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block w-[2px] h-4 sm:h-5 lg:h-6 bg-blue-400 ml-1"
          />
        )}
      </div>
    </div>
  );
}; 