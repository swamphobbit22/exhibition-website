import { useState} from 'react'
import  sourcesArray   from '../data/sources'


const SourcesDropdown = () => {
    const [selected, setSelected] = useState('')
    const sources = sourcesArray;

  return (
    <div>
      <label className='block text-sm font-semibold mb-1'>Sources</label>
      <select 
        id="slect-source"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className='border rounded px-2 py-1 bg-[var(--bg-accent)] hover:bg-[var(--accent-secondary)]'
        >
         <option value="" disabled>-- Select a Source --</option>
         {sources.map((source) => (
            <option key={source} value={source}>{source}</option>
         ))}
      </select>
    </div>
  )
}

export default SourcesDropdown;
