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
            <nav className="w-full shadow-sm border-b bg-red-500 text-white">
                <div className="flex justify-between items-center px-6 py-3">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-semibold">
                            <span className="text-white font-bold">show</span>time
                        </span>
                    </div>

                    <div className="hidden md:flex items-center w-1/2 bg-gray-100 rounded-md px-3 py-2">
                        <Search className="text-gray-500 mr-2 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for Movies, Events, Plays, Sports and Activities"
                            className="bg-transparent w-full outline-none text-sm text-gray-700"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Theme Toggle Switch */}
                        <button
                            onClick={toggleTheme}
                            className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${isDarkMode ? 'bg-red-500' : 'bg-gray-200'}`}
                        >
                            <span className="sr-only">Toggle theme</span>
                            <span
                                aria-hidden="true"
                                className={`pointer-events-none absolute h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${isDarkMode ? 'translate-x-5' : 'translate-x-0'} flex items-center justify-center`}
                            >
                                {isDarkMode ? (
                                    <Moon className="h-3 w-3 text-red-500" />
                                ) : (
                                    <Sun className="h-3 w-3 text-gray-800" />
                                )}
                            </span>
                        </button>

                        {/* City Selector */}
                        <div
                            onClick={() => setCityDialogOpen(true)}
                            className="hidden md:flex items-center justify-center text-white text-sm cursor-pointer hover:underline w-36"
                        >
                            <MapPin
                                className={`w-4 h-4 mr-1 ${detecting ? "animate-pulse text-gray-300" : "text-white"
                                    }`}
                            />
                            <span className="truncate">
                                {detecting
                                    ? "Detecting..."
                                    : selectedCity || "Select City"}
                            </span>
                            <ChevronDown className="w-4 h-4 ml-1 flex-shrink-0" />
                        </div>

                        <button className="bg-white text-black text-sm px-4 py-1.5 rounded-md hover:bg-gray-100 transition">
                            Sign in
                        </button>

                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 rounded-md hover:bg-white/10 transition"
                        >
                            {menuOpen ? (
                                <X className="w-6 h-6 text-white" />
                            ) : (
                                <Menu className="w-6 h-6 text-white" />
                            )}
                        </button>

                        {menuOpen && (
                            <div className="md:hidden bg-red-600 text-white px-6 py-4 flex flex-col gap-4 shadow-lg">
                                <a href="/" className="hover:text-red-500">Movies</a>
                                <a href="/" className="hover:text-red-500">Music Shows</a>
                                <a href="/" className="hover:text-red-500">Sports</a>
                                <a href="/" className="hover:text-red-500">Plays</a>
                                <a href="/" className="hover:text-red-500">Standup</a>
                                <a href="/" className="hover:text-red-500">Activities</a>
                                <div className="border-t border-gray-200 my-2"></div>
                                <a href="/" className="hover:text-red-500">ListYourShow</a>
                                <a href="/" className="hover:text-red-500">Corporates</a>
                                <a href="/" className="hover:text-red-500">Offers</a>
                                <a href="/" className="hover:text-red-500">Gift Cards</a>
                                <button className="mt-4 w-full bg-white text-red-500 px-4 py-2 rounded-md text-sm font-medium">
                                    Sign in
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="hidden md:flex justify-between items-center bg-gray-50 px-10 py-2 text-sm text-gray-700">
                    <div className="flex gap-6">
                        <a href="/" className="hover:text-red-500">Movies</a>
                        <a href="/" className="hover:text-red-500">Music Shows</a>
                        <a href="/" className="hover:text-red-500">Sports</a>
                        <a href="/" className="hover:text-red-500">Plays</a>
                        <a href="/" className="hover:text-red-500">Standup</a>
                        <a href="/" className="hover:text-red-500">Activities</a>
                    </div>
                    <div className="flex gap-6">
                        <a href="/" className="hover:text-red-500">ListYourShow</a>
                        <a href="/" className="hover:text-red-500">Corporates</a>
                        <a href="/" className="hover:text-red-500">Offers</a>
                        <a href="/" className="hover:text-red-500">Gift Cards</a>
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