import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';

dotenv.config();

import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';


const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

const __dirname = path.resolve();


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to database:', error);
        process.exit(1);
    }
};

startServer();