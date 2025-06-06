import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import useUserStore from "../store/useUserStore";
import useCollectionStore from "../store/useCollectionStore";
import { toast } from 'react-hot-toast';

const UserCollectionsContent = () => {
    const { user, isAuthenticated} = useUserStore();
    const { collections, collectionsLoading, fetchUserCollections, deleteCollection } = useCollectionStore();
    const navigate = useNavigate();

    useEffect(() => {
      if(user?.id) {
        fetchUserCollections(user.id);
      }
    }, [user?.id, fetchUserCollections]);

    if (!isAuthenticated) return null;
    
  const handleDeleteCollection = async (collection, e) => {
      e.stopPropagation();

      if(collection.collection_artwork && collection.collection_artwork.length > 0) {
        toast.error(`Cannot delete collection. Please remove all ${collection.collection_artwork.length} artwork(s) first.`);
        return;
      }
    

      if(window.confirm(`Are you sure you want to delete "${collection.name}"? This action cannot be undone`)) {

      const success = await deleteCollection(collection.id);

      if(success) {
        toast.success('Collection was deleted sucessfully')
        console.log('Deleting collection: ', collection.id)
      } else {
        const { error } = useCollectionStore.getState();
        toast.error(error || 'Failed to delete the collection');
      }  
    }
  }   
    
  return (
    <div className='mb-10'>
          <h2 className='text-center text-3xl font-semibold mb-10 mt-8  text-[var(--text-accent)]'>Your Saved Collections</h2>  
        
          {collectionsLoading ? ( 
            <p className='text-center mt-10'>Loading collections...</p>
          ): (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-4 sm:mx-10 p-10">
              {collections.length === 0 ? ( 
                <p className='text-center text-[var(--text-primary)] text-lg'>You don't have any collections yet!</p>
              ) : (
               
                collections.map(collection => (
                  <div 
                    key={collection.id}
                    className="border-2 text-[var(--text-secondary)] bg-shadow max-w-full h-64 md:w-72 md:h-64 rounded-lg p-4 flex flex-col justify-between relative overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/dashboard/collection/${collection.id}`)}
                    style={{
                      backgroundImage: collection.previewArtwork?.imageUrl 
                        ? `url(${collection.previewArtwork.imageUrl})` 
                        : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >

                  {/* <div className="absolute inset-0 bg-black bg-opacity-10"></div> */}

                  <div className='relative z-10'>
                    <h4 className="text-lg font-bold text-center text-[var(--text-primary)] ">{collection.name}</h4>
                    <p className="text-sm text-center text-[var(--text-primary)] font-semibold mt-1">Created: {new Date(collection.created_at).toLocaleDateString()}</p>  
                  </div>
                    <button
                    type='button' 
                    onClick={(e) => handleDeleteCollection(collection, e)}
                    className="relative z-10 self-center text-[var(--button-text)] mt-4 px-4 py-1 border rounded-full text-sm border-red-600 bg-red-500 hover:bg-red-800 cursor-pointer">
                      Delete Collection
                    </button>
                  </div>
                ))
                
              )}
            </div>
          )}   
          <hr className='bg-[var(--accent-secondary)] h-1 rounded-full w-4/8 mx-auto mt-10'/>   
    </div>
  );
};

export default UserCollectionsContent;
