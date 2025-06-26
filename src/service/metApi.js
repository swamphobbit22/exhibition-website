import axios from 'axios'

// const baseUrl = 'https://collectionapi.metmuseum.org/public/collection/v1';
//no longer used as it is now coming from serverless function in api/met

const artworkCache = new Map();

const metApi = async(query) => {
      const searchResults = await axios.get(`/api/met`, {
        params: {
          q: query
        }
      })

      return searchResults.data;
    }

const getMetArtWorkById = async(objectId) => {
  if (artworkCache.has(objectId)) {
    return artworkCache.get(objectId)
  }

  try {
   const res = await axios.get(`/api/met`, {params: { id: objectId }});
   artworkCache.set(objectId, res.data);
   return res.data;
   
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        return null;
      }
      // Handle 500 errors specifically
      if (error.response.status === 500) {
        console.error(`Met API error for ${objectId}:`, error.response.data.error);
        return null;
      }
    }
    console.error(`Unexpected error for artwork ${objectId}:`, error.message);
    throw error;
  }
}

const getArtWorks = async(objectIds) => {
  if(!Array.isArray(objectIds)) return [];

  const BATCH_SIZE = 10;
  const results = [];
  
  for (let i = 0; i < objectIds.length; i += BATCH_SIZE) {
    const batch = objectIds.slice(i, i + BATCH_SIZE);

    // delay added to help resolve metapi limiting issues
    if (i > 0) await new Promise(resolve => setTimeout(resolve, 500));

    const batchResults = await Promise.allSettled(
      batch.map(id => getMetArtWorkById(id).catch(() => null))
    );
    
    // Only keep successful results with images
    const validArtworks = batchResults
      .filter(result => 
        result.status === 'fulfilled' && 
        result.value?.primaryImage &&
        result.value?.primaryImage.trim() !== ''
      )
      .map(result => result.value);
    
    results.push(...validArtworks);
    
    if (results.length >= 200) break; 
  }
  
  return results;
}


export{metApi, getMetArtWorkById, getArtWorks}
