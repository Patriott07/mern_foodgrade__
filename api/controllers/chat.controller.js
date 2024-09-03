import { chat } from "../models/chat.model.js";
import {room as roomM} from "../models/room.model.js";
import { Users } from "../models/users.model.js";

export const deleteWeeklyChat = async() => {
    await chat.deleteMany({});
    console.log('Chats deleted this week');
}

export const postChat = async (req, res) => {
    const {message, userRef, room, username, profileImage} = req.body;

    let time = `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`;
    const user = await Users.findById(userRef); 
    const create_chat = await chat.create({message, userRef : user._id, room, time, username, profileImage});

    const _room = await roomM.findById(room);
    _room.last_message = message;
    await _room.save();
    global.io.emit("new_message_for_group", {msg : 'oke'});

    console.log({message, room})
    global.io.to(room).emit("new_message", {...create_chat._doc });

    res.status(200).json({message : 'oke'});
}

export const getChats = async (req, res) => {   
    const {room} = req.params;
    
    const chats = await chat.find({room});
    res.status(200).json({message : 'oke', chats});
}


export const getGroup = async (req, res) => {
    try {
        const groups = await roomM.find({}).sort({participants : -1});
        res.json({groups});
    } catch (error) {
        console.log({error})
    }
}

export const getDetailGroup = async(req, res) => {
    try {
        const _group = await roomM.findById(req.params.id);
        res.json({_group});
    } catch (error) {
        console.log({error})
    }
}