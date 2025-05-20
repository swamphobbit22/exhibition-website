import axios from 'axios'

// Source: Smithsonian
const baseUrl = 'https://api.si.edu/openaccess/api/v1.0';
const API_KEY = import.meta.env.VITE_API_KEY;

const smithApi = async(query) => {
      const searchResults = await axios.get(`${baseUrl}/search`, {
        params: {
          api_key: API_KEY,
          q: query,
          start: 0,
          rows: 10,
        }
      })

      console.log(searchResults.data.response?.rows)
      return searchResults.data.response?.rows || [];
    }


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


export{ smithApi }

//, getArtWork, getArtWorks, getCategory