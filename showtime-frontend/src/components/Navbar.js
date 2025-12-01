import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Search, MapPin, Sun, Moon } from "lucide-react";
import { CityDialog } from "./CityDialog";

export const Navbar = ({ isDarkMode, toggleTheme }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cityDialogOpen, setCityDialogOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState("");
    const [detecting, setDetecting] = useState(false);

    const detectCity = async () => {
        if (!navigator.geolocation) {
            console.warn("Geolocation not supported.");
            setCityDialogOpen(true);
            return;
        }

        setDetecting(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                    );
                    const data = await response.json();

                    const city =
                        data.address.city ||
                        data.address.town ||
                        data.address.village ||
                        data.address.state ||
                        "Unknown";

                    setSelectedCity(city);
                    setCityDialogOpen(false);
                } catch (error) {
                    console.error("Error fetching city:", error);
                    setCityDialogOpen(true);
                } finally {
                    setDetecting(false);
                }
            },
            (error) => {
                console.warn("Location denied or unavailable:", error);
                setDetecting(false);
                setCityDialogOpen(true);
            }
        );
    };

    useEffect(() => {
        detectCity();
    }, []);

    return (
        <>
            <nav className="w-full shadow-sm border-b bg-primary text-textLight dark:bg-bgDark">
                <div className="flex justify-between items-center px-6 py-3">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-semibold">
                            <span className="text-textLight font-bold"><a href="/">showtime</a></span>
                        </span>
                    </div>

                    {/* Desktop Search Bar */}
                    <div className="hidden md:flex items-center w-1/2 bg-white rounded-md px-3 py-2 dark:bg-footerBg">
                        <Search className="text-gray-700 mr-2 w-5 h-5 dark:text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for Movies, Events, Plays, Sports and Activities"
                            className="bg-transparent w-full outline-none text-sm text-gray-900 dark:text-textLight"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Theme Toggle Switch */}
                        <button
                            onClick={toggleTheme}
                            className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${isDarkMode ? 'bg-primary' : 'bg-gray-400'}`}
                        >
                            <span className="sr-only">Toggle theme</span>
                            <span
                                aria-hidden="true"
                                className={`pointer-events-none absolute h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${isDarkMode ? 'translate-x-5' : 'translate-x-0'} flex items-center justify-center`}
                            >
                                {isDarkMode ? (
                                    <Moon className="h-3 w-3 text-primary" />
                                ) : (
                                    <Sun className="h-3 w-3 text-gray-800" />
                                )}
                            </span>
                        </button>

                        {/* Desktop City Selector */}
                        <div
                            onClick={() => setCityDialogOpen(true)}
                            className="hidden md:flex items-center justify-center text-textLight text-sm cursor-pointer hover:underline w-36"
                        >
                            <MapPin
                                className={`w-4 h-4 mr-1 ${detecting ? "animate-pulse text-footerText" : "text-textLight"}
                                    }`}
                            />
                            <span className="truncate">
                                {detecting
                                    ? "Detecting..."
                                    : selectedCity || "Select City"}
                            </span>
                            <ChevronDown className="w-4 h-4 ml-1 flex-shrink-0" />
                        </div>

                        <button className="bg-white text-gray-800 text-sm px-4 py-1.5 rounded-md hover:bg-gray-100 transition">
                            Sign in
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2 rounded-md hover:bg-white/10 transition"
                        >
                            {menuOpen ? (
                                <X className="w-6 h-6 text-white" />
                            ) : (
                                <Menu className="w-6 h-6 text-white" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Search and City Selector (Visible only on small screens) */}
                <div className="md:hidden px-6 py-3 flex items-center gap-4 bg-primary dark:bg-bgDark">
                    <div className="flex items-center w-full bg-white rounded-md px-3 py-2 dark:bg-footerBg">
                        <Search className="text-gray-700 mr-2 w-5 h-5 dark:text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent w-full outline-none text-sm text-gray-900 dark:text-textLight"
                        />
                    </div>
                    <div
                        onClick={() => setCityDialogOpen(true)}
                        className="flex items-center justify-center text-textLight text-sm cursor-pointer hover:underline flex-shrink-0"
                    >
                        <MapPin
                            className={`w-4 h-4 mr-1 ${detecting ? "animate-pulse text-footerText" : "text-textLight"}
                                }`}
                        />
                        <span className="truncate">
                            {detecting
                                ? "Detecting..."
                                : selectedCity || "City"}
                        </span>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {menuOpen && (
                    <div className="md:hidden bg-primary text-textLight px-6 py-4 flex flex-col gap-4 shadow-lg dark:bg-bgDark">
                        <a href="/" className="hover:text-textLight">Movies</a>
                        <a href="/" className="hover:text-textLight">Music Shows</a>
                        <a href="/" className="hover:text-textLight">Sports</a>
                        <a href="/" className="hover:text-textLight">Plays</a>
                        <a href="/" className="hover:text-textLight">Standup</a>
                        <a href="/" className="hover:text-textLight">Activities</a>
                        <div className="border-t border-gray-200 my-2"></div>
                        <a href="/" className="hover:text-textLight">List Your Show</a>
                        <a href="/" className="hover:text-textLight">Corporates</a>
                        <a href="/" className="hover:text-textLight">Offers</a>
                        <a href="/" className="hover:text-textLight">Gift Cards</a>
                        <button className="mt-4 w-full bg-white text-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-accent">
                            Sign in
                        </button>
                    </div>
                )}

                {/* Bottom Nav Links (Desktop Only) */}
                <div className="hidden md:flex justify-between items-center bg-accent px-10 py-2 text-sm text-textLight dark:bg-bgDark">
                    <div className="flex gap-6">
                        <a href="/movies" className="hover:text-textLight">Movies</a>
                        <a href="/music-shows" className="hover:text-textLight">Music Shows</a>
                        <a href="/sports" className="hover:text-textLight">Sports</a>
                        <a href="/plays" className="hover:text-textLight">Plays</a>
                        <a href="/standup" className="hover:text-textLight">Standup</a>
                        <a href="/activities" className="hover:text-textLight">Activities</a>
                    </div>
                    <div className="flex gap-6">
                        <a href="/list-your-show" className="hover:text-textLight">List Your Show</a>
                        <a href="/corporates" className="hover:text-textLight">Corporates</a>
                        <a href="/offers" className="hover:text-textLight">Offers</a>
                        <a href="/giftcards" className="hover:text-textLight">Gift Cards</a>
                    </div>
                </div>
            </nav>

            <CityDialog
                isOpen={cityDialogOpen}
                onClose={() => setCityDialogOpen(false)}
                onSelect={(city) => {
                    setSelectedCity(city);
                    setCityDialogOpen(false);
                }}
            />
        </>
    );
};