import { kafkaClient } from "./kafkaClient.js";

async function initialize() {

  const kafkaConsumer = await kafkaClient.consumer({
    groupId: "liveTracker",
  });

  console.log(`what is consumer i want to check it...`, kafkaConsumer)

  await kafkaConsumer.connect();

  await kafkaConsumer.subscribe({
    topics:'locationUpdates',
    fromBeginning: true
  })

  kafkaConsumer.run({
    eachMessage: async ({topic, message, partition, heartbeat}) => {

        console.log(`what topic it is`, topic);
        console.log(`what message it is`, message);
        console.log(`what partition it is`, partition)
        console.log(`what Heartbeat it is`, heartbeat, heartbeat())

        const data = JSON.parse(message.value.toString());
        console.log(`Data Insertion`, data)

        await heartbeat()
    }
  })
}

initialize();
