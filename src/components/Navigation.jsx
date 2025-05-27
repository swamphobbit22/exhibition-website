import { useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Images, User, LogOut} from 'lucide-react'
import MuseumIcon from '@mui/icons-material/Museum';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import CollectionsIcon from '@mui/icons-material/Collections';
import  AuthModal  from './AuthModal'

const Navigation = () => {
    //user state here
    const [showAuthModal, setShowAuthModal] = useState(false);

    //handle sign out

  return (
    <>
       <nav className="fixed top-0 w-full backdrop-blur-lg z-50 bg-white-800/20  ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">

              {/* logo */}
              <Link to="/" className="flex items-center space-x-2">
                <MuseumIcon fontSize="large"/>
                <span className="text-xl font-bold">Virtual Exhibition Centre</span>
              </Link>

              {/* Nav links */}
              <div className="flex-1 flex justify-center space-x-8 text-gray-800">
                <NavLink to="/showcase"  className='text-white'><Images /> Showcase</NavLink>
                
                {/* remove any remaining query strings from search in url */}
                <NavLink 
                  to="/browse"  
                  className='text-white'

                  >
                  <ImageSearchIcon /> 
                  Browse
                </NavLink>
                <NavLink to="/collections"  className='text-white'><CollectionsIcon /> Collections</NavLink>
                {/* link to users collections here */}
              </div>


              {/* user email and sign out */}
              <div className="flex items-center space-x-4 text-grey-300">
                <span>this will be the user email when logged in</span>
                <button
                // onClick={() => signoutfunctiongoeshere()}
                className="flex items-center space-x-1 text-gray-800 hover:text-white transition-colors"
                >
                <LogOut className="w-5 h-5"/>
                <span className="text-sm text-gray-300 cursor-pointer">Sign Out</span>
                </button>
              </div>

              {/* user sign and sign up - get the user id*/}
              
              <button
              onClick={ () => setShowAuthModal(true)}
              className="flex items-center space-x-1 text-gray-800 hover:text-white transition-colors"
              >
              <User className="w-5 h-5"/>
              <span className="text-sm text-gray-300 cursor-pointer">Sign In</span>
            </button>


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