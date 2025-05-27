import { useQuery } from "@tanstack/react-query";
import { shuffleArray } from "../utils/shuffle";
import { fetchCombinedArtworks } from "../service/getAllArtworks";
import  ArtCard  from '../components/ArtCard';
import  Masonry from 'react-masonry-css';
import themesArray from '../data/themes';
import { Carousel } from "../components/Carousel";
import ClipLoader from "react-spinners/ClipLoader";


const theme = themesArray[new Date().getDate() % themesArray.length];

//create a separate component to store the themes array!! store it in local storage

const Showcase = () => {
  
    const { data:showcaseResults, isLoading, error} = useQuery({
    queryKey: ['showcaseTheme'],
    queryFn: async () => {  
      const results = await fetchCombinedArtworks(`${theme}`);
      return shuffleArray(results).slice(0,20)
    }
  })

  if(isLoading) return <div className="pt-20 flex justify-center items-center min-h-screen"><ClipLoader color="#ffa600" size={64} className="mr-2"></ClipLoader>Un moment s'il vous plait</div>;
  if(error) return <div className="pt-20 flex justify-center">Error loading artwork: {error.message}</div>
  if(!showcaseResults) return <div className="pt-20 flex justify-center">No artwork found</div>;


  return (
    <div className="relative min-h-screen pt-20 flex items-center flex-col mx-20 ">
      <h2 className="font-serif text-4xl sm:text-4xl font-bold mb-4">Welcome to our Daily Showcase</h2> 
      {/* <h3 className="font-serif text-xl sm:text-3xl font-bold mb-4">Discover Art and Antiquities from Across the Globe</h3> */}
      <span className="text-gray-300 max-w-4xl mx-auto mb-4">
            Explore our handpicked themes. Each day, we select a new topic and display a random 
            set of artworks connected to it. No search needed — just scroll and discover.
      </span>
      <h3 className="mb-8 text-2xl text-center font-light">
        Todays theme is... <br /><span className="text-4xl font-semibold">{`${theme}`}</span>
      </h3>
      <div className="mb-10">
        {Array.isArray(showcaseResults) && showcaseResults.length > 0 && (
          <Carousel items={showcaseResults}/>
        )}      
      </div>
    </div>
  )
}

export default Showcase



//   const breakpointColumnsObj = {
//   default: 3,
//   1100: 3,
//   700: 2,
//   500: 1
// };

            {/* map the search results in a grid pattern
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
            </Masonry> */}