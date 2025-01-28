import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; // Install the uuid package: npm install uuid

const HISTORY_FILE_PATH = path.join(__dirname, '../../db/searchHistory.json');

// Read the search history from the JSON file
export const getSearchHistory = async () => {
  try {
    const data = await fs.promises.readFile(HISTORY_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error('Failed to read search history.');
  }
};

// Save a new city to the search history
export const saveCityToHistory = async (cityName: string) => {
  const history = await getSearchHistory();

  // Check if the city already exists in the search history
  const existingCity = history.find((entry: { cityName: string }) => entry.cityName === cityName);
  if (existingCity) {
    return existingCity.id; // Return the existing city's ID
  }

  // Create a new city entry with a unique ID
  const city = {
    id: uuidv4(),
    cityName,
  };

  history.push(city);

  // Write the updated search history back to the JSON file
  await fs.promises.writeFile(HISTORY_FILE_PATH, JSON.stringify(history, null, 2));

  return city.id;
};
