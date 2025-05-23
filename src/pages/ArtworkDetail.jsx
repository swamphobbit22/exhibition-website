import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { fetchArtworkById } from "../service/getArtworkById";

const ArtworkDetail = () => {
  const { id } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const source = searchParams.get('source')

const { data, isLoading, error} = useQuery({
    queryKey: ['artwork', id, source],
    queryFn: async () => {
      const results = await fetchArtworkById(id, source);
      console.log(results, 'results from artwork detail')
      return results;
    }
  })


  return (
    <section id='detail'>
      <div className="relative min-h-screen pt-20 flex items-center flex-col mx-20">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">Artwork Detail</h2> 
          <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4">This details the artwork clicked on</h3>
            <span className="text-gray-300 max-w-3xl mx-auto mb-8">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                  Deleniti nesciunt nostrum ipsa. Omnis commodi ex provident 
                  rerum, odit animi eaque nulla 
                  perspiciatis ipsa placeat aspernatur consequatur sint 
                  distinctio fugit sapiente?
            </span>

         <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Explicabo nulla velit aliquam beatae sed cupiditate deleniti id
          impedit totam perspiciatis minus amet illum quis, blanditiis possimus veritatis. Quam, ab quos.
        </div>
        <div className='text-white'>
          artwork id: {id}
          title: {data.title}
          artist: {data.artist}
          <img src={data.imageUrl} alt="" />

          {/* this needs a tidy up and proper layout and extra details adding */}
          
        </div>
      </div>
    </section>
  )
}

export default ArtworkDetail
