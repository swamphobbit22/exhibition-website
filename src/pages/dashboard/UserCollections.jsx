import { useState, useEffect } from 'react';
import useUserStore from "../../store/useUserStore";
import useCollectionStore from "../../store/useCollectionStore";
import { toast } from 'react-hot-toast';

const UserCollections = () => {
    const { user, isAuthenticated} = useUserStore();
    const { createCollection, collections, collectionsLoading, fetchUserCollections } = useCollectionStore();
    const [newName, setNewName] = useState('')


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

  return (
    <div>
     <div className='pt-28 flex justify-center mb-10'>
      <h2>User collections - a group of different collections</h2>
      </div>
        <div className='flex justify-center'>
          <input 
           type="text"
           id="name"
           value={newName}
           onChange={(e) => {setNewName(e.target.value)}}
           placeholder="collection name"
           className="bg-gray-600 mr-4"
          />
          <button
            type='button'
            onClick={handleCreateNewCollection}
            className='w-56 bg-amber-400 hover:bg-amber-600 cursor-pointer rounded-full'
          >
            Create new collection
          </button>
        </div>

        <div>
          <h3 className="flex justify-center items-center">Here are your collections</h3>
          {collectionsLoading ? ( 
            <p>Loading collections...</p>
          ): (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6 gap-4 mx-4 sm:mx-10">
              {collections.length === 0 ? ( 
                <p>There are no collections yet</p>
              ) : (
               
                collections.map(collection => (
                  <div 
                  key={collection.id}
                  className="border-2 w-64 h-64 rounded-lg p-4 flex flex-col justify-between"
                  >
                  <div>
                    <h4 className="text-lg font-semibold text-center">{collection.name}</h4>
                    <p className="text-sm text-center text-gray-500 mt-1">Created: {new Date(collection.created_at).toLocaleDateString()}</p>  
                  </div>
                    <button className="self-center mt-4 px-4 py-1 border rounded text-sm">
                      Delete Collection
                    </button>
                  </div>
                ))
                
              )}
            </div>
          )}

        </div>
      </div>
  )
}

export default UserCollections
