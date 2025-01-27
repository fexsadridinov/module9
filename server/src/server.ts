import dotenv from "dotenv";
import express from "express";
import path from "path";
import apiRoutes from "./routes/api";
import htmlRoutes from "./routes/htmlRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "../../client/dist")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/weather", apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
