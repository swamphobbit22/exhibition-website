import { create } from 'zustand'
import { supabase } from '../lib/supabaseClient'
import useCollectionStore from './useCollectionStore'

const useUserStore = create((set, get) => ({
  user: null,
  loading: true,
  isAuthenticated: false,

  initialise: () => {
    supabase.auth.getSession().then(({ data: {session}}) => {
      set({
        user: session?.user ?? null,
        isAuthenticated: !!session?.user,
        loading: false
      })

    // get the collections if user already signedin
    if(session?.user) {
       const userId = session.user.id;

       supabase
      .from('profiles')
      .upsert({ id: userId }, { onConflict: 'id'})
      .then((error) => console.error('Profile upsert error:', error));

       supabase
        .from('profiles')
        .select('deleted_at')
        .eq('id', userId)
        .single()
        .then(({ data: profile, error }) => {
        if (error) {
          console.error('Profile fetch error', error);
          return;
        }
        
        if(profile?.deleted_at) {
          // User is soft deleted - sign them out
          supabase.auth.signOut();
          set({
            user: null,
            isAuthenticated: false
          });
        return;
      }
    });
      
    
    useCollectionStore.getState().fetchUserCollections(userId);
    }
  })


  // listening for auth changes
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      set({
        user: session?.user ?? null,
        isAuthenticated: !!session?.user,
        loading: false
      })

      if(session?.user && event === 'SIGNED_IN') {
        useCollectionStore.getState().fetchUserCollections(session.user.id)
      }
    }
  )

    // cleanup
    return () => subscription.unsubscribe()
  },

  signOut: async () => {
    await supabase.auth.signOut()
    // clear it out
    useCollectionStore.getState().clearCollection?.()
  }
}))

export default useUserStore