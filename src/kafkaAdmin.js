import { kafkaClient } from "./kafkaClient.js";

async function kafkaAdminSetup() {

  const admin = kafkaClient.admin();

  console.log(`What admin it is ?`, admin)

  console.log(`Kafka Connection start....`);

  await admin.connect();

  console.log(`Kafka Connection Success....`);

  await admin.createTopics({
    topics: [{ topic: "locationUpdates", numPartitions: 2 }],
  });

  await admin.disconnect();
}

kafkaAdminSetup();
