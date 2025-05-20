import React from 'react'

const Showcase = () => {
  return (
    <div className="relative min-h-screen pt-20 flex items-center flex-col mx-20">
      <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">Discover Art and Antiquities from Across the Globe</h2> 
      <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4">Daily Showcase</h3>
      <span className="text-gray-500 max-w-3xl mx-auto">
            Explore a handpicked theme from The Met’s vast collection. Each day, we select a new topic — 
            like “Impressionism” or “Ancient Egypt” — and display a random 
            set of artworks connected to it. No search needed — just scroll and discover.
      </span>
    </div>
  )
}

export default Showcase
