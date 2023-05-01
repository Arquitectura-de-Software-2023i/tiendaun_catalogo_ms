const amqp = require("amqplib");
const request = require('request');

const rabbitSettings = {
  protocol: "amqp",
  hostname: "localhost",
  port: 5672,
  username: "guest",
  password: "guest",
  vhost: "/",
  authMechanism: ["PLAIN", "AMQPLAIN", "EXTERNAL"],
};

const queue = "queries";

const consume = async () => {
  try {
    const conn = await amqp.connect(rabbitSettings);
    console.log("Connection created...");

    const channel = await conn.createChannel();
    console.log("Channel created...");

    const res = await channel.assertQueue(queue, { durable: false });
    console.log("Queue created...");

    console.log("Waiting for messages...");

    channel.consume(queue, (msg) => {
      const query = JSON.parse(msg.content.toString());
      console.log("Received msg:", query);
      
      //Make a request to a server with the query data
      const options = {
        url: "https://tiendaun-catalogo-ms-7gru2wm3bq-uc.a.run.app/admins/productos/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      };
      request(options, (err, res, body) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`HTTP request status: ${res.statusCode}`);
      });

      channel.ack(msg);
      console.log("Deleted message from queue");
    });
  } catch (err) {
    console.log("Error at consumer");
    console.error(`Error -> ${err}`);
  }
};
module.exports = consume;