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
            <div className="grid grid-cols-5 mt-6 gap-4 mx-20">
              {collections.length === 0 ? ( 
                <p>There are no collections yet</p>
              ) : (
               
                collections.map(collection => (
                  <div 
                  key={collection.id}
                  className="border-2 w-64 h-64 rounded-lg p-2"
                  >
                    <h4>{collection.name}</h4>
                    <p>Created: {new Date(collection.created_at).toLocaleDateString()}</p>

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
