"use client";

import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios"
const navigation = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/attendeedashboard" },
  { name: "Register for MEDCON", href: "/tickets" },
  {
    name: "About us",
    href: "#",
    subItems: [
      {
        name: "MEDCON'23",
        href: "/medcon2024",
        description: "Previous year highlights",
      },
      {
        name: "MEDCON'24",
        href: "/medcon2023",
        description: "Past conference details",
      },
      {
        name: "Details About Us",
        href: "/about-details",
        description: "Our mission and vision",
      },
    ],
  },
  { name: "Abstract Submission", href: "/abstract" },
];

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);

    const checkAccess = async () => {
      try {
        const res = await axios.get(
          "https://gimsoc-backend.onrender.com/api/info/check-dashboard-access",
          {
            withCredentials: true,
          }
        );
        setHasAccess(res.data.access);
      } catch (err) {
        console.error("Access check failed:", err);
        setHasAccess(false);
      }
    };

    if (token) checkAccess();
  }, []);

  return (
    <div className="relative bg-white min-h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://res.cloudinary.com/dllp1nsmt/video/upload/q_auto,f_auto/v1749914669/pao7gduan5aambzppvgp.mov"
            type="video/mp4"
          />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>

        {/* Video Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt="MEDCON'25 Logo"
                src="/medcon-logo.png"
                className="h-32 w-auto max-w-[280px] object-contain"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) =>
              item.subItems ? (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setAboutDropdownOpen(true)}
                  onMouseLeave={() => setAboutDropdownOpen(false)}
                >
                  <button className="text-sm/6 font-semibold text-white inline-flex items-center hover:text-gray-200 transition-colors">
                    {item.name}
                    <svg
                      className={`ml-1 w-4 h-4 text-gray-300 transition-transform duration-200 ${
                        aboutDropdownOpen ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    className={`absolute left-0 mt-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-200 ${
                      aboutDropdownOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
                    onMouseEnter={() => setAboutDropdownOpen(true)}
                    onMouseLeave={() => setAboutDropdownOpen(false)}
                  >
                    <div className="py-2">
                      {item.subItems.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors group"
                          onClick={() => setAboutDropdownOpen(false)}
                        >
                          <div className="font-medium">{subItem.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {subItem.description}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm/6 font-semibold text-white hover:text-gray-200 transition-colors"
                >
                  {item.name}
                </a>
              )
            )}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
            {isLoggedIn ? (
              <button
                onClick={() => navigate("/attendeedashboard")}
                className="group relative text-sm/6 font-semibold text-white px-3 py-2 transition hover:bg-white hover:bg-opacity-20 rounded-md"
              >
                Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="group relative text-sm/6 font-semibold text-white px-3 py-2 transition bg-gradient-to-br from-[#4aa053] to-[#1e4923] hover:opacity-90 rounded-md"
                >
                  Log in
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="group relative text-sm/6 font-semibold text-white px-3 py-2 transition bg-gradient-to-br from-[#4aa053] to-[#1e4923] hover:opacity-90 rounded-md"
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </nav>

        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) =>
                    item.subItems ? (
                      <div key={item.name} className="space-y-1">
                        <span className="block px-3 py-2 text-base/7 font-semibold text-gray-900">
                          {item.name}
                        </span>
                        <div className="ml-4 space-y-1">
                          {item.subItems.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <div className="font-medium">{subItem.name}</div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                {subItem.description}
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    )
                  )}
                </div>
                {isLoggedIn ? (
                  hasAccess ? (
                    <button
                      onClick={() => navigate("/attendeedashboard")}
                      className="group relative text-sm/6 font-semibold text-white px-3 py-2 transition hover:bg-white hover:bg-opacity-20 rounded-md"
                    >
                      Dashboard
                    </button>
                  ) : (
                    <button
                      disabled
                      className="group relative text-sm/6 font-semibold text-gray-400 px-3 py-2 transition rounded-md cursor-not-allowed"
                      title="Dashboard access will be available after ticket booking"
                    >
                      Dashboard (Coming Soon)
                    </button>
                  )
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/login")}
                      className="group relative text-sm/6 font-semibold text-white px-3 py-2 transition bg-gradient-to-br from-[#4aa053] to-[#1e4923] hover:opacity-90 rounded-md"
                    >
                      Log in
                    </button>
                    <button
                      onClick={() => navigate("/signup")}
                      className="group relative text-sm/6 font-semibold text-white px-3 py-2 transition bg-gradient-to-br from-[#4aa053] to-[#1e4923] hover:opacity-90 rounded-md"
                    >
                      Signup
                    </button>
                  </>
                )}
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

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
