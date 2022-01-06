import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import path from 'path' ;
import * as dataHandler from './src/util/dataHandler.js';

import flowManagementRoutes from './src/routes/flowManagementRoutes.js';

//Data filepaths:
const basesFile = path.resolve('./data/basePositions.json');
const movesFile = path.resolve('./data/moveList.json');

const port = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/", flowManagementRoutes);

app.get('/base-positions', async (req, res, next) => {
    try {
        let data = await dataHandler.getAll(basesFile);
        return res.json(data);
    } catch (err) {
        console.error(err);
        return next(err);
    };
});

app.get('/move-list', async (req, res, next) => {
    try {
        let data = await dataHandler.getAll(movesFile);
        return res.json(data);
    } catch (err) {
        console.error(err);
        return next(err);
    };
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(404).json({message: "not found"});
});

app.listen(port, () => console.log(`API server ready on http://localhost:${port}`));

