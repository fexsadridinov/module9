import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

interface Coordinates {
  lat: number;
  lon: number;
}

class Weather {
  date: string;
  icon: string;
  description: string;
  temperature: number;
  humidity: number;
  windSpeed: number;

  constructor(
    date: string,
    icon: string,
    description: string,
    temperature: number,
    humidity: number,
    windSpeed: number
  ) {
    this.date = date;
    this.icon = icon;
    this.description = description;
    this.temperature = temperature;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
  }
}

class WeatherService {
  private baseURL = "https://api.openweathermap.org";
  private apiKey = process.env.API_KEY || "";

  private async fetchLocationData(city: string): Promise<any> {
    const url = `${this.baseURL}/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`;
    const response = await axios.get(url);
    if (!response.data || response.data.length === 0) {
      throw new Error("No location data found for the specified city.");
    }
    return response.data[0];
  }

  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const url = `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${this.apiKey}`;
    const response = await axios.get(url);
    if (!response.data) {
      throw new Error("No weather data found for the specified coordinates.");
    }
    return response.data;
  }

  public async getWeatherForCity(city: string): Promise<{ current: Weather; forecast: Weather[] }> {
    const locationData = await this.fetchLocationData(city);
    const coordinates: Coordinates = {
      lat: locationData.lat,
      lon: locationData.lon,
    };
    const weatherData = await this.fetchWeatherData(coordinates);

    const current = new Weather(
      weatherData.list[0].dt_txt,
      weatherData.list[0].weather[0].icon,
      weatherData.list[0].weather[0].description,
      weatherData.list[0].main.temp,
      weatherData.list[0].main.humidity,
      weatherData.list[0].wind.speed
    );

    const forecast = weatherData.list.slice(1, 6).map((data: any) => {
      return new Weather(
        data.dt_txt,
        data.weather[0].icon,
        data.weather[0].description,
        data.main.temp,
        data.main.humidity,
        data.wind.speed
      );
    });

    return { current, forecast };
  }
}

export default new WeatherService();

