# Weather App

A beautiful weather application built with React, TypeScript, and Tailwind CSS that displays current weather information using the OpenWeather API.

## Features

- Search weather by city name
- Display current temperature, feels like, humidity, and wind speed
- Show sunrise and sunset times
- Dark mode interface
- Responsive design
- Coordinates display for each location

## Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your OpenWeather API key:

```bash
VITE_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
- OpenWeather API
- Lucide React Icons

## API Reference

This app uses two OpenWeather API endpoints:

- Geocoding API: To convert city names to coordinates
- Current Weather API: To fetch weather data using coordinates
