import { useState, useCallback } from 'react'
import { metApi, getArtWorks as getMetArtworks } from '../service/metApi';
import { smithApi } from '../service/smithApi';
import { chicagoApi } from '../service/chicagoApi';
import { Link } from 'react-router-dom'
import { Search, Loader2Icon, Filter, X } from 'lucide-react';
import  ArtCard  from '../components/ArtCard';
import  Masonry  from 'react-masonry-css';

const Browse = () => {
  const [searchTerm, setsearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([])
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false)
  const [artist, setArtist] = useState('');
  const [medium, setMedium] = useState('');
  // add state for source


  const handleSubmitSearch = useCallback(async () => {
    if(!searchTerm.trim()) return; 

    setIsLoading(true);
    setError(null);

    try {
      // combined search as default
      const [metSearch, smithSearch, chicagoSearch] = await Promise.all([
        metApi(searchTerm),
        smithApi(searchTerm),
        chicagoApi(searchTerm)
      ])

      const metIds = metSearch?.objectIDs || [];
      // const smithIds = smithSearch.map(item => item.id);

      const [metResults] = await Promise.all([
        getMetArtworks(metIds),
      ]);


      const chicagoResults = chicagoSearch;
      const smithResults = smithSearch;
      const combinedResults = [...metResults, ...smithResults, ...chicagoResults];

      setSearchResults(combinedResults)

      // replaced metApi with smithApi to test
      // const searchResponse = await metApi(searchTerm);
      // const ids = searchResponse.map(item => item.id);
      // const artresults = await getArtWorks(ids)
      // const artresults = await getArtWorks(searchResponse.objectIDs || [] );

      // console.log(searchResponse, 'inside searchResponse browse.jsx')
      // console.log(artresults, 'inside artResults browse.jsx')
      

      // setSearchResults(artresults);
    
    } catch (error) {
      console.error(error)
      setError('Unable to fetch artworks, please try again');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }

  }, [searchTerm, setIsLoading, setError, setSearchResults])

  const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1
};

const clearFilters = () => {
  setArtist(''),
  setMedium('')

}

  return (
    <section>
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <form 
          action=""
          onSubmit={handleSubmitSearch}
          className='relative'
          >
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              Discover  Art From Around the World
            </h2>
            <p className="text-gray-200 max-w-2xl mx-auto">
              Search across collections from The Metropolitan Museum of Art, Harvard Art Museums, 
              and the Art Institute of Chicago all in one place.
            </p>
          </div>

          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8'>
            {/* search box */}
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 '/>
              <input 
              type="search"
              placeholder='Search for artwork'
              value={searchTerm} 
              onChange={(e) => setsearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmitSearch()}
              className="pl-10 px-4 py-2 bg-gray-800 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label='Search artwork'
              />
            </div>

            {/* filter button */}
            <button
            type='button'
            onClick={() => setShowFilters(!showFilters)}
            className=''
            aria-label='Show filters'
            >
            <Filter className='w-5 h-5'/>
            </button>

            {/* search button */}
            <button 
              type='submit' 
              onClick={handleSubmitSearch}
              disabled={loading}
              className='flex items-center px-6 py-2 space-x-2 bg-amber-500 rounded-lg hover:bg-amber-200 transition-colors disabled:opacity-50'
              >
                {/* add a spinner to the button when artworks load */}
                {loading ? (
                  <Loader2Icon className='w-5 h-5 animate-spin'/>
                ): (
                  <span>Search</span>
                )}
            </button>
          </div>


            {/* display the filters */}
            {showFilters && (
              <div className="bg-gray-700 p-4 rounded-b shadow-md mt-1 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
                <div>
                  <label htmlFor="" className="block text-sm font-semibold mb-1">Artist</label>
                  <input 
                  type="text" 
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmitSearch()}
                  className="w-full p-2 border rounded bg-gray-800"
                  />
                </div>
                <div>
                  <label htmlFor="" className="block text-sm font-semibold mb-1">Medium</label>
                  <input type="text" 
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                  className="w-full p-2 border rounded bg-gray-800"
                  />
                </div>
               
                <div className='flex flex-wrap gap-2'>
                   <label htmlFor="" className='text-sm block semi-bold px-1'>Sources</label>
                  <button className='rounded-full transition-colors border px-2'>Metropolitan Museum</button>
                  <button className='rounded-full transition-colors border px-2'>Cleveland Museum</button>
                  <button className='rounded-full transition-colors border px-2'>Harvard Museum</button>
                  <button></button>
                </div>
                 


                <div className='md:col-span-3 flex justify-center'>
                  <button
                    type='button'
                    onClick={clearFilters}
                    className='text-gray-400 text-sm flex items-center gap-1 hover:text-amber-500 transition-colors'
                  >
                    <X className='w-4 h-4'/>Clear Filters
                  </button>
                </div>
                </div> 
            )
          }
              
            {/* do some error checking here */} 
             {error && (
              <div className='text-red-400'>
                {error}
              </div>
            )}



            {/* map the search results in a grid pattern*/}
            <Masonry 
              breakpointCols = {breakpointColumnsObj}
              className="flex -ml-4 w-auto"
              columnClassName='pl-4 bg-clip-padding'
            >
              {searchResults.map((artwork) => (
                <div key={artwork.objectID || artwork.id} className='bg-grey-800 rounded-lg overflow-hidden mb-4'>
                  <ArtCard artwork={artwork}/>
                </div>
              ))}
            </Masonry>
            </form>
        </div>

      {/* coming up too early */}
      {/* {!loading && searchResults.length === 0 && searchTerm && (
        <div>no artwork found. Try another search term</div>
      )} */}
    </section> 
  )
}

export default Browse





          //        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>  
          //       {searchResults.map((artwork) => (
          //         <div key={artwork.objectID} className='bg-grey-200 rounded-lg overflow-hidden'>
          //           <Link to={`/artwork/${artwork.objectID}`}
          //           >
          //             <div className='aspect-w-16 aspect-h-9'>
          //               <img
          //                 src={artwork.primaryImageSmall}
          //                 alt={artwork.title}
          //                 className="object-cover w-full h-full"
          //               />
          //           </div>
          //           </Link>
          //           {/* add styles */}
          //           <div>
          //             <h3>{artwork.title}</h3>
          //             <p>{artwork.artistDisplayName || 'Unknown Artist'}</p>
          //           </div>
          //       </div>
          //       ))}
          // </div>   