import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import Home from  './pages/Home'
import Browse from "./pages/Browse"
import Collections from "./pages/Collections"
import Navigation from "./components/Navigation"
import Showcase from "./pages/Showcase"
import ArtworkDetail from './pages/ArtworkDetail'
import CollectionDetail from './pages/CollectionDetail'
import useUserStore from "./store/useUserStore"

function App() {
  const initialise = useUserStore(state => state.initialise)

  useEffect(() => {
    const cleanup = initialise()
    return cleanup
  }, [initialise])

  return (
   
    <BrowserRouter>
    <div className="min-h-screen" data-theme="dark" >
      <Navigation />
      <Toaster position='top-right' />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/browse" element={<Browse />} />
          {/* protected route here */}
          <Route path="/detail/:id" element={<ArtworkDetail />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:id" element={<CollectionDetail />} />  
        </Routes>   
        </div>
    </BrowserRouter>

  )
}

export default App

        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}

        // bg-gradient-to-br from-gray-900 to-gray-700 text-white