import { Link } from 'react-router-dom'

const Footer = () => {
  return (
<div className='w-full bg-[var(--bg-primary)] border-t border-[var(--border-accent)] p-2 text-xs'>
  <p className="text-[var(--text-accent)] text-center">
    Data sources: The Metropolitan Museum of Art, Art Institute of Chicago, Smithsonian Institution. Usage complies with their open data policies.
    {' '}
    <Link to="/attribution" className="underline hover:text-blue-600">
      Learn more
    </Link>
  </p>
</div>
  )
}

export default Footer
