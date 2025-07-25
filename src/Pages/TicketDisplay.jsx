"use client"

import { CheckIcon } from "@heroicons/react/20/solid"
import { ScrollReveal } from "../Pages/ScrollReveal"
import Navbar from "../Components/Navbar"
import { Link } from "react-router-dom" // ✅ Add this line
import LightRays from '../Components/LightRays'
import { PointerHighlight } from "../Components/PointerHighlight"

const ticketTiers = [
  {
    name: "Standard Ticket + 2",
    id: "tier-standard",
    href: "/standard-plus-2",
    price: "",
    description: "Available for GIMSOC members, non-GIMSOC members, TSU students and GEOMEDI students This ticket gives you full access to MEDCON along with 2 workshops of your choice. Ideal for delegates who want the most hands-on, interactive experience",
    features: [
      "Access to all keynote sessions",
      "Entry to 2 registered workshops",
      "Meals and refreshments",
      "Academic, research and activities fair",
      "Goodie bag with exclusive MEDCON merchandise",
      "Certificate of attendance",
      "CPD certificate",
    ],
    featured: false,
    color: "green",
  },
  
  
  {
    name: "Standard Ticket + 3",
    id: "tier-allinclusive",
    href: "/standard-plus-3",
    price: "",
    description: "Available for GIMSOC members, non-GIMSOC members, TSU students and GEOMEDI students This ticket gives you full access to MEDCON along with 3 workshops of your choice. Ideal for delegates who want the most hands-on, interactive experience",
    features: [
     "Access to all keynote sessions",
      "Entry to 3 registered workshops",
      "Meals and refreshments",
      "Academic, research and activities fair",
      "Goodie bag with exclusive MEDCON merchandise",
      "Certificate of attendance",
      "CPD certificate",
    ],
    featured: false,
    color: "purple",
  },
  
  {
    name: "Standard Ticket + 4",
    id: "tier-standard-plus-4",
    href: "/standard-plus-4",
    price: "",
    description: "Available for GIMSOC members, non-GIMSOC members, TSU students and GEOMEDI students This ticket gives you full access to MEDCON along with 4 workshops of your choice. Ideal for delegates who want the most hands-on, interactive experience",
    features: [
      "Access to all keynote sessions",
      "Entry to 4 registered workshops",
      "Meals and refreshments",
      "Academic, research and activities fair",
      "Goodie bag with exclusive MEDCON merchandise",
      "Certificate of attendance",
      "CPD certificate",
    ],
    featured: false,
    color: "teal",
  },
{
    name: "Doctor Ticket",
    id: "tier-doctor",
    href: "/doctor-ticket",
    price: "",
    description: "Ideal for international attendees joining for the core conference.",
    features: [
      "Full 3-day conference access",
      "Interactive Workshops",
      "Academic, research and activities fairs",
      "Gala Dinner",
      "Networking opportunities",
      "Certificate of attendance",
      "CPD Certification",
    ],
    featured: false,
    color: "teal",
  },
  
  
  {
    name: "International Ticket",
    id: "tier-international",
    href: "/international-ticket",
    price: "",
    description: `Experience MEDCON your way with two flexible options tailored for international attendees:\n 3-Day Package – A compact option with 2 days of conference, workshops, and a Gala Dinner\n7-Day All-Inclusive – A complete experience with full access, accommodation, transport, tours, and more\nBoth packages include:\nConference access\nInteractive workshops\nAcademic, research & activity fairs\nGala Dinner\nNetworking opportunities\nCertificate of attendance & CPD certification\nPoster presentations (7-Day only)\n7-Day Exclusives:\n7-night hotel stay (shared 2-bedroom)\nDaily venue transport\nGuided Tbilisi tour (Day 2)\nExcursion outside Tbilisi (Day 6)\n 3-Day package excludes accommodation, but hotel discount codes will be provided post-registration.`,
    features: [
      "Conference access",
      "Interactive workshops",
      "Academic, research & activity fairs",
      "Gala Dinner",
      "Networking opportunities",
      "Certificate of attendance & CPD certification",
      "Poster presentations (7-Day only)",
      "7-night hotel stay (shared 2-bedroom) [7-Day only]",
      "Daily venue transport [7-Day only]",
      "Guided Tbilisi tour (Day 2) [7-Day only]",
      "Excursion outside Tbilisi (Day 6) [7-Day only]",
      "Hotel discount codes for 3-Day package (no accommodation included)",
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
              <PointerHighlight
                rectangleClassName="bg-blue-500/20 border-blue-400/50"
                pointerClassName="text-yellow-400"
              >
                <span className="relative z-10">Choose your MEDCON'25 ticket</span>
              </PointerHighlight>
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
            Select the perfect ticket option that fits your needs and budget. Early bird pricing available for a limited
            time.
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
                <p className="mt-6 text-base leading-7 text-gray-300">{tier.description}</p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className={classNames(
                          tier.featured ? "text-blue-400" : "text-blue-300",
                          "h-6 w-5 flex-none",
                        )}
                        aria-hidden="true"
                      />
                      {feature}
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