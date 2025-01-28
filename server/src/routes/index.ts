import express, { Request, Response } from 'express';
import * as weatherService from '../service/weatherService';
import * as historyService from '../service/historyService';

const router = express.Router();

// GET /api/weather/history - Get all cities from the search history
router.get('/weather/history', async (req: Request, res: Response) => {
    try {
        const history = await historyService.getSearchHistory();
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching search history.' });
    }
});

// POST /api/weather - Save city to search history and return weather data
router.post('/weather', async (req: Request, res: Response) => {
    const { cityName } = req.body;
    if (!cityName) {
        return res.status(400).json({ message: 'City name is required.' });
    }

    try {
        // Save city to search history
        const cityId = await historyService.saveCityToHistory(cityName);

        // Fetch weather data for the city
        const weatherData = await weatherService.getWeatherData(cityName);

        res.json({ cityId, weatherData });
    } catch (error) {
        res.status(500).json({ message: 'Error processing request.' });
    }
});

export default router;
