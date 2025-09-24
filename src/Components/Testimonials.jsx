import { useState } from "react"

const testimonials = [
  {
    quote: "This conference has been a fusion of synergy and networking for me.",
    author: "Toyin Dairo",
  },
  {
    quote:
      "Listening to various healthcare professionals has inspired me to approach medicine more holistically.",
    author: "Maryam Shakeel",
  },
  {
    quote:
      "MedCon has re-instilled my faith in gaining practical knowledge, especially in Europe.",
    author: "Vaishnavi Suresh",
  },
  {
    quote:
      "Through MedCon, I was introduced to multiple organizations that inspire and establish the very future of medicine. I wouldn’t miss this for the world.",
    author: "Hashim Siraj",
  },
  {
    quote:
      "Attending MedCon hasn’t just been a goal, but the next step to reshaping my practical journey. And today has proved it.",
    author: "Dr. Courtney Storm",
  },
  {
    quote:
      "It has truly been an honour to network & collaborate with so many policymakers all in one space. We’ve never gotten to witness so many changemakers & budding professionals all in one sight.",
    author: "Dr. Onyekachi Anyagwa",
  },
  {
    quote:
      "It’s like MedCon redefines the traditional prospects for healthcare professionals, I’m honoured to be an invited speaker at such a synergistic conference.",
    author: "Michael E. Hermosa",
  },
]

export default function Testimonials() {
  const [showAll, setShowAll] = useState(false)

  const visible = showAll ? testimonials : testimonials.slice(0, 5)

  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-20 bg-gradient-to-b from-gray-950/90 via-black/90 to-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Testimonials from past attendees & healthcare professionals
          </h2>
          <p className="mt-3 text-base text-gray-400">What our community says about MEDCON</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 sm:mt-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {visible.map((t, idx) => (
            <figure
              key={idx}
              className="relative rounded-2xl bg-white/5 p-6 shadow-sm ring-1 ring-white/10 transition hover:ring-indigo-500/30 hover:bg-white/7.5"
            >
              <blockquote className="text-sm leading-6 text-gray-200">
                <p>“{t.quote}”</p>
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-indigo-300">~{t.author}</figcaption>
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            </figure>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowAll((s) => !s)}
            className="rounded-md bg-gradient-to-br from-[#4aa053] to-[#1e4923] px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:opacity-90 transition"
          >
            {showAll ? "Show fewer" : "Show all testimonials"}
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute -top-10 right-10 h-40 w-40 rounded-full bg-indigo-600/20 blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-blue-600/20 blur-2xl" />
    </section>
  )
}
