import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
import { ArrowRight } from 'lucide-react';

const Home = () => {


  return (
    <section id="hero" className='bg-[var(--bg-primary)]'>
      {/* main section */}
        <motion.div 
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        className="relative min-h-screen flex items-center justify-center bg-[var(--bg-primary)] "
        >
          {/* background */}
          {/* 
          https://images.unsplash.com/photo-1734966901536-2da970db95ae?q=80&w=1983&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D*/}
          <div className="absolute inset-0 z-0" 
            style={{
            backgroundImage: 'url(/Heitere_Gebirgslandschaft_by_Paul_Klee_1929.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.8)',
          }} />

          <div className='relative z-10 text-center px-4'>
          {/* Heading */}
          <motion.h1
          initial={{ y:20, opacity:0 }}
          animate={{y:0, opacity:1 }}
          transition={{ delay: 0.2}}
          className='text-5xl md:text-7xl font-bold mb-6 text-[var(--text-primary)]'
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
            Explore art & antiquities and build your own collections
          </motion.p>

          {/* button section */}
          <motion.div
          initial={{ y:20, opacity: 0}}
          animate={{ y:0, opacity: 1}}
          transition={{ delay: 0.6 }}
          >
            <Link
              to='/browse'
              className='inline-flex items-center space-x-2 bg-[var(--accent-primary)] text-[var(--button-text)] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[var(--accent-secondary)] transition-colors'
            >
            <span>Explore</span>
            <ArrowRight className='w-5 h-5'/>
            </Link>
          </motion.div>
          </div>
          
        </motion.div>
        <div>
          <span className='text-[var(--text-primary)]'>Painting: Heitere Gebirgslandschaft by Paul Klee, 1929</span>
        </div>
    </section>
  )
}

export default Home
