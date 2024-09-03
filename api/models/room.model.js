import mongoose from 'mongoose';

const Schema = mongoose.Schema({
    name : String,
    description : String,
    imageUrl : String,
    participants : Number,
    last_message : String
});

export const room = mongoose.model('rooms', Schema);