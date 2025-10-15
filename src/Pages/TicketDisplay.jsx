"use client"

import { CheckIcon } from "@heroicons/react/20/solid"
import { ScrollReveal } from "../Pages/ScrollReveal"
import Navbar from "../Components/Navbar"
import { Link } from "react-router-dom" // ✅ Add this line
import LightRays from '../Components/LightRays'


const ticketTiers = [
  {
    name: "Online Ticket",
    id: "tier-online",
    href: "/online-ticket",
    
    description: [
      "Online access to speaker sessions",
      "Poster/oral presentations access",
      "Live streaming of keynotes",
      "Digital conference materials",
      "Certificate of attendance",
      "Access to online networking",
      "GIMSOC Member: 16 USD / 40 GEL / 1320 INR",
      "Non-GIMSOC: 18 USD / 45 GEL / 1480 INR"
    ],
    featured: false,
    color: "blue",
  },
  
  {
    name: "Basic Ticket",
    id: "tier-basic",
    href: "/soldout",
    
    description: [
      "Access to speakers and presentations",
      "Limited access to fairs and booths ",
      "Meals and refreshments",
      "Academic, research and activities fair",
      "Goodie bag with exclusive MEDCON merchandise",
      "Certificate of attendance",
      "GIMSOC Member: 30 GEL / 1000 INR",
      "Non-GIMSOC: 40 GEL / 1320 INR"
    ],
    featured: false,
    color: "orange",
  },
  
  {
    name: "Standard +2 Workshops Ticket",
    id: "tier-standard",
    href: "/soldout",
    
    description: [
      "Full MEDCON access + 2 workshops",
      "All keynote sessions",
      "2 workshops of your choice",
      "Meals and refreshments",
      "Academic, research and activities fair",
      "Goodie bag with exclusive MEDCON merchandise",
      "Certificate of attendance",
      "CPD certificate",
      "Add-on: Gala Night (+40₾)"
    ],
    featured: false,
    color: "green",
  },
  
  {
    name: "Standard +3 Workshops Ticket",
    id: "tier-allinclusive",
    href: "/soldout",
    
    description: [
      "Full MEDCON access + 3 workshops",
      "All keynote sessions",
      "3 workshops of your choice",
      "Meals and refreshments",
      "Academic, research and activities fair",
      "Goodie bag with exclusive MEDCON merchandise",
      "Certificate of attendance",
      "CPD certificate",
      "Add-on: Gala Night (+40₾)"
    ],
    featured: false,
    color: "purple",
  },
  
  {
    name: "Standard +4 Workshops Ticket",
    id: "tier-standard-plus-4",
    href: "/standard-plus-4",
    
    description: [
      "Full MEDCON access + 4 workshops",
      "All keynote sessions",
      "4 workshops of your choice",
      "Meals and refreshments",
      "Academic, research and activities fair",
      "Goodie bag with exclusive MEDCON merchandise",
      "Certificate of attendance",
      "CPD certificate",
      "Add-on: Gala Night (+40₾)"
    ],
    featured: false,
    color: "teal",
  },
  {
    name: "Doctor Ticket",
    id: "tier-doctor",
    href: "/soldout",
    
    description: [
      "Academic-focused access for medical professionals",
      "Full conference access",
      "All keynote sessions",
      "Meals and refreshments",
      "Academic, research and activities fair",
      "Goodie bag with exclusive MEDCON merchandise",
      "Certificate of attendance",
      "CPD certificate"
    ],
    featured: false,
    color: "teal",
  },
  
  {
    name: "Gala Add-On Ticket",
    id: "tier-gala",
    href: "/gala-addon",
    
    description: [
      "Exclusive access to Gala Dinner",
      "Premium dining experience",
      "Networking opportunities",
      "Entertainment and performances",
      "Certificate of attendance",
      "Price: 40 GEL"
    ],
    featured: false,
    color: "gold",
  },
  
  // {
  //   name: "International Delegate Package",
  //   id: "tier-international",
  //   href: "/international-ticket",
  //   
  //   description: [
  //     "Tailored for international attendees",
  //     "Choose between 3-Day or 7-Day packages",
  //     "3-Day Package: 2-day conference + Gala Night",
  //     "7-Day All-Inclusive: Full access + accommodation",
  //     "7-Day Extras: 7-night hotel stay , Tbilisi tour (Day 2) , Excursion (Day 6)",
  //     "Perks of both packages :",
  //     "Workshops and fairs",
  //     "Gala Night access",
  //     "Networking opportunities",
  //     "Certificate of attendance",
  //     
  //     
  //   ],
  //   featured: false,
  //   color: "blue",
  // },
];



function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Tickets() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <Navbar textColor="white" />

      {/* Light Rays Background */}
      <div style={{ 
        width: '100%', 
        height: '100vh', 
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0
      }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={3.0}
          lightSpread={2.0}
          rayLength={3.0}
          pulsating={true}
          fadeDistance={1.5}
          saturation={1.6}
          followMouse={true}
          mouseInfluence={0.4}
          noiseAmount={0.0}
          distortion={0.0}
          className="tickets-light-rays"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 py-24 sm:py-32 lg:px-8">

        <ScrollReveal animation="fadeInUp">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-400">Pricing</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Choose your MEDCON'25 Ticket
            </p>
            
            {/* Animated "Hurry up" message */}
            <div className="mt-6 mb-4">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 rounded-full backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-red-300 font-semibold text-lg animate-pulse">
                    ⚡ Hurry up, Only few tickets left! ⚡
                  </span>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
            Select the perfect ticket option that fits your needs and budget. 
          </p>
        </ScrollReveal>

        <div className="mx-auto mt-16 grid max-w-lg gap-8 lg:max-w-7xl lg:grid-cols-3 xl:grid-cols-5">
          {ticketTiers.map((tier, index) => (
            <ScrollReveal key={tier.id} animation="fadeInUp" delay={0.1 * (index + 1)}>
              <div
                className={classNames(
                  tier.featured
                    ? "ring-2 ring-blue-400 scale-105 shadow-xl hover:ring-blue-300 bg-black/20 backdrop-blur-md border border-blue-400/30"
                    : "ring-1 ring-white/20 hover:ring-2 hover:ring-blue-400 bg-black/10 backdrop-blur-md border border-white/20",
                  "rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                )}
              >
                <h3
                  id={tier.id}
                  className={classNames(
                    tier.featured ? "text-blue-400" : "text-white",
                    "text-lg font-semibold leading-8",
                  )}
                >
                  {tier.name}
                </h3>
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-4xl font-bold tracking-tight text-white">{tier.price}</span>
                </p>
                <ul className="mt-6 space-y-2 text-sm leading-6 text-gray-300">
                  {tier.description.map((item, index) => (
                    <li key={index} className="flex gap-x-3">
                      <CheckIcon
                        className={classNames(
                          tier.featured ? "text-blue-400" : "text-blue-300",
                          "h-5 w-5 flex-none"
                        )}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to={tier.href}
                  aria-describedby={tier.id}
                  className={classNames(
                    tier.featured
                      ? "bg-blue-500 text-black shadow-sm hover:bg-blue-400 font-bold"
                      : tier.color === "gold"
                      ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-black shadow-sm hover:from-yellow-400 hover:to-amber-400 font-bold"
                      : "text-white ring-1 ring-inset ring-white/30 hover:ring-blue-400 hover:bg-blue-500/20",
                    "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 transition-all duration-300",
                  )}
                >
                  {tier.featured ? "Register Now" : tier.color === "gold" ? "Book Gala Access" : "Get Started"}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}