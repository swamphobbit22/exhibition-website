import useFavouritesStore from "../store/useFavouritesStore";
import { toast } from 'react-hot-toast';

export const removeFavourite = async ( artworkId, userId) => {
  const { fetchUserFavourites, deleteFavourite } = useFavouritesStore.getState();

  const success = await deleteFavourite(artworkId, userId);

  if (success) {
    await fetchUserFavourites(userId);
    toast.success('Item removed from favourites')
  } else {
    toast.error('Failed to remove favourite')
  }    
};

export const removeAllFavourites = async (userId) => {
  const {fetchUserFavourites, clearAllFavourites } = useFavouritesStore.getState();

  if(window.confirm(`Are you sure you want to delete all of your favourites? This action cannot be undone`)) {

    const success = await clearAllFavourites(userId);

    if(success) {
      await fetchUserFavourites(userId);
      toast.success('All favourited items have been deleted')
    } else {
      toast.error('Failed to clear all favourites')
    }
  }
};
  