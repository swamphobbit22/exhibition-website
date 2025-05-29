import { create } from 'zustand'
import { supabase } from '../lib/supabaseClient'

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
    })

  // listening for auth changes
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      set({
        user: session?.user ?? null,
        isAuthenticated: !!session?.user,
        loading: false
      })
    }
  )

    // cleanup
    return () => subscription.unsubscribe()
  },

  signOut: async () => {
    await supabase.auth.signOut()
  }
}))

export default useUserStore