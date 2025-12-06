import axios from 'axios';
import { Buffer } from 'buffer';

export default async function handler(req, res) {
  try {
    // Extract parameters from the URL
    const { slug } = req.query;
    const [imageId, ...sizeParts] = slug;
    
    // Reconstruct the size parameter if provided
    const size = sizeParts.length > 0 ? sizeParts.join('/') : 'full/843,';
    
    const imageUrl = `https://www.artic.edu/iiif/2/${imageId}/${size}/0/default.jpg`;
    
    // Fetch the image with proper headers
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ArtApp/1.0)',
        'Accept': 'image/*,*/*;q=0.8',
        'Referer': 'https://www.artic.edu/'
      }
    });
    
    // Set appropriate headers
    res.setHeader('Content-Type', response.headers['content-type']);
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Send the image data
    res.send(Buffer.from(response.data, 'binary'));
    
  } catch (error) {
    console.error('Image proxy error:', error.message);
    
    // Return a placeholder or error image
    res.status(error.response?.status || 500);
    
    if (error.response?.status === 404) {
      // Return a generic "not found" image
      const notFoundImage = await axios.get('https://via.placeholder.com/843x600/cccccc/969696?text=Image+Not+Available', {
        responseType: 'arraybuffer'
      });
      res.setHeader('Content-Type', 'image/png');
      res.send(Buffer.from(notFoundImage.data, 'binary'));
    } else {
      res.json({ error: 'Failed to fetch image' });
    }
  }
}

export const config = {
  api: {
    responseLimit: false, // Important for large images
    bodyParser: false,
  },
};