"use client";
import { useState } from "react";

interface Venue {
    name: string;
    address: string;
    rating: string;
    reviews: string;
    phone: string;
    image: string;
}

interface EventData {
    eventType: string;
    location: string;
    weather: string;
    popularVenues: Venue[];
}

export default function Home() {
    const [eventType, setEventType] = useState("");
    const [location, setLocation] = useState("");
    const [eventData, setEventData] = useState<EventData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchRecommendations = async () => {
        if (!eventType || !location) {
            setError("Please enter both event type and location.");
            return;
        }
        setError("");
        setLoading(true);

        try {
            const response = await fetch(`/api/recommend-event?eventType=${eventType}&location=${location}`);
            const data = await response.json();
            if (response.ok) {
                setEventData(data);
            } else {
                setError(data.message || "Error fetching data");
            }
        } catch (err) {
            setError("Failed to fetch event recommendations.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mb-4">Event Recommendation</h1>
            <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-lg">
                <input
                    type="text"
                    placeholder="Enter Event Type (e.g., Wedding, Concert)"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    type="text"
                    placeholder="Enter Location (e.g., Mumbai, Delhi)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                />
                <button
                    onClick={fetchRecommendations}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                    {loading ? "Fetching..." : "Get Recommendations"}
                </button>
            </div>

            {error && <p className="text-red-600 mt-4">{error}</p>}

            {eventData && (
                <div className="bg-white shadow-lg p-6 rounded-lg mt-6 w-full max-w-2xl">
                    <h2 className="text-2xl font-semibold">{eventData.eventType} in {eventData.location}</h2>
                    <p className="text-gray-600 mt-1">Weather: {eventData.weather}</p>
                    
                    <h3 className="text-xl font-semibold mt-4">Popular Venues</h3>
                    {eventData.popularVenues.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                            {eventData.popularVenues.map((venue, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                                    {venue.image && (
                                        <img src={venue.image} alt={venue.name} className="w-full h-40 object-cover rounded-md" />
                                    )}
                                    <h4 className="text-lg font-bold mt-2">{venue.name}</h4>
                                    <p className="text-gray-600 text-sm">{venue.address}</p>
                                    <p className="text-yellow-500 font-medium">⭐ {venue.rating} ({venue.reviews})</p>
                                    {venue.phone !== "No Phone Number" && (
                                        <p className="text-blue-500 text-sm">📞 {venue.phone}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 mt-2">No venues found.</p>
                    )}
                </div>
            )}
        </div>
    );
}
