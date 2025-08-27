const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.json({ ok: true, msg: 'Hello from Node.js on Kubernetes via Jenkins CI/CD' });
});

app.listen(port, () => console.log(`App listening on port ${port}`));
