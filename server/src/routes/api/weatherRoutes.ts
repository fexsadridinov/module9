import { Router, Request, Response } from "express";
import HistoryService from "../../service/historyService";
import WeatherService from "../../service/weatherService";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { city } = req.body;

  if (!city) {
    return res.status(400).json({ error: "City name is required." });
  }

  try {
    const weatherData = await WeatherService.getWeatherForCity(city);

    const savedCity = await HistoryService.addCity(city);

    return res.status(200).json({ city: savedCity, weather: weatherData });
  } catch (err) {
    console.error("Error fetching weather data:", err);
    return res.status(500).json({ error: "Failed to fetch weather data." });
  }
});

router.get("/history", async (req: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    return res.status(200).json(cities);
  } catch (err) {
    console.error("Error fetching search history:", err);
    return res.status(500).json({ error: "Failed to fetch search history." });
  }
});

router.delete("/history/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "City ID is required." });
  }

  try {
    await HistoryService.removeCity(id);
    return res.status(200).json({ message: "City removed successfully." });
  } catch (err) {
    console.error("Error removing city from history:", err);
    return res.status(500).json({ error: "Failed to remove city from history." });
  }
});

export default router;
