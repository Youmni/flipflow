import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server runs on http://localhost:${PORT}`);
});