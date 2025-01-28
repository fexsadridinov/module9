import axios from 'axios';

const API_KEY = 'your-openweather-api-key'; // Replace with your actual OpenWeather API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const getWeatherData = async (cityName: string) => {
  try {
    // Construct the API URL
    const response = await axios.get(BASE_URL, {
      params: {
        q: cityName,
        units: 'metric', // Celsius temperature
        appid: API_KEY,
      },
    });

    // Return the weather data
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data.');
  }
};
