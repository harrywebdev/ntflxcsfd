const express = require('express');
const app = express();
const port = 3000;

app.get('/csfd/:search', async (req, res) => {
  const search = req.params.search;

  try {
    const csfd = require('csfd-api');
    const results = await csfd.search('matrix');

    results.films.filter((f) => {
      // TODO: find the matching one
    });

    return res.json({ term: search, results });
  } catch (e) {
    return res.json({ error: e.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
