import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';

const useCollectionStore = create((set, get) => ( {
    collections: [],
    collectionsLoading: false,
    error: null,

    setError: (error) => set ({ error }),



    createCollection: async (collectionName, userId) => {

        if(!userId) {
            set({ error: 'Please sign in to create a collection'});
            return false;
        }

        set({ collectionsLoading: true, error: null});

        try {
         const { data, error } = await supabase
        .from('collections')
            .insert([{
                name: collectionName,
                user_id: userId,
            }])
        .select()

        if (error) {
            set({ error: 'Failed to create collection', collectionsLoading: false});
            return false;
        }

        const currentCollections = get().collections;

        // add new collection to existing array
        set({
            collections: [...currentCollections, ...data],
            collectionsLoading: false
        })

        return true;

        } catch (error) {
            set({ error: 'Failed to create new collection', collectionsLoading: false})
            return false;
        }
    },


    fetchUserCollections: async (userId) => {
        if(!userId) {
            set({ error: 'No user ID provided' });
            return false;
        }

        set({ collectionsLoading: true, error: null})

        
        try {
            // returning the ddata
            const { data, error } = await supabase
                .from('collections')
                .select('*')
                .eq('user_id', userId)     
                .order('created_at', {ascending: false});    
            
            if (error) {
                set({error: 'Failed to fetch collections', collectionsLoading: false});
                return false;
            }
        
            // setting the data
            set({
                collections: data || [],
                collectionsLoading: false
            });

            return true;

        } catch (error) {
            set({error: 'Failed to fetch collections', collectionsLoading: false});
            return false;
        }
    },

    addArtworkToCollection: async (collectionId, artworkData) => {
        set({ collectionsLoading: true, error: null})

        try {
            const { data, error } = await supabase 
            .from('collection_artwork')
            .insert([{
                collection_id: collectionId,
                object_id: artworkData.object_id,
                object_title: artworkData.object_title,
                source_url: artworkData.source_url,
                thumbnail_url: artworkData.thumbnail_url,
                notes: artworkData.notes || null
            }])

            if(error) {
                throw error;
            }

            set({collectionsLoading: false});
            return true;
        } catch (error) {
            if (error) {
                set({error: 'Failed to add artwork to collection', collectionsLoading: false});
                return false;
            }
        }
    },

    removeFromCollection: async() => {

    },

    deleteCollection: async () => {

    },

}))




export default useCollectionStore