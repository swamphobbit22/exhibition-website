import useCollectionStore from "../store/useCollectionStore";
import { toast } from 'react-hot-toast';

export const removeArtworkFromAllCollections = async (artworkId, userId) => {
    const {collections, removeArtworkFromCollection, fetchUserCollections} = useCollectionStore.getState();
    console.log(collections, 'collections')

    //locate collection firts
    const collectionsWithArtwork = collections.filter(col => col.collection_artwork?.some(art => art.object_id === artworkId));

    for (const collection of collectionsWithArtwork) {
        await removeArtworkFromCollection(collection.id, artworkId);
    }

    //refresh
    await fetchUserCollections(userId)

    toast.success('Artwork successfully removed from collection')
}