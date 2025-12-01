import { Tent, Headphones, Ticket, Mail } from "lucide-react"

export const Footer = () => {
  return (
    <>
      <footer className="text-textLight">
        {/* Top Section */}
        <div className="bg-footerBg py-4 dark:bg-bgDark">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Tent className="w-10 h-10 text-white" />
              <h6 className="text-lg font-semibold">
                Got a show, event, activity or a great experience? Partner with us & get listed on BookMyShow
              </h6>
            </div>
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-accent transition">
              Contact today!
            </button>
          </div>
        </div>

        {/* Middle Section */}
        <div className="bg-bgDark py-8 dark:bg-black">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* ITEM */}
            <div className="group flex flex-col items-center hover:bg-gray-700 rounded-md p-4 transition dark:hover:bg-gray-800 cursor-pointer">
              <Headphones className="w-10 h-10 text-footerText group-hover:text-white mb-2 transition dark:text-gray-400" />
              <span className="text-sm text-footerText group-hover:text-white transition dark:text-gray-400">24/7 CUSTOMER CARE</span>
            </div>

            <div className="group flex flex-col items-center hover:bg-gray-700 rounded-md p-4 transition dark:hover:bg-gray-800 cursor-pointer">
              <Ticket className="w-10 h-10 text-footerText group-hover:text-white mb-2 transition dark:text-gray-400" />
              <span className="text-sm text-footerText group-hover:text-white transition dark:text-gray-400">RESEND BOOKING CONFIRMATION</span>
            </div>

            <div className="group flex flex-col items-center hover:bg-gray-700 rounded-md p-4 transition dark:hover:bg-gray-800 cursor-pointer">
              <Mail className="w-10 h-10 text-footerText group-hover:text-white mb-2 transition dark:text-gray-400" />
              <span className="text-sm text-footerText group-hover:text-white transition dark:text-gray-400">SUBSCRIBE TO THE NEWSLETTER</span>
            </div>
          </div>
        </div>
        <div className="bg-bgDark py-4 dark:bg-black">

        </div>
      </footer>
    </>
  )
}