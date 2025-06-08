import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { stripHtmlTags } from '../utils/stripHtml';
import {truncate} from '../utils/truncate'
import  useUserStore  from '../store/useUserStore'
import useCollectionStore from '../store/useCollectionStore';
import useFavouritesStore from '../store/useFavouritesStore';
import ArtModal from './ArtModal';
import {removeArtworkFromAllCollections} from '../utils/collectionUtils';
import{removeFavourite} from '../utils/favouritesUtils'
import { toast } from 'react-hot-toast';


const ArtList = ({ artwork, detailUrl }) => {
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
    // if (!isAuthenticated) return null;    
  
     
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
  
  return (
    <>
        <div className='flex flex-col md:flex-row lg:flex-row items-center gap-3 p-3 border-b bg-[var(--bg-primary)] rounded-lg mb-6 dark:border-2 border-[var(--border-secondary)] overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 '>
          {imageUrl ? (
            <Link to={detailUrl}>
              <motion.img 
                src={imageUrl} 
                alt={artwork.title || 'untitled'} 
                initial={{ y:20, opacity: 0 }}
                animate={{ y:0,  opacity: 1 }}
                transition={{ duratation: 0.3 }}
                className='w-62 h-26 object-cover rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110' 
              />
            </Link>
            ) : (
            <div className="w-20 h-20 bg-[var(--bg-primary)] flex items-center justify-center">
              <p className="text-[var(--text-primary)]">No image available</p>
            </div>
            )}

            
            <div className='w-full md:w-5/8 text-center text-sm md:text-lg text-[var(--text-primary)] px-2 lg:ml-10  border-2 border-[var(--border-accent)] bg-[var(--bg-elevated)] rounded cursor-pointer'>
              <Link to={detailUrl}>
                <h3 className=' text-sm md:text-lg text-center font-semibold text-[var(--text-accent)]'>{truncate(stripHtmlTags(artwork.title || 'Unknown Title'))} </h3>
                <span className='text-xs md:text-sm font-semibold text-[var(--text-secondary)] italic'>{artwork.artist || 'Unknown Artist'}</span> <br />
                <span className='text-xs md:text-sm font-semibold text-[var(--text-muted)]'>{artwork.medium || 'N/A'}</span> 
              </Link>
            </div>

            <div 
              id="repo-button-heart-container" 
              className='w-full md:w-[30%] flex flex-col gap-4 self-start'
            >
            <div className='flex bg-[var(--bg-primary)] '>
              <div className='bg-[var(--bg-primary)] w-full md:p-4 text-center'>
                <span className='font-semibold text-[var(--text-secondary)] text-sm lg:text-md'>{artwork.repository}</span>
              </div>

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

              {isAuthenticated && (
                <div className='flex justify-center'>
                  <button
                    className={`place-self-center w-4/5 rounded-full font-semibold py-1 ${inCollection ? 'bg-red-500' : 'bg-green-400'} cursor-pointer`}
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

export default ArtList;