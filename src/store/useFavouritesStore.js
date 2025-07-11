import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient'

const useFavouritesStore = create ((set, get) => ({
    favourites: [],
    favouritesLoading: false,
    error: null,

    setError: (error) => set ({ error }),

    // fetch user favourites
    // addtofavourites
    // remove from favourites
    // isfavourited

    addToFavourites: async (objectId, userId, source, title, image_url) => {
        // convert all ids to string (becauase the smithsonian is a string) - this could now be removed as we are doing it in the transform functions
        const stringId =  objectId.toString();
        
        if(!userId) {
            set({ error: 'Please sign in to create a collection'});
            return false;
        }


        set({ favouritesLoading: true, error: null})

        try {
            const { data, error } = await supabase
            .from('favourites')
                .insert([{
                    object_id: stringId,
                    user_id: userId,
                    source: source,
                    title: title,
                    image_url: image_url
                }])

            if(error) {
                set({ error: 'Failed to add to favourites', favouritesLoading: false});
                throw error;
            }

            set({favouritesLoading: false});
            return true;

        } catch (error) {
            if (error) {
                set({error: 'Failed to favourite the item', favouritesLoading: false});
                return false;
            }  
        }
    },


    fetchUserFavourites: async (userId) => {
        if(!userId) {
            set({ error: 'No user ID provided' });
            return false;
        }

        set({ favouritesLoading: true, error: null})

        try {
            const { data, error } = await supabase
            .from('favourites')
            .select('*')
            .eq('user_id', userId)
            .order('added_at', {ascending: false})

            if(error) {
                set({error: 'Failed to fetch favourites', favouritesLoading: false})
                return false;
            }

            set({ favourites:data, favouritesLoading: false});
            return true;
           
        } catch (error) {
            if(error) {
              set({error: 'Failed to fetch favourites', favouritesLoading: false});
              return false;
            }
        }
    },

    isFavourited: (objectId) => {
        const stringId = objectId.toString();
        const { favourites } = get();
        return favourites.some(fav => fav.object_id === stringId);
    },

    deleteFavourite: async (objectId, userId) => {
        const stringId = objectId.toString();
        set({favouritesLoading: true, error: null})

        try {
            const {error} = await supabase
            .from('favourites')
            .delete()
            .eq('object_id', stringId)
            .eq('user_id', userId)

            if(error) {
                throw error;
            }

            set({favouritesLoading: false});
            
            return true;
        } catch (error) {
            set({error: 'Failed to delete favourite - in useFavouritesStore', favouritesLoading: false});
            return false;           
        }
    },

    clearAllFavourites: async(userId) => {
        set({ favouritesLoading: true, error: null})

        try {
            const {error} = await supabase
            .from('favourites')
            .delete()
            .eq('user_id', userId)

            if(error) {
                throw error;
            }

            set({favouritesLoading: false});
            return true;

        } catch (error) {
            set({error: 'Failed to clear all favourites -  in useFavouritesStore', favouritesLoading: false});
            return false;    
        }
    },

}))

export default useFavouritesStore
