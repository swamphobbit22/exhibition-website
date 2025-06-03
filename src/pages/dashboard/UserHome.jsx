import { useEffect } from 'react';
import { fetchArtworkById } from "../../service/getArtworkById";
import  useUserStore  from '../../store/useUserStore'
import useFavouritesStore from '../../store/useFavouritesStore';

const UserHome = () => {
const { user, isAuthenticated} = useUserStore()
const { favourites, favouritesLoading, fetchUserFavourites } = useFavouritesStore();

// maybe need useQuery in here????

  useEffect(() => {
    if(user?.id) {
      fetchUserFavourites(user.id);
    }
  }, [user?.id, fetchUserFavourites]);

  if (!isAuthenticated) return null;

  return (
    <section className='pt-28 pb-8 min-h-screen flex flex-col items-center bg-[var(--bg-primary)]'>
      <div className='px-2 mb-2 md:w-4xl'>
      <h2 className='text-3xl text-[var(--text-primary)] italic text-center mb-8'>Hello {user?.email}</h2>
      <h3 className='text-2xl text-[var(--text-primary)] text-center mb-2'>Welcome to your dashboard</h3>
      <p className=' text-[var(--text-primary)] '>Here you can manage your account, create and view your collections and change your settings</p>
      </div>
      <div>
       <h3 className="text-center text-2xl text-[var(--text-primary)]">Your Favourited Items</h3>
          {favouritesLoading ? ( 
            <p>Loading favourites...</p>
          ): (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6 gap-4 mx-4 sm:mx-10">
              {favourites.length === 0 ? ( 
                <p className='text-center text-[var(--text-primary)] text-lg'>You don't have any favourites yet!</p>
              ) : (
               
                favourites.map(fave => (
                  <div 
                    key={fave.id}
                    className="border-2 text-[var(--text-secondary)] bg-shadow w-full h-64 md:w-64 md:h-64 rounded-lg p-4 flex flex-col justify-between relative overflow-hidden cursor-pointer"
                    // onClick={() => navigate(`/dashboard/collection/${fave.id}`)}
                    // style={{backgroundImage: fave.image_url, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    //   backgroundImage: collection.previewArtwork?.imageUrl 
                    //     ? `url(${collection.previewArtwork.imageUrl})` 
                    //     : 'none',
                    //   backgroundSize: 'cover',
                    //   backgroundPosition: 'center'
                    // }}
                  >
                    <img src={fave.image_url} alt={fave.title} className='w-full h-full object-cover object-center'/>
                  <p>Title: {fave.title}</p>
                  <p>Source: {fave.source}</p>
                  <p>Added at: {new Date(fave.added_at).toLocaleDateString()}</p>
                  </div>
                ))  
              )}
            </div>
          )}
      </div>
    </section>
  )
}

export default UserHome
