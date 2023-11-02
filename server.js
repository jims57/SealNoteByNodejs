const http = require('http');
const hostname = '127.0.0.1';
const port = 8080;


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World by jims57 - 2\n');

  console.log('request by jim2');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});