const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("../src/app");

test("health endpoint should return status ok", async (t) => {
  const server = app.listen(0);

  await new Promise((resolve) => {
    server.once("listening", resolve);
  });

  t.after(() => {
    server.closeAllConnections();

    return new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  });

  const port = server.address().port;
  const response = await fetch(
    `http://127.0.0.1:${port}/health`
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    status: "ok"
  });
});