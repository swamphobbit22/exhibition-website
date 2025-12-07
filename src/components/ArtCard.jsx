import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { stripHtmlTags } from '../utils/stripHtml';
import  useUserStore  from '../store/useUserStore'
import useCollectionStore from '../store/useCollectionStore';
import useFavouritesStore from '../store/useFavouritesStore';
import ArtModal from './ArtModal';
import {removeArtworkFromAllCollections} from '../utils/collectionUtils';
import{removeFavourite} from '../utils/favouritesUtils'
import { toast } from 'react-hot-toast';


const ArtCard = ({ artwork, detailUrl }) => {
  const {user, isAuthenticated} = useUserStore();
  const { isArtworkInCollection, collections } = useCollectionStore();
  const { addToFavourites, isFavourited, fetchUserFavourites } = useFavouritesStore();
  const [showArtModal, setShowArtModal] = useState(false);
  const inCollection = isArtworkInCollection(artwork.id)
  const imageUrl = artwork.imageUrl;
 
  const isInFavourites = isFavourited(artwork.id)
  
  
    useEffect(() => {
    if (user?.id) {
      fetchUserFavourites(user.id);
    }
    }, [user?.id, fetchUserFavourites]);
  
    if(!artwork) return null;
    
    const handleAddToFavourites = async () => {
    
      if(!user) {
        toast.error('Please sign in to create favourites')
        return;
      }
        
      const success = await addToFavourites(artwork.id, user.id, artwork.source, artwork.title, artwork.imageUrl);
        
      if(success) {
        toast.success('Favourite item added successfully'); 
      } else {
        const { error } = useFavouritesStore.getState();
        toast.error( error || 'Failed to add to favourites');
      }
    };

    console.log('Image URL being used:', imageUrl);
  
  return (
    <>
        <div className='bg-[var(--bg-primary)] rounded-lg mb-6 dark:border-2 border-[var(--border-secondary)] overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'>
          {imageUrl ? (
            <Link to={detailUrl}>
              <motion.img 
                src={imageUrl} 
                alt={artwork.title || 'untitled'} 
                // crossOrigin="anonymous"
                // referrerPolicy="no-referrer-when-downgrade"
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
              <span className='font-bold text-[var(--text-primary)] px-2'>{artwork.repository}</span>
              </button>

                  {/* add to favourites */}
                  <button className='mx-2 cursor-pointer'>
                    <FavoriteIcon 
                      fontSize='large'
                      onClick={async() => {
                        const currentlyFavourited = isFavourited(artwork.id);

                        if(currentlyFavourited) {
                          await removeFavourite(artwork.id, user.id)
                        } else {
                          await handleAddToFavourites()                         
                        }
                      }}
                    style={{ color: isInFavourites ? 'red' : 'gray' }}
                    />    
                  </button>

              </div>
                <div className='bg-[var(--bg-primary)] text-[var(--text-primary)] p-2'>
                <h3>Title: {stripHtmlTags(artwork.title || 'Unknown Title')}</h3>
                <p>Artist: {artwork.artist || 'Unknown Artist'}</p>
                <p>Medium: {artwork.medium || 'N/A'}</p>
              </div>

              {isAuthenticated && (
                <div className='flex justify-center'>
                  <button
                    className={`place-self-center w-1/2 my-4 rounded-full font-semibold py-1 ${inCollection ? 'bg-red-500 w-2/3' : 'bg-green-400'} cursor-pointer`}
                    onClick={async (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      if (inCollection) {
                        await removeArtworkFromAllCollections(artwork.id, user.id);
                      } else {
                        setShowArtModal(true);
                      }
                    }}
                  >
                    {inCollection ? 'Remove from Collection' : 'Add to Collection'}
                  </button>
                </div>
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