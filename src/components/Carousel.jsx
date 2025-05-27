import React, { useState } from 'react'
import { stripHtmlTags } from '../utils/stripHtml'


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
    <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center mt-10 mb-10 px-12 md:px-4">
      {/* previous button */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 md:left-0 z-10 bg-amber-500 text-white p-2 rounded font-extrabold  hover:bg-amber-600 transition-colors duration-200 ease-in-out"
      >
        &#8592;
      </button>

      <div className='flex items-center justify-center gap-2 md:gap-4'> 
        {[getIndex(-1), getIndex(0), getIndex(1)].map((index, i) => {
          const artwork = items[index];
          return (
            <div
            key={artwork.id}
            className={`text-center transition-all duration-500 ease-in-out transition-discrete flex flex-col
              ${i === 1 ? 'scale-125 z-10 opacity-100 shadow-2xl brightness-110' 
              : 'scale-90 opacity-30 brightness-75 hidden md:block'
              }`}
            >
              <div className='flex-shrink-0'>
              <img 
                src={artwork.imageUrl} 
                alt={artwork.title}
                className='w-60 h-48 md:w-96 md:h-72 object-cover rounded shadow object-center border-2'
              />
              </div>

              <div className='bg-amber-600 rounded-md max-w-96 h-auto flex flex-col justify-start mt-2'>
                <h4 className='mt-2 text-sm font-medium text-grat-900 p-2'>
                  Title:  
                  <span className='font-semibold'> {stripHtmlTags(artwork.title)}</span>
                </h4>
                <hr className='w-1/2 text-center mx-auto text-amber-300'/>
                <p className='text-xs text-white p-2 '>
                  Artist: 
                  <span className='font-semibold'> {artwork.artist || 'Unknown'}</span>
                </p>
              </div>

            </div>
          );
        })}
      </div>
      {/* next button */}
      <button
       onClick={nextSlide}
       className='absolute right-2 md:right-0 z-10 bg-amber-500 text-white font-extrabold p-2 rounded hover:bg-amber-600 transition-colors duration-200 ease-in-out'
       >
        &#8594;
      </button>
    </div>
   
  )
}


// top-1/2 transform -translate-y-1/2