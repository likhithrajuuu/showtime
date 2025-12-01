import React from "react";
import {
  Music,
  Church,
  BookOpen,
  Disc3,
  Dribbble,
  User,
  Info,
} from "lucide-react";

export const ListYourShowPage = () => {
  const categories = [
    { name: "Performances", icon: <Music className="w-14 h-14" /> },
    { name: "Experiences", icon: <Church className="w-14 h-14" /> },
    { name: "Expositions", icon: <BookOpen className="w-14 h-14" /> },
    { name: "Parties", icon: <Disc3 className="w-14 h-14" /> },
    { name: "Sports", icon: <Dribbble className="w-14 h-14" /> },
    { name: "Conferences", icon: <User className="w-14 h-14" /> },
  ];

  return (
    <div className="bg-gray-100 dark:bg-bgDark min-h-screen px-6 pb-16">
      <div className="container mx-auto text-center">

        {/* Top heading */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-textLight mb-3">
          What can you host?
        </h1>
        <p className="text-gray-600 dark:text-footerText max-w-3xl mx-auto mb-12">
          As the purveyor of entertainment, BookMyShow enables your event with
          end to end solutions from the time you register to the completion of
          the event. Let’s look at what you can host.
        </p>

        {/* Categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-[#F3F8FF] dark:bg-footerBg rounded-lg shadow-md p-10 flex flex-col items-center hover:shadow-lg transition cursor-pointer hover:scale-[1.02]"
            >
              <div className="text-gray-800 dark:text-textLight mb-6">
                {category.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-textLight mb-4">
                {category.name}
              </h3>

              <Info className="text-primary w-5 h-5 mt-auto" />
            </div>
          ))}
        </div>

        {/* --- List your show button --- */}
        <div className="mt-10 mb-16">
          <button className="px-10 py-3 rounded-md bg-primary text-white font-medium hover:bg-accent transition">
            List your show
          </button>
        </div>

        {/* --- Next section heading --- */}
        <section className="mt-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-textLight mb-3">
            What are the services we offer?
          </h2>
          <p className="text-gray-600 dark:text-footerText max-w-3xl mx-auto">
            After successful collaborations with the best event organisers over
            the past decade and a half, we’re well equipped to bring your vision
            to life.
          </p>
        </section>
      </div>
    </div>
  );
};