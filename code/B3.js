/**
 * include existing modules
 */
var express       = require("express");
const MongoClient = require('mongodb').MongoClient;

/**
 * setup express app
 */
const uri = 'mongodb://130.192.137.1/TemperatureDB';
var app = express();

app.listen(3000, () => {                            // listen on port 3000
    console.log("Server running on port 3000");
});

app.use( express.urlencoded({                       // parses incoming requests
    extended: true
  })
)

app.use(express.json());                            // setup the middleware (middleware: methods/functions/operations that are called BETWEEN processing the Request and sending the Response in your application method)

app.post("/temperature", (req, res, next) => {      // POST of temperature value
  // setup variables
  var temperature = req.body.temperature;
  var timestamp   = req.body.timestamp;
  var sensor      = req.body.sensor;
  const client    = new MongoClient(uri, { useUnifiedTopology: true });

  async function run() {
    try {
      await client.connect();                       // await connection by the client

      const database = client.db("TemperatureDB");
      const temperatureColl = database.collection("temperature");

      const doc = {                                 // JSON document to be inserted
        value: temperature,
        timestamp: timestamp,
        sensorId: sensor,
        roomId: 'room1'
      };

      const result = await temperatureColl.insertOne(doc); // await new temperature value
      console.log(`Document inserted with the _id: ${result.insertedId}`,);
    } finally {
      await client.close();
    }
  }

  run().catch(console.dir);                         // manage promise errors
  res.sendStatus(200);
});