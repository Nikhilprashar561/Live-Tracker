import http from 'node:http';

import { Server } from 'socket.io';
import 'dotenv/config';
import { app } from './app.js';

async function main(){
    const PORT = process.env.PORT || 3000;

    const httpServer = http.createServer(app)

    const io = new Server();
    io.attach(httpServer);
    
    io.on('connection', (socket) => {
        socket.on('client:locationUpdates', (data) => {
        console.log(`Data Aya Kya bro`, data)

        const {latitude, longitude} = data
        socket.emit('server:locationUpdates', {id:1,latitude, longitude})
    })
    })

    httpServer.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

main();
