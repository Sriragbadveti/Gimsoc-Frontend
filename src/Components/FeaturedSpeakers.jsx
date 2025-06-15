"use client";

import { useEffect, useRef } from "react";

export default function FeaturedSpeakers() {
  const containerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;

    // Only activate the animation if there's content to scroll
    if (scrollWidth <= clientWidth) return;

    let animationId;
    let scrollPos = 0;
    const speed = 0.5; // Adjust speed as needed

    const scroll = () => {
      scrollPos += speed;

      // Reset position when we've scrolled one item
      if (scrollPos >= scrollWidth / 2) {
        scrollPos = 0;
      }

      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollPos;
      }

      animationId = requestAnimationFrame(scroll);
    };

    scroll();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Duplicate the speakers to create a seamless loop
  const speakers = [
    {
      name: "Dr. Abhishek Ray",
      title: "Gastroenterologist",
      institution: "UK",
      image: "/Abhishek.jpeg",
    },
    {
      name: " Chisomo (Mark) Kanthanga",
      title: "Microbiologist",
      institution: "Malawi Liverpool Wellcome Research Programme",
      image: "/flat.webp",
    },

    {
      name: " Annam Rafique",
      title: "Histology",
      institution: "University of Georgia",
      image: "/Anaam.jpg",
    },

    {
      name: " Salome Tasaria",
      title: "Epidemiologist and Dean of UG",
      institution: "University of Georgia",
      image: "/flat.webp",
    },

    {
      name: "Dr. Tahseen J. Siddiqui",
      title: "Board Certified in Internal Medicine & Infectious Diseases",
      institution: "IMG Unity",
      image: "/flat.webp",
    },
    {
      name: "Dr. Giorgi Derevenskikh",
      title: "Pulmonology, Internal Medicine, USA Fellowship",
      institution: "-",
      image: "/Giorgi.png",
    },
    {
      name: "Dr. Otar Chokoshvili",
      title: "-",
      institution: "Geomedi",
      image: "/flat.webp",
    },
  ];

  // Duplicate speakers for seamless scrolling
  const allSpeakers = [...speakers, ...speakers];

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
            Featured Speakers
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Learn from world-renowned medical professionals and researchers.
          </p>
        </div>

        <div className="mt-16 overflow-hidden">
          <div ref={containerRef} className="flex space-x-8 overflow-x-hidden">
            {allSpeakers.map((speaker, index) => (
              <div key={index} className="flex-none w-64">
                <div className="flex flex-col items-center">
                  <div className="w-48 h-48 rounded-full bg-gray-200 overflow-hidden mb-4">
                    <img
                      src={speaker.image || "/placeholder.svg"}
                      alt={`${speaker.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {speaker.name}
                  </h3>
                  <p className="text-sm text-gray-600">{speaker.title}</p>
                  <p className="text-sm text-gray-600">{speaker.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          
        </div>
      </div>
    </div>
  );
}
