import axios from 'axios'

const baseUrl = 'https://collectionapi.metmuseum.org/public/collection/v1';

const metApi = async(query) => {
      const searchResults = await axios.get(`${baseUrl}/search`, {
        params: {
          q: query
        }
      })

      return searchResults.data;
    }

const getArtWork = async(objectId) => {
  try {
   const res = await axios.get(`${baseUrl}/objects/${objectId}`);
   return res.data;
  } catch (error) {
    console.warn(`Failed to fetch artwork ${objectId}:`, error.message);
    return null;
  }

 }

const getArtWorks = async(objectIds) => {
  if(!Array.isArray(objectIds)) return [];

  const artworks = await Promise.all(objectIds.slice(0, 20).map((id) => getArtWork(id)));
  return artworks.filter((artwork) => artwork && artwork.primaryImage)
 }


export{metApi, getArtWork, getArtWorks}
