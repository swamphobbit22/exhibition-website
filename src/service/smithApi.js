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
    console.log("Processed Smithsonian results:", processedResults)
    return processedResults;
};

export{ smithApi }

          // console.log(searchResults.data.response?.rows)
      // return searchResults.data.response?.rows || [];

// const getArtWork = async(objectId) => {
//    const res = await axios.get(`${baseUrl}/content/${objectId}` , {
//     params: { api_key: API_KEY }
//    })

//     const row = res.data?.response?.rows?.[0]

//     console.log(row?.content)

//       console.log('Full response:', JSON.stringify(res.data, null, 2));
//   return res.data;
//     // return row?.content || null;
// //    return res.data;
//  }

 
// const getArtWorks = async(objectIds) => {
//   if(!Array.isArray(objectIds)) return [];

//   const artworks = await Promise.all(
//     objectIds.slice(0, 20).map((id) => getArtWork(id))
//   );

// //   console.log(objectIds, 'object ids from getArtWorks')
// //   console.log(artworks, 'from api')

//  return artworks.filter(Boolean);

// //   return artworks.filter((artwork) => 
// //     artwork?.content?.indexedStructured?.online_media_type
// //   )
//  }


//  const getCategory = async (query) => {
//     const res = await axios.get(`${baseUrl}/terms` , {
//     params: { 
//         api_key: API_KEY,
//         q: query,
//     }
//    })

//    return res.data;
//  }




//, getArtWork, getArtWorks, getCategory


//should retrn data with images but does not
    // try {
    //     // Add filter to get only items with media
    //     const searchResults = await axios.get(`${baseUrl}/search`, {
    //         params: {
    //             api_key: API_KEY,
    //             q: query,
    //             start: 0,
    //             rows: 20,  // Increased to get more results
    //             fq: 'online_media_type:Images',  // Filter for items with images
    //             museum: 'NMAH,NPG,SAAM,FSG'  // Focus on art museums (optional)
    //         }
    //     });

    //     const rows = searchResults.data.response?.rows || [];
        
    //     // Process the results to extract image URLs
    //     const processedResults = rows.map((item) => {
    //         let imageUrl = null;
            
    //         // Try to find image in different possible locations
    //         if (item.content?.descriptiveNonRepeating?.online_media?.media) {
    //             const media = item.content.descriptiveNonRepeating.online_media.media;
    //             const imageMedia = media.find(m => 
    //                 m.type === 'Images' || 
    //                 m.type === 'Image' || 
    //                 (m.content && typeof m.content === 'string' && 
    //                  (m.content.includes('.jpg') || m.content.includes('.jpeg') || m.content.includes('.png')))
    //             );
                
    //             if (imageMedia) {
    //                 imageUrl = imageMedia.content;
    //             }
    //         }
            
    //         return {
    //             ...item,
    //             repository: 'Smithsonian',
    //             smithsonianImageUrl: imageUrl
    //         };
    //     });

    //     // Filter out items without images
    //     const resultsWithImages = processedResults.filter(item => item.smithsonianImageUrl);
        
    //     console.log("Smithsonian results with images:", resultsWithImages.length);
    //     return resultsWithImages;
        
    // } catch (error) {
    //     console.error("Error fetching from Smithsonian API:", error);
    //     return [];
    // }