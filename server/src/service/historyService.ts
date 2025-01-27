import fs from "fs/promises";
import path from "path";

class City {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

class HistoryService {
  private filePath = path.resolve(__dirname, "../../db/searchHistory.json");

  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(data) as City[];
    } catch (error) {
      console.error("Error reading search history:", error);
      return [];
    }
  }

  private async write(cities: City[]): Promise<void> {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2), "utf-8");
    } catch (error) {
      console.error("Error writing search history:", error);
    }
  }

  public async getCities(): Promise<City[]> {
    return await this.read();
  }

  public async addCity(cityName: string): Promise<City> {
    const cities = await this.read();
    const existingCity = cities.find(
      (city) => city.name.toLowerCase() === cityName.toLowerCase()
    );

    if (existingCity) {
      return existingCity;
    }

    const newCity = new City(this.generateId(), cityName);
    cities.push(newCity);
    await this.write(cities);
    return newCity;
  }

  public async removeCity(id: string): Promise<void> {
    const cities = await this.read();
    const updatedCities = cities.filter((city) => city.id !== id);
    await this.write(updatedCities);
  }
  
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

export default new HistoryService();
