import express from 'express';
import path from 'path';
import cors from 'cors';
import apiRoutes from './routes/api/index';
import htmlRoutes from './routes/api/htmlRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes); // Serve index.html on root

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
