require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

async function validateApiKey(req, res, next) {
  if (!req.query.api_key || req.query.api_key != process.env.API_KEY) {
    return res.status(401).json({ error: 'forbidden' });
  }

  next();
}

app.use(validateApiKey);

app.get('/csfd/search', async (req, res) => {
  try {
    const search = req.query.term;

    const JSONdb = require('simple-json-db');
    const db = new JSONdb(path.join(__dirname, '/data/db'));

    if (db.has(search)) {
      return res.json(db.get(search));
    }

    const csfd = require('csfd-api');
    const slug = require('slug');

    const results = await csfd.search(search);

    const matching = results.films.filter((f) => {
      return slug(f.name) == slug(search);
    });

    const firstResult = matching.length ? matching[0] : results.films[0];

    if (firstResult) {
      const film = await csfd.film(firstResult.id);

      const result = {
        data: film,
        meta: { term: search, found: results.films.length, exact_match: matching.length == 1 },
      };

      db.set(search, result);

      return res.json(result);
    }

    return res.status(404).json({ error: 'not found' });
  } catch (e) {
    return res.status(500).json({ error: e.message, code: 500 });
  }
});

// error handler
app.use(function (err, req, res, next) {
  res.status(400).send(err.message);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
