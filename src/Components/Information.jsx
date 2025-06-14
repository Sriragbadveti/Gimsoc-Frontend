import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function Information() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Conference details
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Introducing innovation & highlighting immunity at its forefront,
              MEDCON’25-Outbreaks to Breakthroughs, aims to provide
              international collaborative opportunities, redefine knowledge
              enhancement with a selective set of networking lounges, enhance
              practical training by providing a plethora of academic activities,
              including both onsite & online workshops, research presentations,
              informative sessions led by experts, press conferences and various
              other engaging events.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Register
              </button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-1 lg:pt-2">
            <div className="flex items-start gap-x-4">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <CalendarDaysIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-white"
                />
              </div>
              <div>
                <dt className="text-base font-semibold text-white">
                  Date & Time
                </dt>
                <dd className="mt-1 text-base text-gray-400">
                  October 24-26, 2025 | 9:00 AM - 6:00 PM
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-x-4">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <MapPinIcon aria-hidden="true" className="h-6 w-6 text-white" />
              </div>
              <div>
                <dt className="text-base font-semibold text-white">Location</dt>
                <dd className="mt-1 text-base text-gray-400">
                  Ivane Javakhishvili Tbilisi State University (1 Ilia
                  Chavchavadze Avenue, Tbilisi 0179, Georgia) TSU Main Campus
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-1155/678 w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
    </div>
  );
}
