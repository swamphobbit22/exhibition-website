import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import Home from  './pages/Home'
import Browse from "./pages/Browse"
import UserCollections from "./pages/dashboard/UserCollections"
import Navigation from "./components/Navigation"
import Showcase from "./pages/Showcase"
import ArtworkDetail from './pages/ArtworkDetail'
import Collection from './pages/dashboard/Collection'
import UserHome from "./pages/dashboard/UserHome"
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
          
          <Route path="/detail/:id" element={<ArtworkDetail />} />
          <Route path="/dashboard/home" element={<UserHome />} />
          <Route path="/dashboard/collections" element={<UserCollections />} />
          <Route path="/dashboard/collection/:id" element={<Collection />} />  
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