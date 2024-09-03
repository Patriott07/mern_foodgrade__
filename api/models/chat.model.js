import mongoose from 'mongoose';

const Schema = mongoose.Schema({
    userRef: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    message: String,
    username : String,
    profileImage : String,
    time : String,
    room: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
})

export const chat = mongoose.model('chats', Schema);