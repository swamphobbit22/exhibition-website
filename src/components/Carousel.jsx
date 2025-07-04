import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {truncate} from '../utils/truncate'


export const Carousel = ({ items }) => {
    const [current, setCurrent] = useState(0);
    const total = items.length;

    const prevSlide = () => {
      setCurrent((current - 1 + total) % total);
    };

    const nextSlide = () => {
      setCurrent((current + 1) % total);
    };

    const getIndex = (offset) => {
      return (current + offset + total) % total;
    };


  return (
    <div className="relative w-full md:max-w-7xl mx-auto flex items-center justify-center mt-10 mb-24 px-12 md:px-4">
      {/* previous button */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 top-16 md:top-38 md:left-[-2] z-15 bg-[var(--accent-primary)] text-[var(--button-text)] p-2 rounded font-extrabold  hover:bg-[var(--accent-secondary)] transition-colors duration-200 ease-in-out"
      >
        <ArrowBackIcon />
      </button>

      <div className='flex items-center justify-center gap-2 md:gap-4 bg-[var(--bg-card)]'> 
        {[getIndex(-1), getIndex(0), getIndex(1)].map((index, i) => {
          const artwork = items[index];
          return (
            <div
            key={artwork.id}
            className={`text-center md:transition-all md:duration-500 md:ease-in-out transition-discrete flex flex-col border-2 rounded border-[var(--border-accent)]
              ${i === 1 ? 'scale-125 z-10 opacity-100 shadow-2xl brightness-110' 
              : 'scale-90 opacity-10 brightness-65 hidden md:block'
              }`}
            >
              <div className='flex-shrink-0 bg-[var(--bg-secondary)] rounded-t-lg'>
                <Link to={`/detail/${artwork.id}?source=${artwork.source}&from=showcase`}>
              <img 
                src={artwork.imageUrl} 
                alt={artwork.title}
                className='w-full h-64 p-4 md:w-96 md:h-72 object-cover rounded-lg shadow object-center'
              />
              </Link>
              </div>
              
              <div className='bg-[var(--bg-card)] border-[var(--border-secondary)] border-t-2 w-full md:max-w-96 h-auto flex flex-col justify-start '>
                {/* title/artist data */}
                <h4 className='text-md text-[var(--text-primary)] pt-2 pb-1 font-semibold'>{artwork.title}</h4>
                <hr className='w-1/2 text-center mx-auto text-[var(--text-accent)]'/>
                <div className='flex flex-col text-left p-2'>
                  <p className='text-[var(--text-secondary)] text-sm '>Artist: 
                    <span className='font-semibold'> {artwork.artist || 'Unknown'}</span></p>
                  <p className='text-[var(--text-secondary)] text-sm'>Date:<span className='font-semibold'> {artwork.period || 'No date available'}</span>
                  </p>
                  <p className='text-[var(--text-secondary)] text-sm '>Description: <span className='font-semibold'> {artwork.description ? truncate(artwork.description) : 'No description available'}</span></p>
                </div>
                <hr className='text-[var(--text-accent)] opacity-50'/>
                <div className='text-xs italic py-2 bg-[var(--bg-accent)]'>{artwork.repository || 'Source unavailable'}</div>
              </div>
            </div>
          );
        })}
      </div>
      {/* next button */}
      <button
       onClick={nextSlide}
       className='absolute right-2 md:right-2 top-16 md:top-38 z-15 bg-[var(--accent-primary)] text-[var(--button-text)] font-extrabold p-2 rounded hover:bg-[var(--accent-secondary)] transition-colors duration-200 ease-in-out'
       >
        <ArrowForwardIcon />
      </button>
    </div>
   
  )
}
