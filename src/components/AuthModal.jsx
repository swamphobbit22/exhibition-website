import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import CloseIcon from '@mui/icons-material/Close';

const AuthModal = ({ isOpen, onClose, defaultToSignUp = false}) => {
const [isLogin, setisLogin] = useState(!defaultToSignUp);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
const [showPasswordReset, setShowPasswordReset] = useState(false);
const [resetEmail, setResetEmail] = useState('');


const handleSubmit = async(e) => {
  e.preventDefault();
  setLoading(true)

  try {
    if(isLogin) {
      const { data: signInData, error } = await supabase.auth.signInWithPassword({
        email, 
        password,
      });
      if (error) throw error;
      //check that soft delete has been added before authorising
      const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('deleted_at')
      .eq('id', signInData.user.id)
      .single();
      
      if(profileError) {
        throw profileError;
      }

      if(profile?.deleted_at) {
        //sign then out
        await supabase.auth.signOut();
        throw new Error('This account has been deleted');
      }

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


const handlePasswordReset = async (e) => {
  e.preventDefault();

  const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
    redirectTo: `${window.location.origin}/reset-password`
  });

  if (error) {
    alert('Error sending reset email: ' + error.message);
  } else {
    alert('Check your email for the reset link!');
    setShowPasswordReset(false);
  }
};
    
  return (
    // login/signup modal
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'
    >
      <div className='bg-[var(--bg-primary)] rounded-lg w-full max-w-md p-6 relative border-[var(--border-accent)] border-2'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 font-bold text-[var(--text-primary)] hover:text-[var(--accent-secondary)] cursor-pointer'
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
            <label htmlFor="email" className='block text-sm font-medium mb-1 text-[var(--text-primary)]'>Email</label>
            <input 
              type="email"
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 bg-[var(--bg-accent)] text-[var(--text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-secondary)] border-2 border-[var(--border-primary)]'
              required
            />
          </div>

          <div>
            <label htmlFor="password" className='block text-sm font-medium mb-1 text-[var(--text-primary)]'>Password</label>
            <input               
              type="password"
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 bg-[var(--bg-accent)] text-[var(--text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-secondary)] border-2 border-[var(--border-primary)]'
              required/>
          </div>

          <button 
            type='submit'
            disabled={loading}
            className='w-full bg-[var(--accent-primary)] font-bold text-[var(--button-text)] py-2 rounded-lg hover:bg-[var(--accent-secondary)] transition-colors disabled:opacity-50 cursor-pointer'
            >
            {loading ? 'Loading...' : isLogin ? 'Sign in' : 'Create Account'}  
          </button>
        </form> 

        {/* Google OAuth */}
        <button
          onClick={async () => {
            const { error } = await supabase.auth.signInWithOAuth({
              provider: 'google',
            });
            if(error) {
              toast.error(error.message);
            }
          }}
          className='w-full mt-4 border border-[var(--border-primary)] rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-[var(--bg-accent)] transition-colors cursor-pointer'
        >
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5"/>
          <span className="text-[var(--text-primary)] font-medium">Continue with Google</span>
        </button>


        <button
          onClick={() => setisLogin(!isLogin)}
          className='mt-4 text-sm text-[var(--text-primary)] hover:text-[var(--text-accent)] cursor-pointer'
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </button>

        {/* for password reset */}
        {!showPasswordReset ? (
          <button
            type="button"
            onClick={() => setShowPasswordReset(true)}
            className='text-sm text-blue-500 hover:underline ml-8 cursor-pointer'
          >
            Forgot your password?
          </button>
        ) : (
          <div className='mt-4 p-4 border border-[var(--border-accent)] rounded'>
            <h3 className='text-[var(--text-primary)] font-semibold'>Reset Password</h3>
            <input 
              type="email"
              placeholder='Enter your email'
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className='w-full p-2 text-[var(--text-secondary)] border rounded border-[var(--border-secondary)] bg-[var(--bg-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-secondary)] mb-2'
            />
            <button
              onClick={handlePasswordReset}
              className='bg-[var(--accent-primary)] text-[var(--button-text)] hover:bg-[var(--accent-secondary)] px-4 py-2 rounded-lg mt-2'
            >
              Send Reset Link
            </button>
                        <button
              onClick={() => setShowPasswordReset(false)}
              className='ml-4 text-[var(--text-accent) font-semibold]'
            >
              Cancel
            </button>
          </div>

        )}
      </div>
    </motion.div>
  )
}

export default AuthModal
