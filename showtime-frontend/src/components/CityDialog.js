import { useState } from "react";
import { MapPin, Building2, Landmark, Cloud, Trees, Crosshair, Search } from "lucide-react";

export const CityDialog = ({ isOpen, onClose, onSelect }) => {
    const [detecting, setDetecting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    if (!isOpen) return null;

    const topCities = [
        { name: "Mumbai", icon: <Building2 className="w-8 h-8 text-gray-600" /> },
        { name: "Delhi", icon: <Landmark className="w-8 h-8 text-gray-600" /> },
        { name: "Bengaluru", icon: <Cloud className="w-8 h-8 text-gray-600" /> },
        { name: "Chennai", icon: <Trees className="w-8 h-8 text-gray-600" /> },
        { name: "Hyderabad", icon: <Landmark className="w-8 h-8 text-gray-600" /> },
    ];

    const allCities = [
        ...topCities,
        { name: "Kolkata", icon: <Building2 className="w-8 h-8 text-gray-600" /> },
        { name: "Pune", icon: <Cloud className="w-8 h-8 text-gray-600" /> },
        { name: "Ahmedabad", icon: <Building2 className="w-8 h-8 text-gray-600" /> },
        { name: "Jaipur", icon: <Landmark className="w-8 h-8 text-gray-600" /> },
    ];

    const filteredCities = (searchTerm === '')
        ? topCities
        : allCities.filter(city =>
            city.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const detectLocation = async () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
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

                    onSelect(city);
                    onClose();
                } catch (error) {
                    console.error("Error detecting city:", error);
                    alert("Could not detect your location. Please select manually.");
                } finally {
                    setDetecting(false);
                }
            },
            (error) => {
                console.error("Location detection failed:", error);
                alert("Unable to access your location. Please select manually.");
                setDetecting(false);
            }
        );
    };

    return (
        <div
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm"
            onClick={onClose} // Close dialog when clicking on the overlay
        >
            <div
                className="bg-white rounded-2xl shadow-xl w-11/12 max-w-lg p-6 relative"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dialog
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>

                <div className="flex items-center gap-2 mb-5">
                    <MapPin className="text-red-500 w-6 h-6" />
                    <h2 className="text-xl font-semibold text-gray-800">
                        Select Your City
                    </h2>
                </div>

                <div className="mb-5 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search for cities..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="mb-5 flex justify-center">
                    <button
                        onClick={detectLocation}
                        disabled={detecting}
                        className={`flex items-center gap-2 px-5 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50 transition ${
                            detecting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    >
                        <Crosshair
                            className={`w-5 h-5 ${detecting ? "animate-pulse" : ""}`}
                        />
                        {detecting ? "Detecting..." : "Detect My Location"}
                    </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {filteredCities.map((city) => (
                        <button
                            key={city.name}
                            onClick={() => {
                                onSelect(city.name);
                                onClose();
                            }}
                            className="flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-xl py-4 shadow-sm transition"
                        >
                            <div className="mb-2">{city.icon}</div>
                            <span className="text-sm font-medium text-gray-700">
                {city.name}
              </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};