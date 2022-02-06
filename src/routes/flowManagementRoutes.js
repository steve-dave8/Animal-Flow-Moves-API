import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path' ;
import * as dataHandler from '../util/dataHandler.js'

//Data filepaths:
const flowsFile = path.resolve('./data/savedFlows.json');

const router = express.Router();

router.post('/saved-flows', async (req, res, next) => {
    try {
        let content = await dataHandler.getAll(flowsFile);
        const duplicate = content.find(x => x.name.toLowerCase().replace(/\s+/g, '') === req.body.name.toLowerCase().replace(/\s+/g, ''));
        if (duplicate){
            return res.status(400).json("Error: a flow with that name already exists.");
        }
        else {
            const newEntry = {
                id: uuidv4(),
                ...req.body
            };
            content.push(newEntry);
            await dataHandler.write(flowsFile, content);
            return res.status(201).json(newEntry);
        }
    } catch (err) {
        console.error(err);
        return next(err);
    };
});

router.get('/saved-flows', async (req, res, next) => {
    try {
        let data = await dataHandler.getAll(flowsFile);
        data.sort((a, b) => {
            let nameA = a.name.toLowerCase();
            let nameB = b.name.toLowerCase();
            if(nameA < nameB) return -1;
            if(nameA > nameB) return 1;
            return 0;
        });
        return res.json(data);
    } catch (err) {
        console.error(err);
        return next(err);
    };
});

router.patch('/saved-flows/:id', async (req, res, next) => {
    try {
        let content = await dataHandler.getAll(flowsFile);
        const index = content.findIndex(x => x.id === req.params.id);
        content[index].flow = req.body.flow;
        await dataHandler.write(flowsFile, content);
    } catch (err) {
        console.error(err);
        return next(err);
    };
});

router.delete('/saved-flows/:id', async (req, res, next) => {
    try {
        await dataHandler.deleteData(flowsFile, req.params.id);
        return res.status(204).json();
    } catch (err) {
        console.error(err);
        return next(err);
    };
});

export default router;