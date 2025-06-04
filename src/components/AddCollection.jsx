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
  
    <form id="collection" onSubmit={handleCreateNewCollection} className="w-full flex flex-col gap-2 mt-4">
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="New collection name"
        className="w-full rounded-md font-semibold border-2 border-[var(--border-accent)] bg-[var(--bg-accent)] text-[var(--text-primary)] pl-2 py-1"
      />
      <button
        type="submit"
        className="w-full rounded-full bg-[var(--accent-primary)] text-[var(--button-text)] hover:bg-[var(--accent-secondary)] px-2 py-1"
      >
        Create Collection
      </button>
    </form>
  )
}

export default AddCollection;
