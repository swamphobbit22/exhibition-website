import { Link } from "react-router-dom"
import { stripHtmlTags } from '../utils/stripHtml';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ArtworkDisplay = ({data, backLink}) => {
  if(!data) return null;

  return (
    <section id='detail' className="min-h-screen pt-28 bg-[var(--bg-primary)] ">
      <div className="pb-10 flex items-center flex-col mx-20 ">

        <div className="place-self-start">
        {backLink && (
          <Link to={backLink.to}>
             <span className="mb-4 px-4 py-2 bg-[var(--accent-primary)] text-[var(--button-text)] hover:bg-[var(--accent-secondary)] rounded-full md:ml-10"> 
              <ArrowBackIcon className="mr-1 text-[var(--text-primary)]"/>
                {backLink.label}
              </span> 
          </Link>  
        )}
        </div>

        <div className="mt-6 grid gird-cols-1 md:grid-cols-2 max-w-md md:max-w-4xl lg:max-w-5xl bg-[var(--bg-elevated)] border-2 border-[var(--border-primary)] gap-4 ">
          <div className="max-w-4xl m-2 bg-[var(--bg-card)]">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-center text-[var(--text-primary)]">
              {stripHtmlTags(data.title)}
            </h2> 
            <h3 className="font-serif md:text-xl sm:text-3xl font-semibold mb-6 text-center italic text-[var(--text-primary)]">
              {stripHtmlTags(data.artist) || 'Artist unknown'}
            </h3>
            <hr className="mb-1 mt-2 text-[var(--text-accent)] w-2/3 mx-auto"/>
            <p className="text-[var(--text-primary)] font-semibold max-w-3xl mx-auto mb-2 mt-4 pl-2">
              {data.period || 'No date available '}
            </p> 
            <p className="text-[var(--text-primary)] max-w-3xl mx-auto mb-2 mt-4 pl-2">
              {data.medium || 'Medium unknown'}
            </p>
            {/* <hr className="mb-4 mt-4 text-[var(--text-accent)] w-2/3 mx-auto"/>  */}
            <p className="max-w-4xl mb-10 text-[var(--text-primary)] pl-2 mt-6">
              {data.description || 'no description available'}
            </p>
          </div>
          <div className="p-2 border-2 border-[var(--border-secondary)]">
            <img 
            className="bg-shadow place-self-center"
            src={data.imageUrl} alt={data.title || 'Artwork'} />  
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default ArtworkDisplay;
