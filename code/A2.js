/**
 * include existing modules
 */
const sensorLib = require('node-dht-sensor');
const http      = require('http');

/**
 * setup sensor
 */
var sensorType = 11;                  // 11 for DHT11 (22 for DHT22 and AM2302)
var sensorPin  = 4;                   // GPIO pin

if (!sensorLib.initialize(sensorType, sensorPin)){  // if cannot initialize
  console.warn('Failed to initialize sensor');      // console error message
  process.exit(1);
}

/**
 * function to update sensor value every 2 sec automatically
 */
setInterval(function() {
  var readout = sensorLib.read();       // read temperature from sensor

  console.log('Temperature:', readout.temperature.toFixed(1) + 'C'); // temp message

  const postData = JSON.stringify({     // set POST of the readed temperature
    'sensor': 'ID1',
    'timestamp': 12345678,
    'temperature': readout.temperature.toFixed(1)
  });

  const options = {                     // set server's options
    hostname: '192.168.137.1',
    port: 3000,
    path: '/temperature',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  const req = http.request(options, (res) => { // make the HTTP request to the server
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  req.write(postData);                  // write data to request body
  req.end();

}, 2000);
