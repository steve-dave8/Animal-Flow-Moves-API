import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path' ;
import * as dataHandler from './src/util/dataHandler.js';

import flowManagementRoutes from './src/routes/flowManagementRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import userFlowRoutes from './src/routes/userFlowRoutes.js';

//Data filepaths:
const basesFile = path.resolve('./data/basePositions.json');
// Uncomment to connect to database:
// mongoose.connect('mongodb://localhost:27017/af-sequences')
//     .then(() => console.log("Successfully connected to the Mongo database"))
//     .catch(err => {
//         console.log('Could not connect to the database. Exiting now...', err);
//         process.exit();
// });

const port = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/", flowManagementRoutes);
app.use("/", userRoutes);
app.use("/", userFlowRoutes);

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
        let SAmoves = await dataHandler.getAll(path.resolve('./data/move-lists/SA.json'));
        let FSSmoves = await dataHandler.getAll(path.resolve('./data/move-lists/FSS.json'));
        let ST1moves = await dataHandler.getAll(path.resolve('./data/move-lists/STlv1.json'));
        let ST2moves = await dataHandler.getAll(path.resolve('./data/move-lists/STlv2.json'));
        let ST3moves = await dataHandler.getAll(path.resolve('./data/move-lists/STlv3.json'));
        let TF1moves = await dataHandler.getAll(path.resolve('./data/move-lists/TFlv1.json'));
        let TF2moves = await dataHandler.getAll(path.resolve('./data/move-lists/TFlv2.json'));
        let TF3moves = await dataHandler.getAll(path.resolve('./data/move-lists/TFlv3.json'));
        let moveList = SAmoves.concat(FSSmoves, ST1moves, ST2moves, ST3moves, TF1moves, TF2moves, TF3moves);
        return res.json(moveList);
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

