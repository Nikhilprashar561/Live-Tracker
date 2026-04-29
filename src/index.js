import http from 'node:http';

import { Server } from 'socket.io';
import 'dotenv/config';
import { app } from './app.js';

async function main(){
    const PORT = process.env.PORT || 3000;

    const httpServer = http.createServer(app)

    const io = new Server(httpServer);
    io.attach(httpServer);


    httpServer.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

main();
