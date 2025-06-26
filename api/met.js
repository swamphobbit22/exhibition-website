export default async function handler(req, res) {
  const { q, id } = req.query;
  const base = 'https://collectionapi.metmuseum.org/public/collection/v1';

  try {
    if (q) {
      const url = `${base}/search?q=${encodeURIComponent(q)}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        res.status(response.status).json({ 
          error: `MET API search error: ${response.statusText}` 
        });
        return;
      }
      
      const result = await response.json();
      res.status(200).json(result);
    } 
    else if (id) {
      const url = `${base}/objects/${id}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        res.status(response.status).json({ 
          error: `MET API object error: ${response.statusText}` 
        });
        return;
      }
      
      const result = await response.json();
      res.status(200).json(result);
    } 
    else {
      res.status(400).json({ error: 'Missing q (search) or id parameter' });
    }
  } catch (err) {
    console.error('Proxy error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

