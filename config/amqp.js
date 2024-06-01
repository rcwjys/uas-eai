import amqp from 'amqplib';

const connection = await amqp.connect(process.env.AMQP_URL);
const channel = await connection.createChannel()



export {connection, channel};