import http from "node:http";
import "dotenv/config";

import { Server } from "socket.io";

import { app } from "./app.js";
import { kafkaClient } from "./kafkaClient.js";

async function main() {
  const PORT = process.env.PORT || 3000;

  const httpServer = http.createServer(app);

  const io = new Server();
  io.attach(httpServer);

  const kafkaProducer = kafkaClient.producer();
  await kafkaProducer.connect()

  const kafkaConsumer = kafkaClient.consumer({
    groupId: `Socket-server-${PORT}`
  })
  await kafkaConsumer.connect();

  await kafkaConsumer.subscribe({
    topics: ['locationUpdates'],
    fromBeginning: true
  })

  kafkaConsumer.run({
    eachMessage: async ({ topic, message, partition, heartbeat}) => {
        const data = JSON.parse(message.value.toString());

        console.log('Kya Aya Server pe', data);

        io.emit('server:locationUpdates', {
            id: data.id,
            latitude: data.latitude,
            longitude: data.longitude
        })
        await heartbeat();
    }
  })

  io.on("connection", (socket) => {
    socket.on("client:locationUpdates", async (data) => {
        const {latitude, longitude} = data

        await kafkaProducer.send({
            topic: 'locationUpdates',
            messages: [
                {
                    key: socket.id,
                    value: JSON.stringify({id: socket.id, latitude, longitude})
                }
            ]
        })
    });
  });

  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
