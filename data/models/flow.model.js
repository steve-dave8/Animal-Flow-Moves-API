import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const flowSchema = new Schema({
    userEmail: String,
    name: String,
    flow: Array
});

const Flow = model('Flow', flowSchema);

export default Flow;