import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { stripHtmlTags } from '../utils/stripHtml';
import  useUserStore  from '../store/useUserStore'
import ArtModal from './ArtModal';

const ArtCard = ({ artwork, detailUrl }) => {
  const {isAuthenticated} = useUserStore()
  const [inCollection, setInCollection] = useState(false)
  const [showArtModal, setShowArtModal] = useState(false);

  const imageUrl = artwork.imageUrl;
  // console.log(artwork)

  return (
    <>

        <div className='bg-white rounded-lg mb-6 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'>
          {imageUrl ? (
            <Link to={detailUrl}>
              <motion.img 
                src={imageUrl} 
                alt={artwork.title || 'untitled'} 
                initial={{ y:20, opacity: 0 }}
                animate={{ y:0,  opacity: 1 }}
                transition={{ duratation: 0.3 }}
                className='w-full h-72 object-cover transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110' 
              />
            </Link>
            ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">No image available</p>
            </div>
            )}
          <div className='flex bg-amber-300'>
              <button className='bg-amber-300 w-full'>
              <span className='font-bold text-white'>{artwork.repository}</span>
              </button>

              <button className='text-red-700 mr-2 cursor-pointer'>
                <FavoriteIcon className='w-5 h-5'/>
                {/* add to favourites */}

              </button>

              <button className='text-blue-800 cursor-pointer'>
                <ShareIcon className='w-5 h-5'/>
                {/* add share */}

              </button>

              </div>
                <div className='bg-white text-gray-600 p-2'>
                <h3>Title: {stripHtmlTags(artwork.title || 'Unknown Title')}</h3>
                <p>Artist: {artwork.artist || 'Unknown Artist'}</p>
                <p>Medium: {artwork.medium || 'N/A'}</p>
              </div>
              <button
                className={`w-full ${inCollection ? 'bg-red-500' : 'bg-green-400'} cursor-pointer`}
                onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setShowArtModal(true);
                }}
                >
                {inCollection ? 'Remove from Collection' : 'Add to Collection'}
              </button>
            </div>
          <div>
        </div>
      <ArtModal 
       isOpen={showArtModal} 
       onClose={() => setShowArtModal(false)}
       artwork={artwork}
       />
    </>
  )
}

export default ArtCard;

            // <Link to={`/detail/${artwork.id}?source=${artwork.source}`}>
            //   <img 
            //     src={imageUrl} 
            //     alt={artwork.title || 'untitled'} 
            //     className='w-full h-64 object-cover'
            //      />
            // </Link>#





              // const queryParams = new URLSearchParams({
  //   source: artwork.source,
  //   q: searchTerm || '',
  //   artist: artist || '',
  //   medium: medium || '',
  //   page: page || 1,
  // })

            //             <Link to={`/detail/${artwork.id}?${queryParams.toString()}`}>
            //   <img 
            //     src={imageUrl} 
            //     alt={artwork.title || 'untitled'} 
            //     className='w-full h-64 object-cover'
            //      />
            // </Link>


    //             <motion.div
    // initial={{ y:20, opacity: 0 }}
    // animate={{ y:0,  opacity: 1 }}
    // transition={{ duratation: 0.3 }}
    // className='bg-white rounded-lg mb-6 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'
    // onClick={() => {}}
    // ></motion.div>