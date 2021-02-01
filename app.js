const express = require('express');
const app = express();
const port = 3000;

app.get('/csfd/:search', async (req, res) => {
  const search = req.params.search;

  try {
    const csfd = require('csfd-api');
    const slug = require('slug');

    const results = await csfd.search(search);

    const matching = results.films.filter((f) => {
      return slug(f.name) == slug(search);
    });

    if (matching.length) {
      const film = await csfd.film(matching[0].id);

      return res.json({ data: film, meta: { term: search, found: matching.length } });
    }

    res.header('status', 404);
    return res.json({ error: 'not found' });
  } catch (e) {
    res.header('status', 500);
    return res.json({ error: e.message, code: 500 });
  }
});

// error handler
app.use(function (err, req, res, next) {
  res.status(400).send(err.message);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
