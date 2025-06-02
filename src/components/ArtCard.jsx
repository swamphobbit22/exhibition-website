import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { stripHtmlTags } from '../utils/stripHtml';
import  useUserStore  from '../store/useUserStore'
import useCollectionStore from '../store/useCollectionStore';
import ArtModal from './ArtModal';
import {removeArtworkFromAllCollections} from '../utils/collectionUtils'

const ArtCard = ({ artwork, detailUrl }) => {
  const {user, isAuthenticated} = useUserStore();
  const { isArtworkInCollection, collections } = useCollectionStore();
  const [showArtModal, setShowArtModal] = useState(false);

  // Debug
  // console.log('User:', user?.id)
  // console.log('Collections:', collections)
  // console.log('Artwork ID:', artwork.object_id)

  const inCollection = isArtworkInCollection(artwork.id)
  // console.log('In collection result:', inCollection)
  const imageUrl = artwork.imageUrl;
  // console.log(artwork, '<<<<artwork')

  return (
    <>
        <div className='bg-[var(--bg-primary)] rounded-lg mb-6 dark:border-2 border-[var(--border-secondary)] overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'>
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
            <div className="w-full h-64 bg-[var(--bg-primary)] flex items-center justify-center">
              <p className="text-[var(--text-primary)]">No image available</p>
            </div>
            )}
          <div className='flex bg-[var(--bg-secondary)] border-2 border-[var(--border-accent)]'>
              <button className='bg-[var(--bg-accent)] w-full border-r-2 border-[var(--border-accent)]'>
              <span className='font-bold text-[var(--text-primary)] '>{artwork.repository}</span>
              </button>

              <button className='text-red-500 hover:text-red-700 mx-2 cursor-pointer'>
                <FavoriteIcon className='w-5 h-5'/>
                {/* add to favourites */}

              </button>

              <button className='text-[var(--text-muted)] hover:text-[var(--accent-hover)] cursor-pointer'>
                <ShareIcon className='w-5 h-5'/>
                {/* add share */}

              </button>

              </div>
                <div className='bg-[var(--bg-primary)] text-[var(--text-primary)] p-2'>
                <h3>Title: {stripHtmlTags(artwork.title || 'Unknown Title')}</h3>
                <p>Artist: {artwork.artist || 'Unknown Artist'}</p>
                <p>Medium: {artwork.medium || 'N/A'}</p>
              </div>

              {isAuthenticated ? (
                <div className='flex justify-center'>
                <button
                  className={`place-self-center w-1/2 my-4 rounded-full py-1 ${inCollection ? 'bg-red-500' : 'bg-green-400'} cursor-pointer`}
                  onClick={async(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if(inCollection) {
                      await removeArtworkFromAllCollections(artwork.id, user.id)
                    } else {
                      setShowArtModal(true);
                    }
                  }}
                >
                {inCollection ? 'Remove from Collection' : 'Add to Collection'}
              </button>
              </div>
               ): (
                <div></div>
               )}
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