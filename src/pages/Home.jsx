import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from "framer-motion"
import { ArrowRight } from 'lucide-react';
import  AuthModal  from '../components/AuthModal';

const Home = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);


  return (
    <section id="hero" className='bg-[var(--bg-primary)]'>
      {/* main section */}
        <motion.div 
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        className="relative min-h-screen flex items-center justify-center bg-[var(--bg-primary)] py-8 md:py-12"
        >
          {/* background */}
          <div className="absolute inset-0 z-0" 
            style={{
            backgroundImage: 'url(/Heitere_Gebirgslandschaft_by_Paul_Klee_1929.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.8)',
          }} />

          <div className='relative z-10 text-center px-4 pt-10'>
          {/* Heading */}
          <motion.h1
          initial={{ y:20, opacity:0 }}
          animate={{y:0, opacity:1 }}
          transition={{ delay: 0.2}}
          className='text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-[var(--text-primary)]'
          >
            Art & Artifacts 
            <p></p>A Journey Through Time
          </motion.h1>

          {/* Sub-heading */}
          <motion.p
          initial={{ y:20, opacity:0 }}
          animate={{y:0, opacity:1 }}
          transition={{ delay: 0.4}}
          className='text-xl md:text-2xl text-[var(--text-primary)] mb-12 max-w-2xl mx-auto'
          >
            <p className='pb-2 italic'>Explore art & antiquities</p>
            <p className='text-sm md:text-lg'>Sign up for a free account to create your own collections and add your favourite artworks</p>
          </motion.p>

          {/* button section */}
          <motion.div
          initial={{ y:20, opacity: 0}}
          animate={{ y:0, opacity: 1}}
          transition={{ delay: 0.6 }}
          className='flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 place-self-center md:w-full mb-12'
          >
            <Link
              aria-label='Explore the artworks'
              to='/showcase'
              className='inline-flex items-center flex-shrink-0 space-x-2 bg-[var(--accent-primary)] text-[var(--button-text)] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[var(--accent-secondary)] transition-colors'
            >
            <span>Explore</span>
            <ArrowRight className='w-5 h-5'/>
            </Link>

            <button
              aria-label='Sign Up'
              onClick={() => setShowAuthModal(true)}
              className="inline-flex items-center justify-center w-40 flex-shrink-0 font-semibold text-[var(--button-text)] hover:text-[var(--accent-hover)] transition-colors  py-4 rounded-full cursor-pointer border-2 border-[var(--border-primary)]"
            >
            {/* <User className="w-5 h-5" /> */}
              <span className="text-lg">Sign Up</span>
            </button>
          </motion.div>
          </div>
          
        </motion.div>
        <div className='bg-orange-900 px-2'>
          <span className='text-[var(--text-primary)] text-sm'>Painting: Heitere Gebirgslandschaft by Paul Klee, 1929</span>
        </div>

        <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        defaultToSignUp={true}
        />
    </section>
  )
}

export default Home
