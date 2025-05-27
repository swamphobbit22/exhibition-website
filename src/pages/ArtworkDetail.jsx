import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { fetchArtworkById } from "../service/getArtworkById";
// import { transformSmithDetailApi } from "../service/transform";
import { stripHtmlTags } from '../utils/stripHtml';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

  if(isLoading) return <div className="pt-20 flex justify-center">Loading...</div>;
  if(error) return <div className="pt-20 flex justify-center">Error loading artwork: {error.message}</div>
  if(!data) return <div className="pt-20 flex justify-center">No artwork found</div>;


  return (
    <section id='detail'>
      <div className="relative min-h-screen pt-20 flex items-center flex-col mx-20">
        <span className="text-left"><Link to={`/browse${window.location.search}`}><ArrowBackIcon />Back to Search</Link></span>
        <div className="mt-6 flex flex-col max-w-md md:max-w-3xl">
          <img 
          className=""
          src={data.imageUrl} alt={data.title || 'Artwork'} />  
        </div>
        <div className="max-w-4xl mt-6 mb-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-center">{stripHtmlTags(data.title)}</h2> 
          <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-6 text-center">{stripHtmlTags(data.artist)}</h3>
          <hr className="mb-2 mt-2"/>
         {/* <span className="text-gray-300 max-w-3xl mx-auto mb-8 mt-8">
          {data.period || 'No details available '}
          </span>  */}
       </div>
        <span className="max-w-4xl mb-10">{data.description || 'no description available'}</span>
      </div>
    </section>
  )
}

export default ArtworkDetail
