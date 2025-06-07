import  { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { stripHtmlTags } from '../utils/stripHtml';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArtModal from './ArtModal';
import useCollectionStore from '../store/useCollectionStore';
import  useUserStore  from '../store/useUserStore'
import useFavouritesStore from '../store/useFavouritesStore';
import {removeArtworkFromAllCollections} from '../utils/collectionUtils'
import{removeFavourite} from '../utils/favouritesUtils'
import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
import ShareButton from './ShareButton';
import { toast } from 'react-hot-toast';

const ArtworkDisplay = ({data, backLink}) => {
  const {user, isAuthenticated} = useUserStore();
  const { isArtworkInCollection } = useCollectionStore();
  const { addToFavourites, isFavourited, fetchUserFavourites } = useFavouritesStore();
  const [showArtModal, setShowArtModal] = useState(false);
      
  const inCollection = isArtworkInCollection(data.id)
  const isInFavourites = isFavourited(data.id)

  // console.log('Current favourites array:', useFavouritesStore.getState().favourites); 
  // console.log('Looking for object_id:', data.id); 
  // console.log(isInFavourites, '<<< is in favourites')

  useEffect(() => {
  if (user?.id) {
    fetchUserFavourites(user.id);
  }
  }, [user?.id, fetchUserFavourites]);

  if(!data) return null;
  // if (!isAuthenticated) return null;    


  
  const handleAddToFavourites = async () => {
  
    if(!user) {
      toast.error('Please sign in to create add to favourites')
      return;
    }
      
    const success = await addToFavourites(data.id, user.id, data.source, data.title, data.imageUrl);
      
    if(success) {
      await fetchUserFavourites(user.id);
      toast.success('Favourite item added successfully'); 
    } else {
      const { error } = useFavouritesStore.getState();
      toast.error( error || 'Failed to add to favourites');
    }
  };


  return (
    <section id='detail' className="min-h-screen pt-28 bg-[var(--bg-primary)] max-w-full">
      <div className="pb-10 flex items-center flex-col mx-4 lg:mx-20 ">

        <div className="place-self-start">
        {backLink && (
          <Link to={backLink.to}>
             <span className="mb-4 px-4 py-2 bg-[var(--accent-primary)] text-[var(--button-text)] hover:bg-[var(--accent-secondary)] rounded-full md:ml-10"> 
              <ArrowBackIcon className="mr-1 text-[var(--text-primary)]"/>
                {backLink.label}
              </span> 
          </Link>  
        )}
        </div>

        <div className="mt-6 p-4 grid grid-cols-1 md:grid-cols-2 max-w-md md:max-w-4xl lg:max-w-5xl bg-[var(--bg-elevated)] border-2 border-[var(--border-primary)] gap-4 ">
          <div className="max-w-4xl p-4 pb-2 bg-[var(--bg-card)] border-2 border-[var(--border-secondary)] relative">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-center text-[var(--text-accent)]">
              {stripHtmlTags(data.title)}
            </h2> 
            <h3 className="font-serif md:text-xl sm:text-3xl font-semibold mb-6 text-center italic text-[var(--text-primary)]">
              {stripHtmlTags(data.artist) || 'Artist unknown'}
            </h3>
            <hr className="mb-1 mt-2 text-[var(--text-accent)] w-2/3 mx-auto"/>

            <p className="text-[var(--text-secondary)] max-w-3xl mx-auto  mt-4 pl-2">
              Date:  
              <span className='text-[var(--text-primary)]'> {data.period || 'No date available '}</span>
            </p> 

            <p className="text-[var(--text-secondary)] max-w-3xl mx-auto  pl-2">
              Culture: 
              <span className='text-[var(--text-primary)]'> {data.culture || 'Information unavailable'}</span>
            </p>

            <p className="text-[var(--text-secondary)] max-w-3xl mx-auto  pl-2 mb-2">
              Classification: 
              <span className='text-[var(--text-primary)]'> {data.classification || 'Information unavailable'}</span>
            </p>

            <p className="text-[var(--text-secondary)] max-w-3xl mx-auto pl-2 mb-2">
              Medium: <br />
              <span className='text-[var(--text-primary)]'> {data.medium || 'Medium unknown'}</span>
            </p>

            <p className="text-[var(--text-secondary)] max-w-3xl mx-auto pl-2 mb-2">
              Dimensions: <br />
              <span className='text-[var(--text-primary)]'> {data.dimensions || 'Dimensions unknown'}</span>
            </p>

            <p className="text-[var(--text-secondary)] max-w-3xl mx-auto mb-2 pl-2">
              Description: <br />
              <span className='text-[var(--text-primary)]'>{data.description || 'No description available'}</span>
            </p>
            
            <span className='mt-4 pl-2 block font-normal border-2 border-[var(--border-accent)] bg-[var(--bg-accent)]'>
              <a href={data.resourceUrl} target="_blank" rel="noopener noreferrer" className='text-[var(--text-secondary)] hover:text-[var(--accent-hover)] cursor-pointer mt-4'>
                View on the {data.repository}
              </a>
            </span>
          </div>
          
          <div className="p-2  border-2 border-[var(--border-secondary)] flex justify-center items-center rounded-lg">
            <img 
            className="bg-shadow place-self-center object-fit"
            src={data.imageUrl} alt={data.title || 'Artwork'} />  
          </div>

          <div className="w-full text-[var(--text-primary)] px-4 flex flex-col md:flex-row">
            <div className="mr-4">
              {isAuthenticated && (
                <div className='flex justify-center'>
                  <button
                    className={`place-self-center w-52 my-4 rounded-full py-1 ${inCollection ? 'bg-red-500' : 'bg-green-400'} cursor-pointer`}
                      onClick={async (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      if (inCollection) {
                        await removeArtworkFromAllCollections(data.id, user.id);
                      } else {
                        setShowArtModal(true);
                      }
                      }}
                      >
                      {inCollection ? 'Remove from Collection' : 'Add to Collection'}
                    </button>

                      {/* add to favourites */}
                      <button className='ml-3 cursor-pointer'>
                        <FavoriteIcon 
                          fontSize='large'
                          onClick={async() => {
                            const currentlyFavourited = isFavourited(data.id);

                            if(currentlyFavourited) {
                              await removeFavourite(data.id, user.id)
                            } else {
                              await handleAddToFavourites()                         
                            }
                          }}
                        style={{ color: isInFavourites ? 'red' : 'gray' }}
                        />    
                      </button>
                    </div>
                  )}
                </div> 

                <ShareButton 
                  title={data.title}
                  url={`${window.location.origin}/detail/${data.id}?source=${data.source}`}
                />

              <div>
            </div>
          </div>
        </div>
      </div>

        <ArtModal 
          isOpen={showArtModal} 
          onClose={() => setShowArtModal(false)}
          artwork={data}
        />

    </section>
  )
}

export default ArtworkDisplay;
