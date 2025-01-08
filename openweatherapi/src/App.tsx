import React, { useState, useEffect } from "react";
import {
	Cloud,
	Droplets,
	Wind,
	Search,
	Thermometer,
	Sunrise,
	Sunset,
	MapPin,
} from "lucide-react";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
	const [city, setCity] = useState("Mysore");
	const [weather, setWeather] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchInput, setSearchInput] = useState("");

	useEffect(() => {
		fetchWeather();
	}, [city]);

	const fetchWeather = async () => {
		try {
			setLoading(true);
			setError(null);

			// First, get coordinates using the correct geocoding endpoint
			const geoResponse = await fetch(
				`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
			);
			const geoData = await geoResponse.json();
			if (!geoData.length) {
				throw new Error("City not found");
			}

			const { lat, lon } = geoData[0];

			// Then, get weather data using the correct weather endpoint
			const weatherResponse = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
			);
			const weatherData = await weatherResponse.json();
			setWeather({ ...weatherData, coord: { lat, lon } });
		} catch (error) {
			setError(
				error instanceof Error ? error.message : "Failed to fetch weather data"
			);
			setWeather(null);
		} finally {
			setLoading(false);
		}
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchInput.trim()) {
			setCity(searchInput);
			setSearchInput("");
		}
	};

	const formatTime = (timestamp: number) => {
		return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-900 flex items-center justify-center">
				<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gray-900 text-white p-8">
				<div className="max-w-4xl mx-auto">
					<form onSubmit={handleSearch} className="mb-8">
						<div className="relative">
							<input
								type="text"
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
								placeholder="Search for a city..."
								className="w-full bg-gray-800 rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<Search
								className="absolute left-4 top-3.5 text-gray-400"
								size={20}
							/>
						</div>
					</form>
					<div className="bg-gray-800 rounded-xl p-6 shadow-lg">
						<p className="text-red-400">{error}</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-900 text-white p-8">
			<div className="max-w-4xl mx-auto">
				<form onSubmit={handleSearch} className="mb-8">
					<div className="relative">
						<input
							type="text"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
							placeholder="Search for a city..."
							className="w-full bg-gray-800 rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<Search
							className="absolute left-4 top-3.5 text-gray-400"
							size={20}
						/>
					</div>
				</form>

				{weather && (
					<div className="space-y-6">
						<div className="bg-gray-800 rounded-xl p-6 shadow-lg">
							<div className="grid md:grid-cols-2 gap-6">
								<div>
									<h1 className="text-4xl font-bold mb-2">{city}</h1>
									<div className="flex items-center gap-2 text-gray-400 mb-4">
										<MapPin size={16} />
										<span>
											{weather.coord.lat.toFixed(2)}°N,{" "}
											{weather.coord.lon.toFixed(2)}°E
										</span>
									</div>
									<p className="text-6xl font-bold mb-4">
										{Math.round(weather.main.temp)}°C
									</p>
									<p className="text-xl text-gray-300 capitalize">
										{weather.weather[0].description}
									</p>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div className="bg-gray-700 p-4 rounded-lg">
										<div className="flex items-center gap-2 mb-2">
											<Thermometer className="text-blue-400" />
											<span>Feels Like</span>
										</div>
										<p className="text-2xl font-bold">
											{Math.round(weather.main.feels_like)}°C
										</p>
									</div>
									<div className="bg-gray-700 p-4 rounded-lg">
										<div className="flex items-center gap-2 mb-2">
											<Droplets className="text-blue-400" />
											<span>Humidity</span>
										</div>
										<p className="text-2xl font-bold">
											{weather.main.humidity}%
										</p>
									</div>
									<div className="bg-gray-700 p-4 rounded-lg">
										<div className="flex items-center gap-2 mb-2">
											<Wind className="text-blue-400" />
											<span>Wind Speed</span>
										</div>
										<p className="text-2xl font-bold">
											{Math.round(weather.wind.speed)} m/s
										</p>
									</div>
									<div className="bg-gray-700 p-4 rounded-lg">
										<div className="flex items-center gap-2 mb-2">
											<Cloud className="text-blue-400" />
											<span>Clouds</span>
										</div>
										<p className="text-2xl font-bold">{weather.clouds.all}%</p>
									</div>
								</div>
							</div>
						</div>

						<div className="bg-gray-800 rounded-xl p-6 shadow-lg">
							<div className="grid grid-cols-2 gap-6">
								<div className="flex items-center gap-4">
									<Sunrise className="text-yellow-400" size={24} />
									<div>
										<p className="text-gray-400">Sunrise</p>
										<p className="text-xl font-bold">
											{formatTime(weather.sys.sunrise)}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-4">
									<Sunset className="text-orange-400" size={24} />
									<div>
										<p className="text-gray-400">Sunset</p>
										<p className="text-xl font-bold">
											{formatTime(weather.sys.sunset)}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
