"use client"

import { CheckIcon } from "@heroicons/react/20/solid"
import { ScrollReveal } from "../Pages/ScrollReveal"
import Navbar from "../Components/Navbar"
import { Link } from "react-router-dom" // ✅ Add this line
import LightRays from '../Components/LightRays'


const ticketTiers = [
  {
    name: "Standard +2 Workshops Ticket",
    id: "tier-standard",
    href: "/standard-plus-2",
    price: "30-60 GEL",
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
    href: "/standard-plus-3",
    price: "55-75 GEL",
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
    price: "60-75 GEL",
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
    href: "/doctor-ticket",
    price: "95-135 GEL",
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
    name: "International Delegate Package",
    id: "tier-international",
    href: "/international-ticket",
    price: "100-325 USD",
    description: [
      "Tailored for international attendees",
      "Choose between 3-Day or 7-Day packages",
      "3-Day Package: 2-day conference + Gala Night",
      "7-Day All-Inclusive: Full access + accommodation",
      "Workshops and fairs",
      "Gala Night access",
      "Networking opportunities",
      "Certificate of attendance",
      "7-Day Extras: 7-night hotel stay",
      "Tbilisi tour (Day 2)",
      "Excursion (Day 6)"
    ],
    featured: false,
    color: "blue",
  },
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
        zIndex: 1
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
      <div className="relative z-50 px-6 py-24 sm:py-32 lg:px-8">

        <ScrollReveal animation="fadeInUp">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-400">Pricing</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Choose your MEDCON'25 Ticket
            </p>
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
                    ? "ring-2 ring-blue-400 scale-105 shadow-xl z-10 hover:ring-blue-300 bg-black/20 backdrop-blur-md border border-blue-400/30"
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
                      : "text-white ring-1 ring-inset ring-white/30 hover:ring-blue-400 hover:bg-blue-500/20",
                    "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 transition-all duration-300",
                  )}
                >
                  {tier.featured ? "Register Now" : "Get Started"}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}