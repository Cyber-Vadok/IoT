/**
 * include existing modules
 */
var express = require("express");

/**
 * setup express app (server)
 */
var app = express();

app.listen(3000, () => {                          // listen on port 3000
  console.log("Server running on port 3000");
});

app.use( express.urlencoded({                     // parses incoming requests
    extended: true
  })
)

app.use(express.json());                          // setup the middleware (middleware: methods/functions/operations that are called BETWEEN processing the Request and sending the Response in your application method)

app.post("/temperature", (req, res, next) => {    // POST of temperature value
    console.log(req.body.temperature);
    res.sendStatus(200);
});