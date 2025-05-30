import { useState, useEffect } from 'react';
import useUserStore from "../store/useUserStore";
import useCollectionStore from "../store/useCollectionStore";
import { toast } from 'react-hot-toast';

const AddCollection = () => {
    const { user, isAuthenticated} = useUserStore();
    const { createCollection, fetchUserCollections } = useCollectionStore();
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
        <div className='flex justify-center'>
          <input 
           type="text"
           id="name"
           value={newName}
           onChange={(e) => {setNewName(e.target.value)}}
           placeholder="new collection name"
           className="bg-gray-600 mr-4 mb-6 pl-2 rounded-md absolute bottom-0 left-4"
          />
          <button
            type='button'
            onClick={handleCreateNewCollection}
            className='w-52 bg-amber-600 rounded-md absolute bottom-0 mb-6 right-4'
          >
            Create New Collection
          </button>
        </div>
  )
}

export default AddCollection