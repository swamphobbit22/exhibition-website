import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ArtCard = ({ artwork }) => {
  const imageUrl = artwork.imageUrl;
  // console.log("Artwork source:", artwork.repository || "unknown source")
  console.log(artwork)

  return (
    <motion.div
    initial={{ y:20, opacity: 0 }}
    animate={{ y:0,  opacity: 1 }}
    transition={{ duratation: 0.3 }}
    className='bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'
    onClick={() => {}}
    >
        <div>

          {imageUrl ? (
            <Link to={artwork.id}>
              <img 
                src={imageUrl} 
                alt={artwork.title || 'untitled'} 
                className='w-full h-64 object-cover'
              />
            </Link>
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">No image available</p>
          </div>
        )}
         <div>
            <button className='bg-amber-300 w-full'>
              <span className='font-bold text-white bg-amber-500'>{artwork.repository}</span>
            </button>
        <button>favourite</button>
        <button>Share</button>
       </div>
        </div>
        <div className='text-gray-600 p-2'>
            <h3>Title: {artwork.title || 'Unknown Title'}</h3>
            <p>Artist: {artwork.artist || 'Unknown Artist'}</p>
            <p>Medium: {artwork.medium || 'N/A'}</p>
            <p></p>
        </div>

    </motion.div>
  )
}

export default ArtCard


            {/* <Link to={artwork.objectID} > */}
            {/* <img src={artwork.primaryImageSmall || artwork.content?.descriptiveNonRepeating?.online_media?.media?.[0]?.content} 
            alt={artwork.title || artwork.content?.descriptiveNonRepeating?.title?.content || 'untitled'} 
            className='w-full h-full object-cover'
            /> */}
            {/* </Link> */}

            // no longer needed - replaced with transformed data
              // Determine if this is Met or Smithsonian data
  // const isMetData = Boolean(artwork.imageUrl);
  // // const isChicagoData = Boolean(artwork.image_id)
  // const isChicagoData = artwork.repository === 'Art Institute of Chicago';
  
  
  // // Get the appropriate image URL based on data source
  // let imageUrl;
  // if (isMetData) {
  //     imageUrl = artwork.imageUrl
  //       // imageUrl = artwork.primaryImageSmall 
  //     } else if (isChicagoData) {
  //       imageUrl = artwork.imageUrl;
  //     } else {
  //       imageUrl = artwork.imageUrl;
  //       // imageUrl = artwork.content?.descriptiveNonRepeating?.online_media?.media?.[0]?.content;
  //     }

  //original code before card transform
//   import { motion } from 'framer-motion'
// import { Link } from 'react-router-dom'

// const ArtCard = ({ artwork }) => {
//   const imageUrl = artwork.imageUrl;
//   // console.log("Artwork source:", artwork.repository || "unknown source")
//   // console.log(artwork)

//   return (
//     <motion.div
//     initial={{ y:20, opacity: 0 }}
//     animate={{ y:0,  opacity: 1 }}
//     transition={{ duratation: 0.3 }}
//     className='bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'
//     onClick={() => {}}
//     >
//         <div>

//           {imageUrl ? (
//             <Link to={artwork.objectID || artwork.id}>
//               <img 
//                 src={imageUrl} 
//                 alt={artwork.title || artwork.content?.descriptiveNonRepeating?.title?.content || 'untitled'} 
//                 className='w-full h-64 object-cover'
//               />
//             </Link>
//         ) : (
//           <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
//             <p className="text-gray-500">No image available</p>
//           </div>
//         )}
//          <div>
//             <button className='bg-amber-300 w-full'>
//               <span className='font-bold text-white bg-amber-500'>{artwork.repository || artwork.content?.freetext.dataSource?.[0]?.content}</span>
//             </button>
//         <button>favourite</button>
//         <button>Share</button>
//        </div>
//         </div>
//         <div className='text-gray-600 p-2'>
//             <h3>Title: {artwork.title || artwork.content?.descriptiveNonRepeating?.title?.[0]?.title_sort}</h3>
//             <p>Artist: {artwork.artistDisplayName || artwork.content?.freetext?.name?.[0]?.content || artwork.artist_title || 'Unknown Artist'}</p>
//             <p>Medium: {artwork.medium || artwork.content?.freetext?.physicalDescription?.[0]?.content || artwork.medium_display || 'N/A'}</p>
//             <p></p>
//         </div>

//     </motion.div>
//   )
// }

// export default ArtCard