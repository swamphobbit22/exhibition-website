import { Link } from 'react-router-dom'

const Footer = () => {
  return (
<div className='w-full bg-[var(--bg-primary)] border-t border-[var(--border-accent)] p-2 text-xs '>
  <p className="text-[var(--text-primary)] text-center">
    Data sources: The Metropolitan Museum of Art, Art Institute of Chicago, Smithsonian Institution. Usage complies with their open data policies.
    {' '}
    <Link to="/attribution" className="underline hover:text-blue-600">
      Learn more
    </Link>
  </p>
  <p className='text-[var(--text-primary)] text-center'><a target="_blank" href="https://icons8.com/icon/NN9Zc8VGiez5/museum">Museum</a> icon by <a target="_blank" href="https://icons8.com" >Icons8</a></p>
</div>
  )
}

export default Footer
