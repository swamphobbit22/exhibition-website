import React, { useState} from 'react'
import { supabase } from '../lib/supabaseClient'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import CloseIcon from '@mui/icons-material/Close';

const AuthModal = ({ isOpen, onClose}) => {
const [isLogin, setisLogin] = useState(true);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
// const [message, setMessage] = useState('');


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
      <div className='bg-gray-800 rounded-lg w-full max-w-md p-6 relative'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-white'
        >
          <CloseIcon className='w-5 h-5'/>
        </button>

        <h2>
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
              className='w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500'
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
              className='w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500'
              required/>
          </div>

          <button 
            type='submit'
            disabled={loading}
            className='w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50'
            >
            {loading ? 'Loading...' : isLogin ? 'Sign in' : 'Create Account'}  
          </button>
        </form> 

        <button
          onClick={() => setisLogin(!isLogin)}
          className='mt-4 text-sm text-gray-400 hover:text-white'
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </motion.div>
  )
}

export default AuthModal
