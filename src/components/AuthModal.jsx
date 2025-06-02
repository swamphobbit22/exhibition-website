import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import CloseIcon from '@mui/icons-material/Close';

const AuthModal = ({ isOpen, onClose}) => {
const [isLogin, setisLogin] = useState(true);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);


const handleSubmit = async(e) => {
  e.preventDefault();
  setLoading(true)

  try {
    if(isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email, 
        password,
      });
      if (error) throw error;
      toast.success('Successfully signed in!')
    } else {
      const { data, error } = await supabase.auth.signUp({
        email, 
        password,
      });

      //check user has confirmed
      if(data.user && data.user.identities && data.user.identities.length === 0){
        toast.error('An account with this email already exists');
        return;
      }

      if(error || !data.user) {
        throw error || new Error('Signup failed: user not created.')
      } else {
        toast.success('User account created!');
      };
    }

    // reset everything
    onClose('');
    setEmail('');
    setPassword('');

    
  } catch (error) {
    toast.error(error.message);
    return;
  } finally {
    setLoading(false);
  };
};

if (!isOpen) return null;
    
  return (
    // login/signup modal
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'
    >
      <div className='bg-[var(--bg-primary)] rounded-lg w-full max-w-md p-6 relative'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 font-bold text-[var(--text-primary)] hover:text-[var(--accent-secondary)]'
        >
          <CloseIcon className='w-5 h-5'/>
        </button>

        <h2 className='text-center font-semibold mb-4 text-[var(--text-primary)]'>
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>

        {/* sign in form goes here */}
        <form 
          onSubmit={handleSubmit}
          className='space-y-4'
          >
          <div>
            <label htmlFor="email" className='block text-sm font-medium mb-1'>Email</label>
            <input 
              type="email"
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 bg-[var(--bg-accent)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-secondary)] border-2 border-[var(--border-primary)]'
              required
            />
          </div>

          <div>
            <label htmlFor="password" className='block text-sm font-medium mb-1'>Password</label>
            <input               
              type="password"
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 bg-[var(--bg-accent)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-secondary)] border-2 border-[var(--border-primary)]'
              required/>
          </div>

          <button 
            type='submit'
            disabled={loading}
            className='w-full bg-[var(--accent-primary)] font-bold text-[var(--button-text)] py-2 rounded-lg hover:bg-[var(--accent-secondary)] transition-colors disabled:opacity-50'
            >
            {loading ? 'Loading...' : isLogin ? 'Sign in' : 'Create Account'}  
          </button>
        </form> 

        <button
          onClick={() => setisLogin(!isLogin)}
          className='mt-4 text-sm text-[var(--text-primary)] hover:text-[var(--text-accent)]'
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </motion.div>
  )
}

export default AuthModal
