import { useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GalleryVertical, BookMarked, Search, User, LogOut} from 'lucide-react'
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
                <GalleryVertical  className="w-8 h-8" />
                <span className="text-xl font-bold">Virtual Exhibition Centre</span>
              </Link>

              {/* Nav links */}
              <div className="flex-1 flex justify-center space-x-8 text-gray-800">
                <NavLink to="/browse">Browse</NavLink>
                <NavLink to="/collections">Collections</NavLink>
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