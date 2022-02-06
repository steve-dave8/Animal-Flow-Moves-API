import express from 'express';
import Flow from '../../data/models/flow.model.js';
import jwtVerify from '../middleware/jwtVerify.js';

const router = express.Router();

router.post('/users/saved-flows', jwtVerify, async (req, res, next) => {
    try {
        const userFlows = await Flow.find({userEmail: req.body.userEmail}).exec();
        const duplicate = userFlows.find(x => x.name === req.body.name);
        if (duplicate){
            return res.status(400).json("Error: a flow with that name already exists.");
        }
        else {
            const flow = new Flow({
                userEmail: req.body.userEmail,
                name: req.body.name,
                flow: req.body.flow
            });
            flow.save().then(data => res.status(201).json(data));
        }
    } catch (err) {
        console.error(err);
        return next(err);
    };
});

router.get('/users/saved-flows/:userEmail', jwtVerify, async (req, res, next) => {
    try {
        const userFlows = await Flow.find({userEmail: req.params.userEmail}).exec();
        userFlows.sort((a, b) => {
            let nameA = a.name.toLowerCase();
            let nameB = b.name.toLowerCase();
            if(nameA < nameB) return -1;
            if(nameA > nameB) return 1;
            return 0;
        });
        return res.json(userFlows);
    } catch (err) {
        console.error(err);
        return next(err);
    };
});

router.patch('/users/saved-flows/:id', jwtVerify, async (req, res, next) => {
    try {
        const update = await Flow.findByIdAndUpdate(req.params.id, {
            flow: req.body.flow
        }, {new: true});
        if(!update) {
            return res.status(404).send(`Flow not found with id ${req.params.id}`);
        }
        res.json(update);
    } catch (err) {
        console.error(err);
        return next(err);
    };
});

router.delete('/users/saved-flows/:id', jwtVerify, async (req, res, next) => {
    try {
        const deleted = await Flow.findByIdAndRemove(req.params.id);
        if(!deleted) {
            return res.status(404).send(`Flow not found with id ${req.params.id}`);
        }
        return res.status(204).json();
    } catch (err) {
        console.error(err);
        return next(err);
    };
});

export default router;