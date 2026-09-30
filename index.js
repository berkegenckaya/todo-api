const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok' }));
  }
  res.writeHead(404);
  res.end();
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log('dinleniyor: ' + port));