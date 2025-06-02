import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';
import  { fetchArtworkById }  from '../service/getArtworkById'

const useCollectionStore = create((set, get) => ( {
    collections: [],
    currentCollectionArtworks: [],
    selectedArtworks: [],
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
            // returning the ddata with the source from the collection_artwork table
            const { data, error } = await supabase
                .from('collections')
                .select(`
                    *, 
                    collection_artwork(object_id, source)
                `)
                .eq('user_id', userId)     
                .order('created_at', {ascending: false});    
            
            if (error) {
                set({error: 'Failed to fetch collections', collectionsLoading: false});
                return false;
            }

            const collectionsWithPreview = await Promise.all(
                data.map(async (collection) => {
                    if(collection.collection_artwork?.length > 0) {
                        const firstArtwork = collection.collection_artwork[0];
                        try {
                            const artworkData = await fetchArtworkById(firstArtwork.object_id, firstArtwork.source);
                            return {
                                ...collection,
                                previewArtwork: artworkData
                            };
                        } catch (error) {
                            console.error('Failed to fetch artwork for collection:', error);
                            return collection; //without preview if none
                        }
                    }
                    return collection;
                })
            );
        
            // setting the data
            set({
                collections: collectionsWithPreview || [],
                collectionsLoading: false
            });

            return true;

        } catch (error) {
            if(error) {
              set({error: 'Failed to fetch collections', collectionsLoading: false});
              return false;
            }
        }
    },

    isArtworkInCollection: (objectId) => {
        const collections = get().collections;
        return collections.some(col =>
            col.collection_artwork?.some(art => art.object_id === objectId)
        );
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
                notes: artworkData.notes || null,
                source: artworkData.source || null,
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

    fetchCollectionArtworks: async(collectionId) => {
        set({ collectionsLoading: true, error: null})

        try {
            const { data, error } = await supabase
                .from('collection_artwork')
                .select('*')
                .eq('collection_id', collectionId)

                if(error) {
                  set({error: 'Failed to fetch collection artworks', collectionsLoading: false})
                return false;
                }

                //get the artwork data from the api
                const artworkWithDetails = await Promise.all(
                    data.map(async (artwork) => {
                        try {
                            const fullArtwork = await fetchArtworkById(artwork.object_id, artwork.source);
                            return {
                                ...fullArtwork,
                                collectionArtworkId: artwork.id,
                                notes: artwork.notes
                            };
                        } catch (error) {
                            console.error('Failed to fetch artwork details:', error)
                        }
                    })
                );
                // filter nulls
                const validArtworks = artworkWithDetails.filter(artwork => artwork !== null);

                set({
                    currentCollectionArtworks: validArtworks,
                    collectionsLoading: false
                })

                return true;

        } catch (error) {
            set({ error: 'failed to fetch collection artworks', collectionsLoading: false});
            return false;
        }
    },



    removeArtworkFromCollection: async(collectionId, artworkId) => {
        set({ collectionsLoading: true, error: null})

        try {
            const {error} = await supabase
            .from('collection_artwork')
            .delete()
            .eq('collection_id', collectionId)
            .eq('object_id', artworkId)

            if(error) {
                throw error;
            }

            set({collectionsLoading: false});
            return true;

        } catch (error) {
            set({error: 'Failed to remove artwork from collection', collectionsLoading: false});
            return false;
        }
    },



    deleteCollection: async (collectionId) => {
        
    },

}))

export default useCollectionStore