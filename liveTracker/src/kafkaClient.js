import { Kafka } from 'kafkajs';

export const kafkaClient = new Kafka({
    clientId: 'liveTracker',
    brokers: ['localhost:9092']
})
