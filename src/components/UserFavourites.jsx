import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import  useUserStore  from '../store/useUserStore'
import useFavouritesStore from '../store/useFavouritesStore';
import { removeAllFavourites } from '../utils/favouritesUtils' 


const UserFavourites = () => {
const { user } = useUserStore()
const navigate = useNavigate();
const { favourites,  favouritesLoading, fetchUserFavourites } = useFavouritesStore();

  useEffect(() => {
    if(user?.id) {
      fetchUserFavourites(user.id);
    }
  }, [user?.id, fetchUserFavourites]);

  // if (!user?.id) return null;
  if (!isAuthenticated) return null;

  return (
      <div className='mb-10 lg:mx-10'>
        <div className='flex flex-row justify-between mx-4 lg:mx-10'>
            <h3 className="mt-4 text-left md:text-2xl font-semibold text-[var(--text-accent)]">
             Your Favourited Items
            </h3>  
            <button
              onClick={() => removeAllFavourites(user.id)}
              className='px-2 py-1 cursor-pointer rounded-full font-semibold bg-[var(--accent-primary)] text-[var(--button-text)] hover:bg-[var(--accent-secondary)]'>
              Clear all Favourites
            </button>
        </div>
       
          {favouritesLoading ? ( 
            <p>Loading favourites...</p>
          ): (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6 gap-4 sm:mx-5">
              {favourites.length === 0 ? ( 
                <p className=' text-center text-[var(--text-primary)] text-lg'>You don't have any favourites yet!</p>
              ) : ( 
                favourites.map(fave => (
                  <div 
                    key={fave.id}
                    className=" border-2 border-[var(--border-accent)] text-[var(--text-secondary)] bg-shadow max-w-full h-auto md:w-72 md:h-auto rounded-lg p-2 mx-4 flex flex-col justify-between relative overflow-hidden cursor-pointer"
                  >
                    <img 
                      src={fave.image_url} 
                      alt={fave.title}
                      onClick={() => navigate(`/detail/${fave.object_id}?source=${fave.source}&from=userhome`)}
                      className='w-full h-64 object-cover object-center'
                    />
                    <div>
                      <p className='mt-2'>Title: {fave.title || 'Unknown'}</p>
                      <p>Source: {fave.source}</p>
                      <p>Added at: {new Date(fave.added_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))  
              )}
            </div>
          )}
      </div>
  )
}

export default UserFavourites;
