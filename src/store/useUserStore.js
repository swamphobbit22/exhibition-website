import { create } from 'zustand'
import { supabase } from '../lib/supabaseClient'
import useCollectionStore from './useCollectionStore'

const useUserStore = create((set, get) => ({
  user: null,
  loading: true,
  isAuthenticated: false,

  initialise: () => {
    supabase.auth.getSession().then(({ date: {session}}) => {
      set({
        user: session?.user ?? null,
        isAuthenticated: !!session?.user,
        loading: false
      })

    // get the collections if user already signedin
    if(session?.user) {
      useCollectionStore.getState().fetchUserCollections(session.user.id)
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