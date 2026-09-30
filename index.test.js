const test = require('node:test');
const assert = require('node:assert');
const { createServer } = require('./index');

let server, base;

test.before(async () => {
  server = createServer();
  await new Promise((r) => server.listen(0, r));
  base = 'http://127.0.0.1:' + server.address().port;
});

test.after(() => server.close());

test('health 200 doner', async () => {
  const res = await fetch(base + '/health');
  assert.strictEqual(res.status, 200);
});

test('title yoksa 400 doner', async () => {
  const res = await fetch(base + '/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  assert.strictEqual(res.status, 400);
});