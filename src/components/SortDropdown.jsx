export const SortDropdown = ({ sortMethod, setSortMethod}) => {
  return (
    <div>
        <select 
        name="sort" 
        id="sort"
        value={sortMethod}
        onChange={(e) => setSortMethod(e.target.value)}
        className="w-full p-2 border-2 rounded bg-[var(--bg-accent)]"
        >
          <option value="" disabled>-- Select a Sort Option --</option>
          <option value="none">None</option>
          <option value="artistNameAsc">Artist (A-Z)</option>  
          <option value="artistNameDesc">Artist (Z-A)</option> 
          <option value="titleAsc">Title (A-Z)</option> 
          <option value="titleDesc">Title (Z-A)</option>
          <option value="repoAsc">Repository (A-Z)</option>
          <option value="repoDesc">Repository (Z-A)</option> 

        </select>  
    </div>
  )
}


export const InstituteDropdown = ({sortMethod, setSortMethod}) => {
  return (
    <div>
        <select 
        name="sort" 
        id="sort"
        value={sortMethod}
        onChange={(e) => setSortMethod(e.target.value)}
        className="w-full p-2 border rounded bg-[var(--bg-accent)]"
        >
          <option value="" disabled>-- Select a Sort Option --</option>
          <option value="none">None</option>
          <option value="met">The Metropolitan Museum of Art</option>  
          <option value="chicago">Art Institute of Chicago</option> 
          <option value="smithsonian">The Smithsonian</option>  
        </select>  
    </div>
  )
}

