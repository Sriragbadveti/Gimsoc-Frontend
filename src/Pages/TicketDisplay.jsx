"use client"

import { CheckIcon } from "@heroicons/react/20/solid"
import { ScrollReveal } from "../Pages/ScrollReveal"
import Navbar from "../Components/Navbar"
import { Link, useNavigate } from "react-router-dom" // ✅ Add this line
import Cookies from "js-cookie"

const ticketTiers = [
  {
    name: "Standard Ticket + 2",
    id: "tier-standard",
    href: "/standard-plus-2",
    price: "",
    description: "Available for GIMSOC members and non-GIMSOC participants.",
    features: [
      "Access to all keynote sessions",
      "Workshops (requires separate registration)",
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
    description: "Includes everything in the Standard Ticket, plus exclusive gala access.",
    features: [
      "All Standard Ticket benefits",
      "Gala Dinner access",
      "Formal evening celebration",
      "Live entertainment",
      "Buffet Dinner",
      "Networking with speakers and delegates",
    ],
    featured: false,
    color: "purple",
  },
  
  {
    name: "Standard Ticket + 4",
    id: "tier-international3",
    href: "/standard-plus-4",
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
    name: "Doctor Ticket",
    id: "tier-international3",
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
    id: "tier-doctor",
    href: "/international-ticket",
    price: "",
    description: "Exclusive category for licensed medical doctors.",
    features: [
      "Access to all keynote sessions",
      "Meals and refreshments",
      "Academic, activity and research fairs",
      "Gala Dinner",
      "Goodie bag with exclusive MEDCON merchandise",
      "Certificate of attendance",
      "CPD certification",
    ],
    featured: false,
    color: "red",
  },
];



function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Tickets() {
  const navigate = useNavigate()
  const handleTicketClick = (href) => {
    const token = Cookies.get("token")
    if (token) {
      navigate(href)
    } else {
      navigate("/login")
    }
  }
  return (
    <div className="bg-white">
      <Navbar textColor="black" />

      <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        {/* Background gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        <ScrollReveal animation="fadeInUp">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Choose your MEDCON'25 ticket
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
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
                    ? "ring-2 ring-indigo-600 scale-105 shadow-xl z-10 hover:ring-purple-500"
                    : "ring-1 ring-gray-200 hover:ring-2 hover:ring-purple-500",
                  "rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                )}
              >
                <h3
                  id={tier.id}
                  className={classNames(
                    tier.featured ? "text-indigo-600" : `text-${tier.color}-600`,
                    "text-lg font-semibold leading-8",
                  )}
                >
                  {tier.name}
                </h3>
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price}</span>
                </p>
                <p className="mt-6 text-base leading-7 text-gray-600">{tier.description}</p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className={classNames(
                          tier.featured ? "text-indigo-600" : `text-${tier.color}-500`,
                          "h-6 w-5 flex-none",
                        )}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleTicketClick(tier.href)}
                  aria-describedby={tier.id}
                  className={classNames(
                    tier.featured
                      ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500"
                      : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                    "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                  )}
                >
                  {tier.featured ? "Register Now" : "Get Started"}
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        
      </div>
    </div>
  )
}