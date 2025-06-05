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

const getMetArtWorkById = async(objectId) => {
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

  const BATCH_SIZE = 10;
  const results = [];
  
  for (let i = 0; i < objectIds.length; i += BATCH_SIZE) {
    const batch = objectIds.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.allSettled(
      batch.map(id => getMetArtWorkById(id))
    );
    
    // Only keep successful results with images
    const validArtworks = batchResults
      .filter(result => result.status === 'fulfilled' && result.value?.primaryImage)
      .map(result => result.value);
    
    results.push(...validArtworks);
    
    if (results.length >= 200) break; 
  }
  
  return results;
}


export{metApi, getMetArtWorkById, getArtWorks}

// added in the limit to 100

// const artworks = await Promise.all(objectIds.slice(0, 20).map((id) => getMetArtWorkById(id)));


// const getArtWorks = async(objectIds) => {
//   if(!Array.isArray(objectIds)) return [];

//   const artworks = await Promise.all(objectIds.map((id) => getMetArtWorkById(id)));
//   return artworks.filter((artwork) => artwork && artwork.primaryImage)
//  }