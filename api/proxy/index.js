import axios from 'axios';

export default async function handler(req, res) {
  const { imageId, size = 'full/843,' } = req.query;
  
  if (!imageId) {
    return res.status(400).json({ error: 'Missing imageId parameter' });
  }
  
  const imageUrl = `https://www.artic.edu/iiif/2/${imageId}/${size}/0/default.jpg`;
  
  try {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ArtApp/1.0)',
        'Accept': 'image/*,*/*;q=0.8',
      }
    });
    
    res.setHeader('Content-Type', response.headers['content-type']);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
}