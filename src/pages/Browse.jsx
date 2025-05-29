import { useState, useEffect, useMemo} from 'react'
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import { Search, Loader2Icon, Filter, X } from 'lucide-react';
import  ArtCard  from '../components/ArtCard';
import  Masonry  from 'react-masonry-css';
import { fetchCombinedArtworks } from '../service/getAllArtworks'
import { getPaginationData, getPageNumbers } from "../utils/pagination";
import ClipLoader from "react-spinners/ClipLoader";


const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setsearchTerm] = useState(searchParams.get('q') || '');
  const [showFilters, setShowFilters] = useState(false)
  const [artist, setArtist] = useState(searchParams.get('artist') || '');
  const [medium, setMedium] = useState(searchParams.get('medium') || '');
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  // const [itemsPerPage, setItemsPerPage] = useState(5); change to this if user decides to change the number returned
  const ITEMS_PER_PAGE = 5;


  const { data:searchResults, isLoading, error, refetch } = useQuery({
    queryKey: ['artworks', searchTerm, artist, medium],
    queryFn: () => fetchCombinedArtworks(searchTerm, artist, medium),
    enabled: !!searchTerm.trim(), 
    staleTime: 5 * 60* 1000,
  })

  // for search persistence
  useEffect(() => {
    const params = {};
    if (searchTerm) params.q = searchTerm;
    if(artist) params.artist = artist;
    if(medium) params.medium = medium;
    if(currentPage > 1) params.page = currentPage;

    setSearchParams(params);

  }, [searchTerm, artist, medium, currentPage, setSearchParams])


  const paginationData = useMemo(() => {
    if(!searchResults) {
      return {
        currentItems: [],
        totalPages: 0,
        hasNextPage: false, 
        hasPreviousPage: false,
      }
    }

    return getPaginationData(searchResults, currentPage, ITEMS_PER_PAGE);
  }, [searchResults, currentPage, ITEMS_PER_PAGE])
  

  const pageNumbers = useMemo(() => {
    return getPageNumbers(paginationData.totalPages, currentPage);
  }, [paginationData, currentPage])

  // console.log('Page numbers group:', pageNumbers);

  const handleSubmitSearch =  (e) => {
    e.preventDefault();
    if(!searchTerm.trim()) return; 
    setCurrentPage(1)
    refetch();
  }

  // breakpoints for my masonry grid
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

const clearFilters = () => {
  setArtist(''),
  setMedium('')
  //also set the repository/museum - do it later
}


  // if(isLoading) return <div className="pt-20 flex justify-center items-center "><ClipLoader color="#ffa600" size={64} className="mr-2"></ClipLoader>Un moment s'il vous plait</div>;
  // if(error) return <div className="pt-20 flex justify-center">Error loading artwork: {error.message}</div>
  // if(!searchResults) return <div className="pt-20 flex justify-center">No artwork found</div>;

  return (
    <section>
      <div className="pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
              Search across collections from The Metropolitan Museum of Art, The Smithsonian, 
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
              onKeyDown={(e) => e.key === 'Enter' && handleSubmitSearch(e)}
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
              disabled={isLoading}
              className='flex items-center px-6 py-2 space-x-2 bg-amber-500 rounded-lg hover:bg-amber-200 transition-colors disabled:opacity-50'
              >
                {/* add a spinner to the button when artworks load */}
                {isLoading ? (
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
                  <button className='rounded-full transition-colors border px-2'>Metropolitan Museum of Art</button>
                  <button className='rounded-full transition-colors border px-2'>Art Institute of Chicago</button>
                  <button className='rounded-full transition-colors border px-2'>The Smithsonian</button>
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
                {error.message || 'An error occurred while searching'}
              </div>
            )}

            {paginationData.totalItems > 0 && (
              <div className="text-sm text-gray-400 mb-4">
                Returning {paginationData.totalItems} results
              </div>
            )}

            {/* map the search results in a grid pattern*/}
            <Masonry 
              breakpointCols = {breakpointColumnsObj}
              className="flex -ml-4 w-auto gap-4"
              columnClassName='pl-4 bg-clip-padding'
            >
              {Array.isArray(paginationData.currentItems) && paginationData.currentItems.length > 0 && paginationData.currentItems.map((artwork) => (
                <div key={artwork.id} className='bg-grey-800 rounded-lg overflow-hidden mb-8 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 '>
                  <Link 
                    to={`/detail/${artwork.id}?source=${artwork.source}&q=${encodeURIComponent(searchTerm)}&artist=${encodeURIComponent(artist)}&medium=${encodeURIComponent(medium)}&page=${currentPage}`}
                  >
                    <ArtCard 
                      artwork={artwork}
                      searchTerm={searchTerm}
                      artist={artist}
                      medium={medium}
                      page={currentPage}
                    />
                  </Link>
                </div>
              ))}
            </Masonry>

           {paginationData.totalPages > 1 && (
            <div className='flex justify-center items-center gap-2 mt-6 mb-6'>
              <button 
              type='button'
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={!paginationData.hasPreviousPage}
              className='px-3 py-2 bg-amber-400 rounded disabled:opacity-50 font-bold'
              >
                Previous
              </button> 

              
              {pageNumbers.map((num) => (
                <button
                type='button'
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`px-3 py-2 rounded border-2 ${num === currentPage ? 'bg-amber-500 text-black' : 'bg-gray-800 text-white'}`}

                >
                  {num}
                </button>
              ))}

                <button 
                type='button'
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={!paginationData.hasNextPage}
                className="px-3 py-2 bg-amber-400 rounded disabled:opacity-50 font-bold"
              >
                Next
              </button> 
            </div>
           )}
            </form>
        </div>
    </section> 
  )
}

export default Browse;


  // const [searchTerm, setsearchTerm] = useState('');
  // const [showFilters, setShowFilters] = useState(false)
  // const [artist, setArtist] = useState('');
  // const [medium, setMedium] = useState('');
  // const [currentPage, setCurrentPage] = useState(1);
  // // const [itemsPerPage, setItemsPerPage] = useState(5);
  // const ITEMS_PER_PAGE = 5;