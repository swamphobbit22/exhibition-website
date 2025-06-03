import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import useUserStore from "../../store/useUserStore";
import useCollectionStore from "../../store/useCollectionStore";
import { toast } from 'react-hot-toast';


const UserCollections = () => {
    const { user, isAuthenticated} = useUserStore();
    const { createCollection, collections, collectionsLoading, fetchUserCollections, deleteCollection } = useCollectionStore();
    const [newName, setNewName] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
      if(user?.id) {
        fetchUserCollections(user.id);
      }
    }, [user?.id, fetchUserCollections]);

    if (!isAuthenticated) return null;

    
    const handleCreateNewCollection = async (e) => {
      e.preventDefault();

      if(!newName.trim()) {
        toast.error('Please enter a collection name')
        return;
      }

      if(!user) {
        toast.error('Please sign in to create a collection')
        return;
      }

      const success = await createCollection(newName, user.id);

      if(success) {
        toast.success('New collection created successfully');
        setNewName('');
      } else {
        const { error } = useCollectionStore.getState();
        toast.error( error || 'Failed to create new collection');
      }
  };


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
    <section className='min-h-screen bg-[var(--bg-primary)] pb-10 pt-28'>
      <h2 className='text-center text-4xl font-semibold mb-8 text-[var(--text-primary)]'>Collections</h2>  
        <div className='flex flex-col md:flex-row justify-center items-center gap-4 text-[var(--text-primary)] mb-10'>
          <input 
           type="text"
           id="name"
           value={newName}
           onChange={(e) => {setNewName(e.target.value)}}
           placeholder="collection name"
           className="bg-var(--bg-accent)] border-2 border-[var(--border-accent)] rounded-md w-60 px-1 mr-4"
          />
          <button
            type='button'
            onClick={handleCreateNewCollection}
            className='w-auto px-3 py-2 md:py-1 md:px-2 bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] text-[var(--button-text)] cursor-pointer rounded-full'
          >
            Create new collection
          </button>
        </div>

        <div>
          <h3 className="text-center text-2xl text-[var(--text-primary)]">Your saved collections</h3>
          {collectionsLoading ? ( 
            <p>Loading collections...</p>
          ): (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6 gap-4 mx-4 sm:mx-10">
              {collections.length === 0 ? ( 
                <p className='text-center text-[var(--text-primary)] text-lg'>You don't have any collections yet!</p>
              ) : (
               
                collections.map(collection => (
                  <div 
                    key={collection.id}
                    className="border-2 text-[var(--text-secondary)] bg-shadow w-full h-64 md:w-64 md:h-64 rounded-lg p-4 flex flex-col justify-between relative overflow-hidden cursor-pointer"
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

        </div>
      </section>
  )
}

export default UserCollections
