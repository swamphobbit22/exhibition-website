import { useState, useCallback } from 'react'
import { metApi } from '../service/metApi';
import { Link } from 'react-router-dom'
import { getArtWorks } from '../service/metApi';
import { Search, Loader2Icon } from 'lucide-react';

const Browse = () => {
  const [searchTerm, setsearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([])
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState(null);


  const handleSubmitSearch = useCallback(async () => {
    if(!searchTerm.trim()) return; 

    setIsLoading(true);
    setError(null);

    try {
      const searchResponse = await metApi(searchTerm);
      const artresults = await getArtWorks(searchResponse.objectIDs || [] );

      setSearchResults(artresults);
      console.log(searchResults)
    } catch (error) {
      console.error(error)
      setError('Unable to fetch artworks, please try again');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }

  }, [searchTerm, setIsLoading, setError, setSearchResults, searchResults])

  return (
    <section>
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5'/>
            <input 
            type="search"
            placeholder='Search for artwork'
            value={searchTerm} 
            onChange={(e) => setsearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmitSearch()}
            className="w-1/2 pl-10 px-4 py-2 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button 
            type='submit' 
            onClick={handleSubmitSearch}
            disabled={loading}
            className='flex items-center px-6 py-2 space-x-2 bg-amber-500 rounded-lg hover:bg-amber-200 transition-colors disabled:opacity-50'
            >
              {/* add a spinner when art works load */}
              {loading ? (
                <Loader2Icon className='w-5 h-5 animate-spin'/>
              ): (
                <span>Search</span>
              )}
          </button>
        </div>

            {/* do some error checking here */}
            {/* {error && (
              <div className='text-red-400'>
                {error}
              </div>
            )} */}

            {/* map the search results in a grid pattern*/}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>  
                {searchResults.map((artwork) => (
                  <div key={artwork.objectID} className='bg-grey-200 rounded-lg overflow-hidden'>
                    <Link to={`/artwork/${artwork.objectID}`}
                    >
                      <div className='aspect-w-16 aspect-h-9'>
                        <img
                          src={artwork.primaryImageSmall}
                          alt={artwork.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </Link>
                    <div>
                      <h3>{artwork.title}</h3>
                      <p>{artwork.artistDisplayName || 'Unknown Artist'}</p>

                    </div>

                  </div>
                ))}
            </div>
        </div>
      {/* coming up too early */}
      {!loading && searchResults.length === 0 && searchTerm && (
        <div>no artwork found. Try another search term</div>
      )}
    </section>
    
  )
}

export default Browse
