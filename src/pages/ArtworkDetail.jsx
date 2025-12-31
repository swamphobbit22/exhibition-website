import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { fetchArtworkById } from "../service/getArtworkById";
import ArtworkDisplay from "../components/ArtworkDisplay";
import ClipLoader from "react-spinners/ClipLoader";

const ArtworkDetail = () => {
    const { id } = useParams();
    const searchParams = new URLSearchParams(location.search);
    const source = searchParams.get('source');
    const from = searchParams.get('from');

    let backLink;
    if(from === 'collections') {
        backLink = {to: '/dashboard/collections', label: 'Back to Collections'};
    // } else if (from === '/dashboard/collection/:id') {
    //     backLink = {to: `/dashboard/collection/${id}`, label: 'Back to Collection'}
    // }
    }
    else if (from === 'showcase') {
        backLink = {to: '/showcase', label: 'Back to Showcase'};
    } else if (from === 'userhome') {
        backLink = {to: '/dashboard/home', label: 'Back to Favourites'};
    } else {
        const currentParams = new URLSearchParams(window.location.search);
        backLink = {to: `/browse?${currentParams.toString()}`, label: 'Back to Search'}
        // backLink = {to: `/browse${window.location.search}`, label: 'Back to Search'};
    }
   
    const { data, isLoading, error} = useQuery({
        queryKey: ['artwork', id, source],
        queryFn: async () => await fetchArtworkById(id, source)
    })

    if(isLoading) return 
    <div className="pt-60 flex justify-center items-center text-center">
      <p className='text-center mt-10'>
        <ClipLoader color="#c19a6b" size={64} className="mr-2 mb-8"></ClipLoader>
        <br />
        Loading artwork...
      </p> 
    </div>;
    if(error) return <div className="pt-60 flex justify-center items-center">Error loading artwork: {error.message}</div>
    if(!data) return <div className="pt-60 flex justify-center items-center">No artwork found</div>;

    return <ArtworkDisplay data={data} backLink={backLink}/>
 
};

export default ArtworkDetail;
