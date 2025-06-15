"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Dialog } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import Cookies from "js-cookie"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Register for MEDCON", href: "/comingsoon" },
  {
    name: "About us",
    href: "#",
    subItems: [
      {
        name: "MEDCON'23",
        href: "/pdfs/medcon23.pdf",
        download: true,
        description: "Previous year highlights",
      },
      {
        name: "MEDCON'24",
        href: "/pdfs/medcon24.pdf",
        download: true,
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
]

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)
  const navigate = useNavigate()
  const [mobileAboutDropdownOpen, setMobileAboutDropdownOpen] = useState(false)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)
  const [isCheckingAccess, setIsCheckingAccess] = useState(false)

  useEffect(() => {
    const token = Cookies.get("token")
    setIsLoggedIn(!!token)

    const checkAccess = async () => {
      if (token) {
        setIsCheckingAccess(true)
        try {
          const res = await axios.get("http://localhost:8000/api/info/check-dashboard-access", {
            withCredentials: true,
          })
          setHasAccess(res.data.access)
        } catch (err) {
          console.error("Access check failed:", err)
          setHasAccess(false)
        } finally {
          setIsCheckingAccess(false)
        }
      } else {
        setHasAccess(false)
      }
    }

    checkAccess()
  }, [])

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/auth/logout", {}, { withCredentials: true })
      Cookies.remove("token")
      setIsLoggedIn(false)
      console.log("User logged out successfully")
      navigate("/")
    } catch (error) {
      console.error("Logout failed:", error)
      // Still remove cookie and redirect even if API call fails
      Cookies.remove("token")
      setIsLoggedIn(false)
      navigate("/")
    }
  }

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src="/medcon-logo.png" className="h-32 w-auto max-w-[280px] object-contain" />
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
                  onMouseEnter={() => {
                    clearTimeout(window.aboutDropdownTimeout)
                    setAboutDropdownOpen(true)
                  }}
                  onMouseLeave={() => {
                    window.aboutDropdownTimeout = setTimeout(() => {
                      setAboutDropdownOpen(false)
                    }, 200) // 200ms delay before closing
                  }}
                >
                  <button className="text-sm font-semibold text-white inline-flex items-center">
                    {item.name}
                    <svg
                      className="ml-1 w-4 h-4 text-gray-300"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {aboutDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      {item.subItems.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          download={subItem.download || false}
                          className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a key={item.name} href={item.href} className="text-sm font-semibold text-white">
                  {item.name}
                </a>
              ),
            )}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
            {isLoggedIn ? (
              <>
                {!isCheckingAccess ? (
                  <button
                    onClick={() => hasAccess && navigate("/attendeedashboard")}
                    disabled={!hasAccess}
                    className={`group relative text-sm font-semibold px-3 py-2 transition rounded-md ${
                      hasAccess
                        ? "text-white bg-gradient-to-br from-[#4aa053] to-[#1e4923] hover:opacity-90 cursor-pointer"
                        : "text-gray-400 bg-gray-600 cursor-not-allowed opacity-50"
                    }`}
                    title={!hasAccess ? "Dashboard access will be available after ticket booking" : ""}
                  >
                    Dashboard
                  </button>
                ) : (
                  <button
                    disabled
                    className="text-gray-300 bg-gray-500 cursor-not-allowed px-3 py-2 rounded-md text-sm font-semibold"
                  >
                    Checking Access...
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  className="group relative text-sm font-semibold text-white px-3 py-2 transition hover:bg-white hover:bg-opacity-20 rounded-md"
                >
                  Logout
                  <span className="ml-1 opacity-0 group-hover:opacity-100 transition text-gray-300">&rarr;</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="group relative text-sm font-semibold text-white px-3 py-2 transition bg-gradient-to-br from-[#4aa053] to-[#1e4923] hover:opacity-90 rounded-md"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="group relative text-sm font-semibold text-white px-3 py-2 transition bg-gradient-to-br from-[#4aa053] to-[#1e4923] hover:opacity-90 rounded-md"
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Dialog will remain same */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
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
                        <button
                          onClick={() => setMobileAboutDropdownOpen(!mobileAboutDropdownOpen)}
                          className="flex items-center justify-between w-full px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 rounded-lg"
                        >
                          <span>{item.name}</span>
                          <svg
                            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                              mobileAboutDropdownOpen ? "rotate-180" : ""
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {mobileAboutDropdownOpen && (
                          <div className="pl-4 space-y-1">
                            {item.subItems.map((subItem) => (
                              <a
                                key={subItem.name}
                                href={subItem.href}
                                download={subItem.download || false}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {subItem.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ),
                  )}
                </div>
                <div className="py-6 space-y-2">
                  {isLoggedIn ? (
                    <>
                      {!isCheckingAccess ? (
                        <button
                          onClick={() => {
                            if (hasAccess) {
                              setMobileMenuOpen(false)
                              navigate("/attendeedashboard")
                            }
                          }}
                          disabled={!hasAccess}
                          className={`-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold ${
                            hasAccess
                              ? "text-gray-900 hover:bg-gray-50 cursor-pointer"
                              : "text-gray-400 cursor-not-allowed opacity-50"
                          }`}
                          title={!hasAccess ? "Dashboard access will be available after ticket booking" : ""}
                        >
                          Dashboard
                        </button>
                      ) : (
                        <button
                          disabled
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-400 cursor-not-allowed opacity-50"
                        >
                          Checking Access...
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false)
                          handleLogout()
                        }}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false)
                          navigate("/login")
                        }}
                        className="w-full text-center rounded-lg px-3 py-2.5 text-base font-semibold text-white bg-gradient-to-br from-[#4aa053] to-[#1e4923] hover:opacity-90 transition-opacity"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false)
                          navigate("/signup")
                        }}
                        className="w-full text-center rounded-lg px-3 py-2.5 text-base font-semibold text-white bg-gradient-to-br from-[#4aa053] to-[#1e4923] hover:opacity-90 transition-opacity"
                      >
                        Signup
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  )
}

export default Navbar
