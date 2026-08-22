export interface WeatherData {
  tempC: number;
  humidity: number;
  description: string;
  city: string;
}

const CITY_COORDS: Record<string, { lat: number; lon: number }> = {
  الرياض: { lat: 24.7136, lon: 46.6753 },
  جدة: { lat: 21.4858, lon: 39.1925 },
  الدمام: { lat: 26.3927, lon: 49.9777 },
  الأحساء: { lat: 25.3832, lon: 49.5877 },
};

/** Fetch weather — uses OpenWeatherMap if key set, else simulated Saudi summer data */
export async function fetchWeather(city: string): Promise<WeatherData> {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const coords = CITY_COORDS[city] ?? CITY_COORDS["الرياض"];

  if (apiKey) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric&lang=ar`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return {
          tempC: Math.round(data.main.temp),
          humidity: data.main.humidity,
          description: data.weather[0]?.description ?? "صافٍ",
          city,
        };
      }
    } catch {
      /* fallback below */
    }
  }

  // Simulated — summer demo with heatwave option
  const hour = new Date().getHours();
  const baseTemp = city === "جدة" ? 34 : 38;
  return {
    tempC: baseTemp + (hour >= 10 && hour <= 16 ? 4 : 0),
    humidity: city === "جدة" ? 55 : 25,
    description: baseTemp >= 38 ? "حار جداً" : "مشمس حار",
    city,
  };
}

/** Simulate meter reading increment */
export function simulateMeterReading(prevKwh: number, tempC: number, hours = 1): number {
  const baseRate = 0.08;
  const acFactor = tempC >= 38 ? 2.5 : tempC >= 30 ? 1.5 : 1.0;
  return Math.round((prevKwh + baseRate * acFactor * hours) * 100) / 100;
}
