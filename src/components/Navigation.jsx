import { useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Images, User, LogOut} from 'lucide-react'
// import MuseumIcon from '@mui/icons-material/Museum';
// import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import CollectionsIcon from '@mui/icons-material/Collections';
import HomeIcon from '@mui/icons-material/Home';
import  AuthModal  from './AuthModal'
import  useUserStore  from '../store/useUserStore'
import { toast } from 'react-hot-toast'
import logo from '../assets/logo.png'

const Navigation = () => {
  const { user, isAuthenticated, signOut } = useUserStore()
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSignOut = async () => {
    await signOut()
    toast.success('You have successfully signed out!') 
  }

  return (
    <>
       <nav className="fixed top-0 w-full backdrop-blur-lg z-50 bg-white-800/20 py-2 border-b-2 border-amber-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center space-x-2 mt-2 mb-2">
                {/* <MuseumIcon fontSize="large" color=''/> */}
                <span className="text-2xl font-bold text-amber-400">Virtual</span>
                <img src={logo} alt="logo" className='w-14 h-10 md:w-28 md:h-16 max-w-full max-h-full'/>
                <span className="text-2xl font-bold text-amber-400">Museum</span>
              </Link>
              <div className="flex-1 flex justify-center space-x-8 text-gray-800">
                {/* <Images />  */}
                <NavLink 
                  to="/showcase" 
                  style={({ isActive }) => {return isActive ? { color: "orange" } : {};}}  
                  className='text-gray-300 text-xl'
                >
                  Daily Showcase
                </NavLink>
                
                {/* need to remove any remaining query strings from search in url    <ImageSearchIcon /> */}
                <NavLink 
                 to="/browse"  
                 style={({ isActive }) => {return isActive ? { color: "orange" } : {};}}  
                 className='text-gray-300 text-xl'
                 >
                  Search
                </NavLink>
              </div>

              {/* user email and sign out */}
              {isAuthenticated ? (
              <div className="flex items-center space-x-4 text-grey-300">
                <NavLink to="/dashboard/home"  className='text-gray-300 text-lg'><HomeIcon /></NavLink>
                <NavLink to="/dashboard/collections"  className='text-gray-300 text-lg'><CollectionsIcon /></NavLink>
                <span className="text-md text-gray-300">
                  {user?.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-gray-800 hover:text-white transition-colors"
                >
                <LogOut className="w-8 h-8 text-amber-400 hover:text-amber-600"/>
                <span className="text-lg text-gray-300  cursor-pointer hover:text-amber-400">Sign Out</span>
                </button>
              </div>
              ) : (
                // Show when user is not logged in
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-1 text-gray-800 hover:text-white transition-colors"
                >
                <User className="w-8 h-8 text-amber-400"/>
                <span className="text-lg text-gray-300 cursor-pointer hover:text-amber-400">Sign In</span>
                </button>
              )}
          </div>
        </div>
      </nav>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)}/>
    </>
  )
}

export default Navigation


//                   onClick={(e) => {
                  //   if (window.location.search) {
                  //     e.preventDefault();
                  //     window.history.replaceState(null, '', '/browse');
                  //   }  
                  // }}    