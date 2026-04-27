import { useEffect, useState } from "react";
import { getWeather } from "../../api/weather/open-meteo";

interface WeatherData {
    temperature: number;
    humidity: number;
    rainChance: number;
    description: number;
}


export function useWeather(location: string) {
    const [weather, setWeather] = useState(<WeatherData | null>(null));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(<Error | null>(null));

    useEffect(() => {
        if (!location) return;

        getWeather(location)
    })

};