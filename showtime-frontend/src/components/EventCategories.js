import React from 'react';
import { ChevronRight } from "lucide-react";

const eventCategoriesData = [
  {
    id: 1,
    title: "COMEDY SHOWS",
    eventsCount: "175+",
    image: "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:r-6/comedy-shows-collection-202211140440.png",
    bgColor1: "from-blue-500",
    bgColor2: "to-indigo-600",
  },
  {
    id: 2,
    title: "AMUSEMENT PARK",
    eventsCount: "15+",
    image: "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:r-6/amusement-park-collection-202211140440.png",
    bgColor1: "from-emerald-500",
    bgColor2: "to-teal-600",
  },
  {
    id: 3,
    title: "THEATRE SHOWS",
    eventsCount: "55+",
    image: "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:r-6/theatre-shows-collection-202211140440.png",
    bgColor1: "from-rose-500",
    bgColor2: "to-red-600",
  },
  {
    id: 4,
    title: "KIDS",
    eventsCount: "15+",
    image: "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:r-6/kids-collection-202211140440.png",
    bgColor1: "from-amber-500",
    bgColor2: "to-orange-600",
  },
  {
    id: 5,
    title: "ADVENTURE & FUN",
    eventsCount: "230+",
    image: "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:r-6/adventure-fun-collection-202211140440.png",
    bgColor1: "from-purple-500",
    bgColor2: "to-fuchsia-600",
  },
];

export const EventCategories = () => {
  return (
    <section className="bg-gray-100 py-10 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 dark:text-white">The Best Of Live Events</h2>
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {eventCategoriesData.map((category) => (
              <div
                key={category.id}
                className={`relative w-full h-64 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 cursor-pointer`}
              >
                <div className={`absolute inset-0 bg-gradient-to-t ${category.bgColor1} ${category.bgColor2} opacity-80`}></div>
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                  <h3 className="text-xl font-bold leading-tight uppercase">{category.title}</h3>
                  <p className="text-sm">{category.eventsCount} Events</p>
                </div>
              </div>
            ))}
          </div>
          <button className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md focus:outline-none dark:bg-gray-800">
            <ChevronRight className="w-6 h-6 text-gray-700 dark:text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};
