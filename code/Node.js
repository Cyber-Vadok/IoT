/**
 * include existing modules
 */
const http = require('http')

/**
 * server setup
 */
const hostname = '127.0.0.1'
const port     = 3000

const server = http.createServer((req, res) => {  // create the server
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World\n')
})

server.listen(port, hostname, () => {             // listen the server
  console.log(`Server running at http://${hostname}:${port}/`)
})