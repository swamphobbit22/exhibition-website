import useFavouritesStore from "../store/useFavouritesStore";
import { toast } from 'react-hot-toast';

export const removeFavourite = async ( artworkId, userId) => {
      const { fetchUserFavourites, deleteFavourite } = useFavouritesStore.getState();

      const success = await deleteFavourite(artworkId, userId);
    // console.log('Delete success:', success);

      if (success) {
        await fetchUserFavourites(userId);
        toast.success('Item removed from favourites')
      } else {
        toast.error('Failed to remove favourite')
      }    
};