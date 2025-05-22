import axios from 'axios'

// Source: Smithsonian
const baseUrl = 'https://api.si.edu/openaccess/api/v1.0';
const API_KEY = import.meta.env.VITE_API_KEY;

const smithApi = async(query) => {
      const searchResults = await axios.get(`${baseUrl}/category/art_design/search`, {
        params: {
          api_key: API_KEY,
          q: query,
          start: 0,
          rows: 10,
          fq: 'online_media_type:Images',
          museum: 'NMAH, NPG, SAAM, FSG'
        }
      });
  
      const rows = searchResults.data.response?.rows || [];

      //need to extract the image urls as they are deeply nested, map it out and then dig down to image
      const processedResults = rows.map((item) => {
        let imageUrl = null;
          if (item.content?.descriptiveNonRepeating?.online_media?.media) {
            const media = item.content.descriptiveNonRepeating.online_media.media;
            const imageMedia = media.find(m => 
              m.type === 'Images' || 
              m.type === 'Image' || 
              (m.content && typeof m.content === 'string' && 
              (m.content.includes('.jpg') || m.content.includes('.jpeg') || m.content.includes('.png')))
            );
      
            if (imageMedia) {
              imageUrl = imageMedia.content;
              }
            }
            
            return {
              ...item,
              repository: 'Smithsonian',
              smithsonianImageUrl: imageUrl
            };
    });
  
    const resultsWithImages = processedResults.filter(item => item.smithsonianImageUrl);

    console.log('results with images:', resultsWithImages.length) 
    // console.log("Processed Smithsonian results:", processedResults)
    return processedResults;
};

export{ smithApi }
