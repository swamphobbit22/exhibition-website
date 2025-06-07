import { useState, useEffect, useMemo} from 'react'
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import { Search, Loader2Icon, Filter, X } from 'lucide-react';
import  ArtCard  from '../components/ArtCard';
import ArtList from '../components/ArtList';
import  Masonry  from 'react-masonry-css';
import { fetchCombinedArtworks } from '../service/getAllArtworks'
import { getPaginationData, getPageNumbers } from "../utils/pagination";
import ClipLoader from "react-spinners/ClipLoader";
// import  SourcesDropdown  from '../components/SourcesDropdown'
import ViewListIcon from '@mui/icons-material/ViewList';
import Grid4x4Icon from '@mui/icons-material/Grid4x4';
import { sortedByDate, sortedByField, sortedByNumber } from '../utils/sortBy';
import {SortDropdown, InstituteDropdown} from '../components/SortDropdown';
import {toast}  from 'react-hot-toast';



const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setsearchTerm] = useState(searchParams.get('q') || '');
  const [showFilters, setShowFilters] = useState(false)
  const [artist, setArtist] = useState(searchParams.get('artist') || '');
  const [medium, setMedium] = useState(searchParams.get('medium') || '');
  const [source, setSource] = useState(searchParams.get('source') || '');
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [viewMode, setViewMode] = useState(searchParams.get('view') || 'grid');
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [sortMethod, setSortMethod] = useState ('none'); //keep current view as default
  const [allArtworks, setAllArtworks] = useState([]);
  
  const ITEMS_PER_PAGE = 9;



  const { data:searchResults, isLoading, error, refetch } = useQuery({
    queryKey: ['artworks', searchTerm, artist, medium, source],
    queryFn: () => fetchCombinedArtworks(searchTerm, artist, medium, source),
    enabled: !!(searchTerm.trim() || artist.trim() || medium.trim()),
    staleTime: 5 * 60* 1000,
  })

  useEffect(() => {
    if(searchResults) {
      setAllArtworks(searchResults);
    }
  }, [searchResults]),

  // for search persistence + to stop viewMode resetting each time
  useEffect(() => {
    const params = {};
    if (searchTerm) params.q = searchTerm;
    if(artist) params.artist = artist;
    if(medium) params.medium = medium;
    if(source) params.source = source;
    if(currentPage > 1) params.page = currentPage;
    if(viewMode !== 'grid') params.view = viewMode;

    setSearchParams(params);

  }, [searchTerm, artist, medium, source, currentPage, setSearchParams, viewMode])


  useEffect(() => {
    let timers = [];

    if (isLoading) {
      setLoadingMessage("Artworks loading...");

      timers.push(setTimeout(() => {
        setLoadingMessage("Hold on... nearly there!");
      }, 10000));

      timers.push(setTimeout(() => {
        setLoadingMessage("Still working... not long now.");
      }, 20000));
    }

    return () => {
      timers.forEach(clearTimeout)
    };
  },[isLoading]);

  // sorting
  const sortedArtworks = useMemo(() => {  
    let result;

    switch(sortMethod) {
      case 'artistNameAsc':
        return sortedByField(allArtworks, 'artist', 'asc');
      case 'artistNameDesc':
        return sortedByField(allArtworks, 'artist', 'desc');
      case 'titleAsc':
        return sortedByField(allArtworks, 'title', 'asc');
      case 'titleDesc':
        return sortedByField(allArtworks, 'title', 'desc');
      case 'repoAsc':
        return sortedByField(allArtworks, 'repository', 'asc');
      case 'repoDesc':
        return sortedByField(allArtworks, 'repository', 'desc');
      case 'met':
      case 'smithsonian':
      case 'chicago':
        result = allArtworks.filter(artwork => artwork.source === sortMethod);
        return result.length > 0 ? result : allArtworks;
      default:
        return allArtworks;
    }
  }, [sortMethod, allArtworks]);

  //check if filtering result is empty and get some toast
  useEffect(() => {
    const isFiltering = ['met', 'chicago', 'smith'].includes(sortMethod);
    if (isFiltering) {
      const filtered = allArtworks.filter(artwork => artwork.source === sortMethod)
      if (filtered.length === 0)
     { toast("No artworks found for selected museum. Showing all results.");}
    }
  }, [sortMethod, allArtworks]);

  // pagination
  const paginationData = useMemo(() => {
    // replaced searchResults with sortedArtworks
    if(!sortedArtworks || sortedArtworks.length === 0) {
      return {
        currentItems: [],
        totalPages: 0,
        hasNextPage: false, 
        hasPreviousPage: false,
        totalItems: 0,
      }
    }

    // removed searchResults and replaced with sortedArtworks
    return getPaginationData(sortedArtworks, currentPage, ITEMS_PER_PAGE);
  }, [sortedArtworks, currentPage, ITEMS_PER_PAGE])
  

  const pageNumbers = useMemo(() => {
    return getPageNumbers(paginationData.totalPages, currentPage);
  }, [paginationData, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [sortMethod])


  useEffect(() => {
    window.scrollTo({ top:0, behavior: 'smooth'});
  }, [currentPage])


  const handleSubmitSearch =  (e) => {
    e.preventDefault();
    if(!searchTerm.trim() && !artist.trim() && !medium.trim()) return;

    setCurrentPage(1)
    refetch();
  }

  // breakpoints for my masonry grid
  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    700: 1,
    500: 1
  };

  const clearFilters = () => {
  setSortMethod('');
  // setAllArtworks('')
}


  return (
    <section className='min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]'>
      <div className="pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ">
        <form 
          action=""
          onSubmit={handleSubmitSearch}
          className='relative'
          >
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-[var(--text-accent)]">
              Discover  Art From Around the World
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto font-semibold text-lg mb-4">
              Search across collections from The Metropolitan Museum of Art, The Smithsonian, 
              and the Art Institute of Chicago all in one place.
            </p>

            <span className='text-[var(--text-secondary)] font-semibold text-lg italic'>Create an account or sign in to create your own collections and your favourite artworks</span>
          </div>

          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8'>
            {/* search box and clear button*/}
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-primary)] w-5 h-5 '/>
              <input 
                type="text"
                placeholder='Search for artwork'
                value={searchTerm} 
                onChange={(e) => setsearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmitSearch(e)}
                className="pl-10 px-4 py-2 bg-[var(--bg-accent)] border-[var(--border-accent)] border-2 rounded-lg w-full text-[var(--primary)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent-secondary)]"
                aria-label='Search artwork'
              />
              {searchTerm && (
                <button
                onClick={() => {
                  setsearchTerm('');
                  setAllArtworks('');
                }}
                className='absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full font-semibold text-[var(--text-secondary)] bg-[var(--bg-secondary)] border-2 border-[var(--border-accent)] hover:bg-[var(--accent-accent)]'
                aria-label='clear search'
                >clear</button>
              )}
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
              className='flex items-center px-6 py-2 space-x-2 text-[var(--button-text)] bg-[var(--accent-primary)] rounded-full hover:bg-[var(--accent-secondary)] transition-colors disabled:opacity-50'
              >
              {/* button spinner*/}
              {isLoading ? (
                <Loader2Icon className='w-5 h-5 animate-spin'/>
              ): (
                <span>Search</span>
              )}
            </button>
          </div>

            {/* display the filters */}
            {showFilters && (
              <div className="bg-[var(--bg-secondary)] border-2 border-[var(--border-accent)] p-4 rounded-b shadow-md mt-1 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
                <label htmlFor="" className="block text-md font-semibold mb-1">Sort
                  <SortDropdown sortMethod={sortMethod} setSortMethod={setSortMethod} />
                </label>
                <div>
                  <label htmlFor="" className="block text-md font-semibold mb-1">Filter by Repository
                    <InstituteDropdown sortMethod={sortMethod} setSortMethod={setSortMethod} />
                  </label>
                </div>

                <div className='flex flex-col gap-2'>    
                </div>

                <div className='md:col-span-3 flex justify-center'>
                  <button
                    type='button'
                    onClick={clearFilters}
                    className='text-[var(--text-primary)] text-sm flex items-center gap-1 hover:text-[var(--accent-hover)] transition-colors'
                  >
                    <X className='w-4 h-4'/>Clear Sort Options
                  </button>
                </div>
                </div> 
            )
          }              
            
            {error && (
              <div className='text-red-400'>
                {error.message || 'An error occurred while searching'}
              </div>
            )}
            </form>

            {/* display number of resulst and grid/list toggle */}
            {paginationData.totalItems > 0 && (
            <div className='flex flex-row justify-between mx-4 mt-4 lg:mx-auto'>
              <div className="text-sm text-[var(--text-secondary)]">
                Showing {paginationData.totalItems} results
              </div>
              <div className='right-0 cursor-pointer mb-4 flex justify-end'> 
                {viewMode === 'grid' ? (
                  <ViewListIcon 
                    fontSize="large" 
                    onClick={() => setViewMode('list')}
                    className="text-[var(--text-accent)] hover:text-[var(--accent-secondary)]"
                  />
                  ) : (
                  <Grid4x4Icon 
                    fontSize="large" 
                    onClick={() => setViewMode('grid')}
                    className="text-[var(--text-accent)] hover:text-[var(--accent-secondary)]"
                  />
                  )}
              </div>
            </div>
            )}

          <div>
            {isLoading && (
              <div className="flex flex-col pt-10 justify-center items-center text-[var(--text-primary)]">
                <ClipLoader color="#c19a6b" size={64} className="mr-2 mb-8"></ClipLoader>
                <p className='text-lg font-medium'>{loadingMessage}</p>
              </div>
            )}
            
            <div>
              {/* map the search results in a grid pattern*/}
              {viewMode === 'grid' ? (
              <Masonry 
                breakpointCols = {breakpointColumnsObj}
                className="flex -ml-4 w-auto gap-4 "
                columnClassName='pl-4 bg-clip-padding'
              >
                {Array.isArray(paginationData.currentItems) && paginationData.currentItems.length > 0 && paginationData.currentItems.map((artwork) =>  {
                  const detailUrl = `/detail/${artwork.id}?source=${artwork.source}&q=${encodeURIComponent(searchTerm)}&artist=${encodeURIComponent(artist)}&medium=${encodeURIComponent(medium)}&page=${currentPage}&view=${viewMode}`;
                  return (
                    <div key={artwork.id}>
                      <ArtCard
                        artwork={artwork}
                        detailUrl={detailUrl}  // pass URL as a prop to card component for search string persistence!!
                      />
                    </div>
                  );
                })}
              </Masonry>
            ) : (
              <div>
                {Array.isArray(paginationData.currentItems) && paginationData.currentItems.length > 0 && paginationData.currentItems.map((artwork) =>  {
                  const detailUrl = `/detail/${artwork.id}?source=${artwork.source}&q=${encodeURIComponent(searchTerm)}&artist=${encodeURIComponent(artist)}&medium=${encodeURIComponent(medium)}&page=${currentPage}&view=${viewMode}`;
                  return (
                    <div key={artwork.id}>
                      <ArtList
                        artwork={artwork}
                        detailUrl={detailUrl}  // pass URL as a prop to card component for search string persistence!!
                      />
                    </div>
                  );
                })}  
              </div>
              )}
            </div>

           {paginationData.totalPages > 1 && (
            <div className='w-full flex flex-wrap justify-center items-center gap-2 pb-4'>
              <button 
              type='button'
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={!paginationData.hasPreviousPage}
              className='text-xs md:text-md px-2 py-1 md:px-3 md:py-2 bg-[var(--accent-primary)] rounded disabled:opacity-50 font-bold cursor-pointer'
              >
                Previous
              </button> 
              {pageNumbers.map((num) => (
                <button
                type='button'
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`text-xs md:text-md px-2 py-1 md:px-3 md:py-2 rounded cursor-pointer border-2 ${num === currentPage ? 'bg-[var(--accent-primary)] text-[var(--text-primary)]' : 'bg-[var(--bg-accent)] text-[var(--text-secondary)]'}`}

                >
                  {num}
                </button>
              ))}

                <button 
                type='button'
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={!paginationData.hasNextPage}
                className="text-xs md:text-md px-2 py-1 md:px-3 md:py-2 bg-[var(--accent-primary)] rounded disabled:opacity-50 font-bold cursor-pointer"
              >
                Next
              </button> 
            </div>
           )}
          </div>  
        </div>
    </section> 
  )
}

export default Browse;