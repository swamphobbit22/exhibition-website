import React, { useState } from 'react'
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

    console.log(items)

  return (
    <div className="relative w-full md:max-w-7xl mx-auto flex items-center justify-center mt-10 mb-24 px-12 md:px-4 bg-gray-900">
      {/* previous button */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 top-16 md:top-38 md:left-[-2] z-15 bg-amber-500 text-white p-2 rounded font-extrabold  hover:bg-amber-600 transition-colors duration-200 ease-in-out"
      >
        <ArrowBackIcon />
      </button>

      <div className='flex items-center justify-center gap-2 md:gap-4'> 
        {[getIndex(-1), getIndex(0), getIndex(1)].map((index, i) => {
          const artwork = items[index];
          return (
            <div
            key={artwork.id}
            className={`text-center md:transition-all md:duration-500 md:ease-in-out transition-discrete flex flex-col
              ${i === 1 ? 'scale-125 z-10 opacity-100 shadow-2xl brightness-110' 
              : 'scale-90 opacity-15 brightness-65 hidden md:block'
              }`}
            >
              <div className='flex-shrink-0'>
              <img 
                src={artwork.imageUrl} 
                alt={artwork.title}
                className='w-60 h-48 md:w-96 md:h-72 object-cover rounded shadow object-center border-2'
              />
              </div>

              {/* check positioning of details and teh forward/back arrows */}

              <div className='bg-amber-600 rounded-md max-w-96 h-auto flex flex-col justify-start mt-2'>
                {/* title/artist data */}
                <h4 className='mt-2 text-sm font-medium text-grat-900 p-2'>
                  Title:  
                  <span className='font-semibold'> {artwork.title}</span>
                </h4>
                <hr className='w-1/2 text-center mx-auto text-amber-300'/>
                <p className='text-xs text-white p-2 '>
                  Artist: 
                  <span className='font-semibold'> {artwork.artist || 'Unknown'}</span>
                </p>
                <div>{artwork.period || 'No date available'}</div>
                <br />
                <div className='p-2'>{artwork.description ? truncate(artwork.description) : 'No description available for this item'}</div>
                <br />
                <div className='text-xs italic mb-4'>{artwork.repository || 'Source unavailable'}</div>
              </div>

              {/* description box */}
              {/* <div className='bg-gray-600 mt-2 rounded-sm text-sm flex flex-col items-center max-w-96 p-2 mb-10'> 
                <div>{artwork.period || 'No date available'}</div>
                <br />
                <div>{artwork.description ? truncate(artwork.description) : 'No description available for this item'}</div>
                <br />
                <div className='text-xs italic'>{artwork.repository || 'Source unavailable'}</div>
              </div> */}

            </div>
          );
        })}
      </div>
      {/* next button */}
      <button
       onClick={nextSlide}
       className='absolute right-2 md:right-2 top-16 md:top-38 z-15 bg-amber-500 text-white font-extrabold p-2 rounded hover:bg-amber-600 transition-colors duration-200 ease-in-out'
       >
        <ArrowForwardIcon />
      </button>
    </div>
   
  )
}


// top-1/2 transform -translate-y-1/2