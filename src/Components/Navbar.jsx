'use client'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import axios from 'axios'

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

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/auth/logout', {}, { withCredentials: true })
      console.log('User logged out successfully')
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="/medcon-logo.png"
                className="h-32 w-auto max-w-[280px] object-contain"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
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
                  <button
                    className="text-sm font-semibold text-gray-900 inline-flex items-center"
                  >
                    {item.name}
                    <svg
                      className="ml-1 w-4 h-4 text-gray-500"
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
                  {aboutDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      {item.subItems.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a key={item.name} href={item.href} className="text-sm font-semibold text-gray-900">
                  {item.name}
                </a>
              )
            )}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
            <button
              onClick={handleLogout}
              className="group relative text-sm font-semibold text-gray-900 px-3 py-2 transition hover:bg-gray-100 rounded-md"
            >
              Sign Out
              <span className="ml-1 opacity-0 group-hover:opacity-100 transition text-gray-500">
                &rarr;
              </span>
            </button>
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
                        <span className="block px-3 py-2 text-base font-semibold text-gray-900">
                          {item.name}
                        </span>
                        {item.subItems.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    )
                  )}
                </div>
                <div className="py-6 space-y-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      navigate('/login')
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      navigate('/signup')
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Signup
                  </button>
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