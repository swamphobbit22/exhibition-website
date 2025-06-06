import { useState } from 'react'
import { useQuery } from "@tanstack/react-query";
import { shuffleArray } from "../utils/shuffle";
import { fetchCombinedArtworks } from "../service/getAllArtworks";
import themesArray from '../data/themes';
import { Carousel } from "../components/Carousel";
import ClipLoader from "react-spinners/ClipLoader";


const theme = themesArray[new Date().getDate() % themesArray.length];

//to do - create a separate component to store the themes array!! store it in local storage

const Showcase = () => {
    // const [loadingMessage, setLoadingMessage] = useState("Loading...");
   
    const { data:showcaseResults, isLoading, error} = useQuery({
    queryKey: ['showcaseTheme'],
    queryFn: async () => {  
      const results = await fetchCombinedArtworks(`${theme.name}`);
      return shuffleArray(results).slice(0,20)
    }
  })


  // if(isLoading) return <div className="pt-28 flex justify-center items-center min-h-screen"><ClipLoader color="#ffa600" size={64} className="mr-2">Loading showcase...</ClipLoader>
  // </div>
  // if(error) return <div className="pt-28 flex justify-center">Error loading artwork: {error.message}</div>
  // if(!showcaseResults) return <div className="pt-28 flex justify-center">No artwork found</div>;

  return (
    <section id="showcase"  className="bg-[var(--bg-primary)] p-4">
    <div className="relative w-full min-h-screen pt-28 flex items-center flex-col text-[var(--text-primary)] ">
      <h2 className="font-serif md:text-4xl text-2xl font-bold mb-4 text-center">The Daily Showcase</h2>   
        <span className="text-[var(--text-primary)] leading-6  md:max-w-4xl mx-auto mb-4">
            Each day, we pull together a small collection of artworks based on a 
            random theme or era — anything from ancient tools to abstract painting. 
            It’s a great way to stumble across things you might not think to search for. 
            No need to log in or dig through menus — just scroll through and see what the day brings.
      </span>
      <hr className="[var(--bg-primary)]"/>
      <h3 className=" text-2xl text-center font-light mb-2">
        Todays theme is... <span className="text-2xl md:text-4xl font-semibold text-[var(--text-accent)]">{`${theme.name}`}</span>
      </h3>
      <div className="text-[var(--text-primary)] leading-6 max-w-4xl mx-auto mb-20">
        {theme.description}
      </div>

      {isLoading && (
      <div className="flex flex-col pt-10 justify-center items-center text-[var(--text-primary)]">
        <ClipLoader color="#ffa600" size={64} className="mr-2"></ClipLoader>
        <p className='text-lg font-medium'>Loading...</p>
      </div>
      )}

      <div className="mb-10 text-[var(--text-primary)]">
        {Array.isArray(showcaseResults) && showcaseResults.length > 0 && (
          <Carousel items={showcaseResults}/>
        )}      
      </div>
    </div>
    </section>
  )
}

export default Showcase;