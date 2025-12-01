import { Tent, Headphones, Ticket, Mail } from "lucide-react"

export const Footer = () => {
  return (
    <>
      <footer className="text-white">
        {/* Top Section */}
        <div className="bg-gray-700 py-4">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Tent className="w-10 h-10 text-white" />
              <h6 className="text-lg font-semibold">
                Got a show, event, activity or a great experience? Partner with us & get listed on BookMyShow
              </h6>
            </div>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
              Contact today!
            </button>
          </div>
        </div>

        {/* Middle Section */}
        <div className="bg-gray-600 py-8">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* ITEM */}
            <div className="group flex flex-col items-center hover:bg-gray-700 rounded-md p-4 transition">
              <Headphones className="w-10 h-10 text-gray-300 group-hover:text-red-500 mb-2 transition cursor-pointer" />
              <span className="text-sm text-gray-300 group-hover:text-red-500 transition">
                24/7 CUSTOMER CARE
              </span>
            </div>

            <div className="group flex flex-col items-center hover:bg-gray-700 rounded-md p-4 transition cursor-pointer">
              <Ticket className="w-10 h-10 text-gray-300 group-hover:text-red-500 mb-2 transition" />
              <span className="text-sm text-gray-300 group-hover:text-red-500 transition">
                RESEND BOOKING CONFIRMATION
              </span>
            </div>

            <div className="group flex flex-col items-center hover:bg-gray-700 rounded-md p-4 transition cursor-pointer">
              <Mail className="w-10 h-10 text-gray-300 group-hover:text-red-500 mb-2 transition" />
              <span className="text-sm text-gray-300 group-hover:text-red-500 transition">
                SUBSCRIBE TO THE NEWSLETTER
              </span>
            </div>
          </div>
        </div>
        <div className="bg-gray-700 py-4">

        </div>
      </footer>
    </>
  )
}