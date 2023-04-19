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

app.post("/temperature", (req, res, next) => {    // POST of temperature value
  console.log("receivedData");
  res.sendStatus(200);
});