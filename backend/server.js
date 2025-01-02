import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import tagRoutes from './routes/tagRoutes.js';
import cardsetRoutes from './routes/cardsetRoutes.js';
import cardRoutes from './routes/cardRoutes.js';


import bodyParser from 'body-parser';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/cardsets", cardsetRoutes);
app.use("/api/cards", cardRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server runs on http://localhost:${PORT}`);
});