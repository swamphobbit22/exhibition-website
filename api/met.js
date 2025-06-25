export default async function handler(req, res) {
  const { query, id } = req.query;

  const base = 'https://collectionapi.metmuseum.org/public/collection/v1';

  try {
    let result;

    if (query) {
      const search = await fetch(`${base}/search?q=${encodeURIComponent(query)}`);
      result = await search.json();
    } else if (id) {
      const object = await fetch(`${base}/objects/${encodeURIComponent(id)}`);
      result = await object.json();
    } else {
      res.status(400).json({ error: 'Missing query or id param' });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    console.error('Proxy error:', err.message);
    res.status(500).json({ error: 'Failed to fetch from Met API' });
  }
}
