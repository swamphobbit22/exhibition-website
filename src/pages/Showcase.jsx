import { useQuery } from "@tanstack/react-query";
import { shuffleArray } from "../utils/shuffle";
import { fetchCombinedArtworks } from "../service/getAllArtworks";
import  ArtCard  from '../components/ArtCard';
import  Masonry from 'react-masonry-css';

const Showcase = () => {

    const { data:showcaseResults} = useQuery({
    queryKey: ['showcaseTheme'],
    queryFn: async () => {  
      const results = await fetchCombinedArtworks('neolithic');
      return shuffleArray(results).slice(0,12)
    }
  })

  const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1
};


  return (
    <div className="relative min-h-screen pt-20 flex items-center flex-col mx-20">
      <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">Daily Showcase</h2> 
      <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4">Discover Art and Antiquities from Across the Globe</h3>
      <span className="text-gray-500 max-w-3xl mx-auto">
            Explore a handpicked theme from The Met’s vast collection. Each day, we select a new topic — 
            like “Impressionism” or “Ancient Egypt” — and display a random 
            set of artworks connected to it. No search needed — just scroll and discover.
      </span>

      <div>
        
            {/* map the search results in a grid pattern*/}
            <Masonry 
              breakpointCols = {breakpointColumnsObj}
              className="flex -ml-4 w-auto gap-4"
              columnClassName='pl-4 bg-clip-padding'
            >
              {Array.isArray(showcaseResults) && showcaseResults.length > 0 && showcaseResults.map((artwork) => (
                  <div key={artwork.id} className='bg-grey-800 rounded-lg overflow-hidden mb-8 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 '>
                  <ArtCard artwork={artwork}/>
                </div>
              ))}
            </Masonry>
      </div>
    </div>
  )
}

export default Showcase
