import { useState} from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Images, User, LogOut, X, Menu} from 'lucide-react'
// import MuseumIcon from '@mui/icons-material/Museum';
// import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import CollectionsIcon from '@mui/icons-material/Collections';
import HomeIcon from '@mui/icons-material/Home';
import  AuthModal  from './AuthModal'
import  useUserStore  from '../store/useUserStore'
import { toast } from 'react-hot-toast'
import logo from '../assets/logo.png'
import { ThemeToggle } from './ThemeToggle';


const Navigation = () => {
  const { user, isAuthenticated, signOut } = useUserStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMobOpen, setIsMobOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut()
    toast.success('You have successfully signed out!') 
    // return to homepage
    navigate('/')
  }

  return (
    <>
       <nav className="fixed hidden md:flex  top-0 w-full backdrop-blur-lg z-50  py-2 border-b-2 border-[var(--border-secondary)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center space-x-2 mt-2 mb-2">
                {/* <MuseumIcon fontSize="large" color=''/> */}
                <span className="text-2xl font-bold text-[var(--text-primary)]">Virtual</span>
                <img src={logo} alt="logo" className='w-14 h-10 md:w-28 md:h-16 max-w-full max-h-full'/>
                <span className="text-2xl font-bold text-[var(--text-primary)]">Museum</span>
              </Link>
              <div className="flex-1 flex justify-center space-x-8 text-[var(--text-primary)]">
                {/* <Images />  */}
                <NavLink 
                  to="/showcase" 
                  style={({ isActive }) => {return isActive ? { color: '--text-accent' } : {};}}  
                  className='text-[var(--text-primary)] text-xl'
                >
                  Daily Showcase
                </NavLink>
                
                {/* need to remove any remaining query strings from search in url    <ImageSearchIcon /> */}
                <NavLink 
                 to="/browse"  
                 style={({ isActive }) => {return isActive ? { color: '--text-accent' } : {};}}  
                 className='text-[var(--text-primary)] text-xl'
                 >
                  Search
                </NavLink>
              </div>

              {/* toggle switch */}
              <div className='mr-2 '>
                <ThemeToggle className=""/>
              </div>

              {/* user email and sign out */}
              {isAuthenticated ? (
              <div className="flex items-center space-x-4 text-[var(--text-primary)]">
                <NavLink to="/dashboard/home"  className='text-[var(--text-accent)] hover:text-[var(--accent-hover)] text-lg'><HomeIcon /></NavLink>
                <NavLink to="/dashboard/collections"  className='text-[var(--text-accent)] hover:text-[var(--accent-hover)] text-lg'><CollectionsIcon /></NavLink>
                <span className="text-md text-[var(--text-primary)]">
                  {user?.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-[var(--text-primary)] hover:text-[var(--accent-hover)] transition-colors"
                >
                <LogOut className="w-8 h-8 text-[var(--text-primary)] hover:text-[var(--accent-hover)]"/>
                <span className="text-md font-semibold text-[var(--text-primary)]  cursor-pointer hover:text-[var(--accent-hover)]">Sign Out</span>
                </button>
              </div>
              ) : (
                // Show when user is not logged in
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-1 text-[var(--text-primary)] hover:text-[var(--accent-hover)] transition-colors"
                >
                <User className="w-8 h-8 text-[var(--text-primary)]"/>
                <span className="text-lg text-[var(--text-primary)] cursor-pointer hover:text-[var(--accent-hover)]">Sign In</span>
                </button>
              )}
          </div>
        </div>


      </nav>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)}/>

        {/* mobile nav */}
        <div className='md:hidden'>
          <button
            onClick={() => setIsMobOpen(!isMobOpen)}
            className="p-2 text-[var(--text-primary)] "
            aria-label="Toggle menu"
          >
          {isMobOpen ? (
            <X className='w-5 h-5'/>
          ) : (
            <Menu className='w-5 h-5'/>
          )}
          </button>

          {/* overlay */}
          <div
          className={`fixed w-full top-0 right-0 z-50 h-screen bg-white  shadow-bg transform transition-transform ease-in-out duration-300 ${
            isMobOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          >
            <nav className='flex flex-col space-y-4 p-4 w-full'>
              <NavLink
                  to="/showcase" 
                  style={({ isActive }) => {return isActive ? { color: '--text-accent' } : {};}}  
                  className='text-[var(--text-primary)] text-xl'
                  >
                  Showcase
              </NavLink>
              <NavLink 
                 to="/browse"  
                 style={({ isActive }) => {return isActive ? { color: '--text-accent' } : {};}}  
                 className='text-[var(--text-primary)] text-xl'
                >
                Search
              </NavLink>
 {/* user email and sign out */}
              {isAuthenticated ? (
              <div className="flex flex-col space-y-2 text-[var(--text-primary)]">
                <NavLink to="/dashboard/home" className="flex items-center gap-2 text-[var(--text-accent)] hover:text-[var(--accent-hover)] text-lg">
                  <HomeIcon className="w-5 h-5" />
                  Dashboard
                </NavLink>
                <NavLink to="/dashboard/collections"  className='flex items-center gap-2 text-[var(--text-accent)] hover:text-[var(--accent-hover)] text-lg'><CollectionsIcon />Collections</NavLink>
                <span className="text-md text-[var(--text-primary)]">
                  {user?.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-[var(--text-primary)] hover:text-[var(--accent-hover)] transition-colors"
                >
                <LogOut className="w-8 h-8 text-[var(--text-primary)] hover:text-[var(--accent-hover)]"/>
                <span className="text-md font-semibold text-[var(--text-primary)]  cursor-pointer hover:text-[var(--accent-hover)]">Sign Out</span>
                </button>
              </div>
              ) : (
                // Show when user is not logged in
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-1 text-[var(--text-primary)] hover:text-[var(--accent-hover)] transition-colors"
                >
                <User className="w-8 h-8 text-[var(--text-primary)]"/>
                <span className="text-lg text-[var(--text-primary)] cursor-pointer hover:text-[var(--accent-hover)]">Sign In</span>
                </button>
              )}
              
              {/* toggle switch */}
              <div className='mr-2 '>
                <ThemeToggle className=""/>
              </div>
            </nav>
          </div>
        </div>
    </>
  )
}

export default Navigation;
