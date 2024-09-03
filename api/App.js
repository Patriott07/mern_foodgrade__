import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import webpush from 'web-push';
import bodyParser from 'body-parser';

// SocketIO Requirement
import { createServer } from 'http';
import { Server } from 'socket.io';

import RouteUser from './routes/user.routes.js';
import { RouteRecipe } from './routes/recipe.route.js';
import RouteChat from './routes/chat.route.js';

// let subscriptions = []; // Array to store subscriptions
import { addSubscription } from './subs.js';

import './cronjobs/cronjobsRecipe.js'; // import for running cronjobs
import './cronjobs/cronjobsChat.js'; // import for running cronjobs

// Set VAPID keys
const publicVAPID = 'BKEvdlOVCRgdPJEEbpvivAo6sPI27foTSsb1YS-bvJMezvPhw4VCmWKWO1B5rMJFSbB-a23Tug6_fnnS7Gvsk28'
const privateVAPID = 'I27xsEqlR4dXShEVxhm4G0ehOV3QA8GQPGVjuv75N-Q'

webpush.setVapidDetails('mailto:test@test.com', publicVAPID, privateVAPID);

const app = express();
const server = createServer(app); // make server with http
global.io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST']
    }
}); // init Socket.io

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://mongo:EeDkRsxlYtkNVknTdkSzWBdYBUgKDEPt@autorack.proxy.rlwy.net:38309', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected mongodb')
});

// export {io};

// Try Connect SocketIO
global.io.on('error', (err) => {
    console.error('Socket.io error:', err);
});


global.io.on('connection', (socket) => {
    console.log('Socket.io was connected.');

    //  Contoh event emit
    // <key> with <value>

    // Logic Join
    socket.on('join_room', (room) => {
        try {
            console.log(`User with Id : ${socket.id}. joining room ${room}`)
            socket.join(room);
        } catch (error) {
            console.log({ error })
        }

    });

    // Logic Leave
    socket.on('leave_room', (room) => {
        console.log(`User with Id : ${socket.id}. leaving room ${room}`)
        socket.leave(room);
    });

    socket.on('connect_error', (err) => {
        console.error('Connect error:', err);
    });

    socket.on('disconnect', (err) => {
        console.log('Socket.io was disconnected in our server', err)
    });
});

app.use(RouteRecipe);
app.use(RouteUser);
app.use(RouteChat);

app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    // subscriptions.push(subscription);
    addSubscription(subscription);
    res.status(201).json({});
});

server.listen(5072, () => {
    console.log('server is running');
});
