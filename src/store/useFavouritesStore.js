import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient'

const useFavouritesStore = create ((set, get) => ({
    favourites: [],
    favouritesLoading: false,
    error: null,

    // fetch user favourites
    // addtofavourites
    // remove from favourites
    // isfavourited





}))

export default useFavouritesStore
