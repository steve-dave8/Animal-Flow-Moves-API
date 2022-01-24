import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../../data/models/user.model.js';
import { createHash, verifyHash } from '../util/hasher.js';

const router = express.Router();

//Create a new user:
router.post('/users', async (req, res, next) => {
    try {
        const duplicate = await User.findOne({email: req.body.email}).exec();
        if (duplicate) {
            return res.status(400).json("Error: an account with that email already exists.");
        }
        const hash = await createHash(req.body.password);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash
        });
        user.save().then(data => {
            delete data.password;
            res.status(201).json(data);
        });
    } catch (err) {
        console.error(err);
        return next(err);
    };
});

//Route to login a user:
router.post('/auth', async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email}).exec();
        if (!user) {
            return res.status(401).json("Error: incorrect credentials provided.");
        };
        const valid = await verifyHash(req.body.password, user.password);
        if (!valid) {
            return res.status(401).json("Error: incorrect password.");
        };
        const userEmail = req.body.email;
        const token = jwt.sign({userEmail}, process.env.JWT_SECRET, {expiresIn: "3h"});      
        return res.json({token});
    } catch (err) {
        console.error(err);
        return next(err);
    };
});

export default router;