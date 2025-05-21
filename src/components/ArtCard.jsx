import { motion } from 'framer-motion'

const ArtCard = ({ artwork }) => {
  // Determine if this is Met or Smithsonian data
  const isMetData = Boolean(artwork.primaryImageSmall);
  const isChicagoData = Boolean(artwork.image_id)
  
  
  // Get the appropriate image URL based on data source
let imageUrl;
if (isMetData) {
      imageUrl = artwork.primaryImageSmall 
    } else if (isChicagoData) {
      imageUrl = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
    } else {
      imageUrl = artwork.content?.descriptiveNonRepeating?.online_media?.media?.[0]?.content;
    }
     
  //  imageUrl = artwork.content?.descriptiveNonRepeating?.online_media?.media?.[0]?.content;

    console.log("Artwork source:", artwork.repository || "unknown source")
  //  console.log("Image path:", artwork.primaryImageSmall || (artwork.content?.descriptiveNonRepeating?.online_media?.media?.[0]?.content));
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
          <img 
            src={imageUrl} 
            alt={artwork.title || artwork.content?.descriptiveNonRepeating?.title?.content || 'untitled'} 
            className='w-full h-64 object-cover'
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">No image available</p>
          </div>
        )}
         <div>
            <button className='bg-amber-300 w-full'>
              <span className='font-bold text-white bg-amber-500'>{artwork.repository || artwork.content?.freetext.dataSource?.[0]?.content}</span>
            </button>
        <button>favourite</button>
        <button>Share</button>
       </div>
        </div>
        <div className='text-gray-600 p-2'>
            <h3>Title: {artwork.title || artwork.content?.descriptiveNonRepeating?.title?.[0]?.title_sort}</h3>
            <p>Artist: {artwork.artistDisplayName || artwork.content?.freetext?.name?.[0]?.content || artwork.artist_title || 'Unknown Artist'}</p>
            <p>Medium: {artwork.medium || artwork.content?.freetext?.physicalDescription?.[0]?.content || artwork.medium_display || 'N/A'}</p>
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

            // freetext?.title?.[0]?.content