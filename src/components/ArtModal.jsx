import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import useUserStore from '../store/useUserStore';
import useCollectionStore from '../store/useCollectionStore';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-hot-toast';
import  AddCollection  from './AddCollection'

const ArtModal = ({ isOpen, onClose, artwork}) => {
    const { user, isAuthenticated} = useUserStore();
    const { createCollection, collections, collectionsLoading, fetchUserCollections, addArtworkToCollection } = useCollectionStore();
    const [selectCollection, setSelectCollection] = useState('');


    useEffect(() => {
      if(user?.id) {
        fetchUserCollections(user.id);
      }
    }, [user?.id, fetchUserCollections]);

    if (!isAuthenticated) return null;
  
    const handleSelect = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      setSelectCollection(e.target.value)
    }

    const handleSubmit = async () => {
      if(!selectCollection || !artwork?.id) return;

      const success = await addArtworkToCollection(selectCollection, {
        object_id: artwork.id,
        object_title: artwork.title,
        source_url: artwork.source_url || null ,
        thumbnail_url: artwork.imageUrl,
        notes: '',
        source: artwork.source,
      });

      if (success) {
        toast.success('Artwork added to collection')
        onClose();
      } else {
        toast.error('Unable to add artwork')
        console.error('Failed to add artwork');
      }
    };


    // console.log(selectCollection, 'selected collection')

    // console.log(artwork?.id, 'artwork ID in modal');


    if (!isOpen) return null;
    // console.log(collections, 'collections in art modal')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <div className='bg-[var(--bg-primary)] rounded-lg w-full max-w-md p-6 relative min-h-80 flex flex-col items-center border-2 border-[var(--border-accent)]'
        onClick={(e) => {
        e.stopPropagation(); 
      }}
      >
        <h4 className='text-center mb-2 text-[var(--text-primary)] font-semibold'>Add Selected Artwork to Collection</h4>
        <hr className='mb-2'/>

        <select onChange={handleSelect} className=' text-[var(--text-primary)] bg-[var(--bg-accent)] hover:bg-[var(--accent-secondary)] w-full rounded-md font-semibold border-2 border-[var(--border-accent)]'>
          <option value="Select_collection"> -- Select a collection -- </option>
          {collections.map((collection) => (<option value={collection.id}>{collection.name}</option>))}
        </select>
    
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className='absolute top-4 right-4 text-[var(--text-primary)] hover:text-[var(--accent-hover)] cursor-pointer'
        >
        <CloseIcon className='w-5 h-5'/>
        </button>

        


         <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }} 
          className='w-1/3 px-2 py-1 font-semibold text-[var(--button-text)] bg-green-600 hover:bg-green-700 rounded-full absolute bottom-20 mb-6'
        > 
          Add to collection
        </button>

        
        <AddCollection />

      </div>
    </motion.div>
  )
}

export default ArtModal