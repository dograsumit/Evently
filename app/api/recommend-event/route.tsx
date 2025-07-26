import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const SERPAPI_KEY = process.env.SERPAPI_KEY || "7dfc3ac76690b54a0dcab2fe4507895653f59f33b722faf7e9684d6cfac89605";
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || "217034d56d49e2da184a7f916196270a";

// Fetch weather data
async function getWeather(location: string): Promise<string> {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${OPENWEATHER_API_KEY}&units=metric`;
        const response = await axios.get(url);
        return response.data.weather[0].description || "Weather data unavailable";
    } catch (error) {
        console.error("🛑 Weather API Error:", error);
        return "Weather data unavailable";
    }
}

// Fetch event venues with details using SerpAPI
async function getPopularVenues(eventType: string, location: string) {
    try {
        const url = `https://serpapi.com/search.json?engine=google_local&q=${eventType}+venue+in+${location}&location=${location}&hl=en&api_key=${SERPAPI_KEY}`;
        const response = await axios.get(url);

        console.log("🔍 SERPAPI Response:", JSON.stringify(response.data, null, 2)); // Debugging log

        const venues = response.data.local_results || response.data.places_results || [];

        return venues.map((venue: any) => ({
            name: venue.title || "No Name Available",
            address: venue.address || "Address Not Available",
            rating: venue.rating ? `${venue.rating}/5` : "No Rating",
            reviews: venue.review_count ? `${venue.review_count} reviews` : "No Reviews",
            phone: venue.phone || "No Phone Number",
            image: venue.thumbnail || "https://via.placeholder.com/150", // Default placeholder image
            link: venue.link || "#"
        }));
    } catch (error) {
        console.error("🛑 SerpAPI Error:", error);
        return [{ name: "Venue data unavailable" }];
    }
}

// API Route using named GET export
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const eventType = searchParams.get("eventType");
    const location = searchParams.get("location");

    if (!eventType || !location) {
        return NextResponse.json({ message: "Missing eventType or location" }, { status: 400 });
    }

    try {
        const [weather, popularVenues] = await Promise.all([
            getWeather(location),
            getPopularVenues(eventType, location)
        ]);

        return NextResponse.json({ eventType, location, weather, popularVenues });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
