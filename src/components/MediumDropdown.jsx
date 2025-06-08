import { useState } from 'react'
import mediumArray from '../data/medium'

const MediumDropdown = () => {
  const [selected, setSelected] = useState('')
     const medium = mediumArray;
 
   return (
     <div>
       <label className='block text-sm font-semibold mb-1'>Medium</label>
       <select 
         id="slect-medium"
         value={selected}
         onChange={(e) => setSelected(e.target.value)}
         className='border rounded px-2 py-1 bg-[var(--bg-accent)] hover:bg-[var(--accent-secondary)]'
         >
          <option value="" disabled>-- Select a Medium --</option>
          {medium.map((medium) => (
             <option key={medium} value={medium}>{medium}</option>
          ))}
       </select>
     </div>
   )
}

export default MediumDropdown;
