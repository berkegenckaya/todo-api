const http = require('http');

const todos = [];
let nextId = 1;
const stats = { requests: 0, errors: 0 };

function send(res, status, body, type = 'application/json') {
  res.writeHead(status, { 'Content-Type': type });
  res.end(typeof body === 'string' ? body : JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => (data += c));
    req.on('end', () => resolve(data));
  });
}

function createServer() {
  return http.createServer(async (req, res) => {
    stats.requests++;
    console.log(JSON.stringify({ level: 'INFO', method: req.method, url: req.url }));

    if (req.method === 'GET' && req.url === '/health') {
     return send(res, 200, { status: 'ok', env: process.env.APP_ENV || 'local' });
    }
    if (req.method === 'GET' && req.url === '/todos') {
      return send(res, 200, todos);
    }
    if (req.method === 'POST' && req.url === '/todos') {
      const body = JSON.parse((await readBody(req)) || '{}');
      if (!body.title) {
        stats.errors++;
        return send(res, 400, { error: 'title gerekli' });
      }
      const todo = { id: nextId++, title: body.title, done: false };
      todos.push(todo);
      return send(res, 201, todo);
    }
    if (req.method === 'GET' && req.url === '/metrics') {
      const text =
        `http_requests_total ${stats.requests}\n` +
        `http_errors_total ${stats.errors}\n` +
        `todos_count ${todos.length}\n`;
      return send(res, 200, text, 'text/plain');
    }
    stats.errors++;
    send(res, 404, { error: 'bulunamadi' });
  });
}

if (require.main === module) {
  const port = process.env.PORT || 3000;
  createServer().listen(port, () => console.log('dinleniyor: ' + port));
}

module.exports = { createServer };