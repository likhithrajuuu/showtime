import React, { useState } from "react";
import { ChevronUp, ChevronDown, ChevronRight } from "lucide-react";

export const MoviesPage = ({ location = "Location" }) => {
  const [showLanguages, setShowLanguages] = useState(true);
  const [showGenres, setShowGenres] = useState(false);
  const [showFormats, setShowFormats] = useState(false);

  const languages = [
    "English", "Kannada", "Hindi", "Tamil", "Telugu",
    "Malayalam", "Gujarati", "Japanese", "Punjabi", "Tulu",
  ];

  const genres = [
    "Drama", "Comedy", "Action", "Horror", "Thriller", "Romantic",
    "Adventure", "Crime", "Mystery", "Fantasy", "Period", "War",
    "Adult", "Musical", "Animation", "Devotional", "Suspense",
    "Psychological", "Social",
  ];

  const formats = [
    "2D", "3D", "4DX", "IMAX 3D", "3D Screen X", "IMAX 2D", "ICE 3D",
  ];

  return (
    <div className="bg-gray-100 dark:bg-bgDark min-h-screen py-8 px-6">
      <div className="container mx-auto flex gap-8">
        <aside className="w-1/4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-textLight mb-6">
            Filters
          </h2>

          <div className="bg-white dark:bg-footerBg rounded-lg shadow mb-4">
            <div className="flex justify-between items-center px-4 py-3">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowLanguages(!showLanguages)}
              >
                {showLanguages ? <ChevronUp /> : <ChevronDown />}
                <h3
                  className={`text-lg font-semibold ${
                    showLanguages
                      ? "text-primary"
                      : "text-gray-600 dark:text-footerText"
                  }`}
                >
                  Languages
                </h3>
              </div>
              <button className="text-primary text-sm hover:underline">
                Clear
              </button>
            </div>
            {showLanguages && (
              <div className="px-4 pb-4 flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    className="px-3 py-1 border border-gray-300 dark:border-footerText rounded-full text-sm text-primary hover:bg-red-50 transition"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-footerBg rounded-lg shadow mb-4">
            <div className="flex justify-between items-center px-4 py-3">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowGenres(!showGenres)}
              >
                {showGenres ? <ChevronUp /> : <ChevronDown />}
                <h3
                  className={`text-lg font-semibold ${
                    showGenres
                      ? "text-primary"
                      : "text-gray-600 dark:text-footerText"
                  }`}
                >
                  Genres
                </h3>
              </div>
              <button className="text-primary text-sm hover:underline">
                Clear
              </button>
            </div>
            {showGenres && (
              <div className="px-4 pb-4 flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    className="px-3 py-1 border border-gray-300 dark:border-footerText rounded-full text-sm text-primary hover:bg-red-50 transition"
                  >
                    {genre}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-footerBg rounded-lg shadow mb-4">
            <div className="flex justify-between items-center px-4 py-3">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowFormats(!showFormats)}
              >
                {showFormats ? <ChevronUp /> : <ChevronDown />}
                <h3
                  className={`text-lg font-semibold ${
                    showFormats
                      ? "text-primary"
                      : "text-gray-600 dark:text-footerText"
                  }`}
                >
                  Format
                </h3>
              </div>
              <button className="text-primary text-sm hover:underline">
                Clear
              </button>
            </div>
            {showFormats && (
              <div className="px-4 pb-4 flex flex-wrap gap-2">
                {formats.map((format) => (
                  <button
                    key={format}
                    className="px-3 py-1 border border-gray-300 dark:border-footerText rounded-full text-sm text-primary hover:bg-red-50 transition"
                  >
                    {format}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="w-full mt-2 border border-primary text-primary py-2 rounded-md hover:bg-red-50 transition">
            Browse by Cinemas
          </button>
        </aside>

        <main className="w-3/4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Movies in {location}
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {languages.map((lang) => (
              <button
                key={lang}
                className="px-4 py-2 border border-gray-300 rounded-full text-sm text-primary hover:bg-red-50 transition"
              >
                {lang}
              </button>
            ))}
          </div>
          <div className="bg-white dark:bg-footerBg rounded-lg shadow p-5 mb-8 flex justify-between items-center">
            <h3 className="text-xl font-bold">Coming Soon</h3>
            <a
              href="#"
              className="flex items-center text-primary font-semibold hover:underline"
            >
              Explore Upcoming Movies
              <ChevronRight className="ml-1" size={18} />
            </a>
          </div>
        </main>
      </div>
    </div>
  );
};