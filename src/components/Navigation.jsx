import { useState, useRef, useEffect} from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Images, User, LogOut, X, Menu, ChevronDown} from 'lucide-react';
import CollectionsIcon from '@mui/icons-material/Collections';
import HomeIcon from '@mui/icons-material/Home';
import MuseumOutlinedIcon from '@mui/icons-material/MuseumOutlined';
import HelpIcon from '@mui/icons-material/Help';
import  AuthModal  from './AuthModal';
import  useUserStore  from '../store/useUserStore';
import { toast } from 'react-hot-toast';
import { ThemeToggle } from './ThemeToggle';


const Navigation = () => {
  const { user, isAuthenticated, signOut } = useUserStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMobOpen, setIsMobOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);


  const handleSignOut = async () => {
    await signOut()
    toast.success('You have successfully signed out!') 
    // return to homepage
    navigate('/')
    setIsUserDropdownOpen(false);
  }

  const closeMobileNav = () => {
    setIsMobOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);


  return (
   <>
      <nav className="fixed hidden md:hidden lg:flex top-0 w-full backdrop-blur-lg z-50 py-2 border-b-2 border-[var(--border-secondary)]">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-10 w-full">
          
          <div className="flex items-center justify-between h-16 w-full">
            <div className='flex items-center flex-shrink-0'>
              {/* Logo */}
              <Link to="/" aria-label='Home page' className="flex items-center space-x-2 mt-2 mb-2">
                <MuseumOutlinedIcon  color='inherit'  style={{ color: '#d4af8c' }} sx={{ fontSize: 40 }} />
                <span className="md:text-2xl lg:text-3xl font-bold text-[var(--text-primary)]">MuseoNet</span>
                <span className="md:text-2xl lg:text-3xl font-bold text-[var(--text-primary)]">Virtual</span>
                <span className="md:text-2xl lg:text-3xl font-bold text-[var(--text-primary)]">Museum</span>
              </Link>
            </div>

            <div className='flex-1 flex justify-center '>
            <div className="flex items-center space-x-8 md:space-x-4 lg:space-x-12 text-[var(--text-primary)] lg:mr-30">
              <NavLink 
                to="/showcase" 
                className={({ isActive }) => 
                  `md:text-lg lg:text-xl transition-colors ${isActive 
                    ? 'text-[var(--text-accent)]' 
                    : 'text-[var(--text-primary)] hover:text-[var(--accent-hover)]'
                  }`
                }
              >
                Daily Showcase
              </NavLink>
              
              <NavLink 
                to="/browse"  
                className={({ isActive }) => 
                  `md:text-lg lg:text-xl transition-colors ${isActive 
                    ? 'text-[var(--text-accent)]' 
                    : 'text-[var(--text-primary)] hover:text-[var(--accent-hover)]'
                  }`
                }
              >
                Search
              </NavLink>
            </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link to={'/help'} aria-label='help'>
                <HelpIcon style={{ color: '#d4af8c' }} sx={{ fontSize: 40 }} className='cursor-pointer'/>
              </Link>
              

              <ThemeToggle />
              
              {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-2 text-[var(--text-primary)] hover:text-[var(--accent-hover)] transition-colors p-2 rounded-md"
                  >
                    <User className="w-6 h-6" />
                    <span className="text-md lg:text-md font-semibold cursor-pointer">{user ? ((user.user_metadata?.name ?? user.user_metadata?.full_name) || user.email) : ''}</span>
                    {/* <span className="text-md lg:text-md font-semibold cursor-pointer">{(user?.user_metadata?.name ?? user?.user_metadata?.full_name) || user?.email}</span> */}
                    <ChevronDown className={`w-4 h-4 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* User menuDropdown */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md shadow-lg py-1 z-50">
                      <NavLink 
                        to="/dashboard/home" 
                        className="flex items-center gap-2 px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <HomeIcon 
                        className="w-4 h-4" />
                        Dashboard
                      </NavLink>
                      <NavLink 
                        to="/dashboard/collections" 
                        className="flex items-center gap-2 px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <CollectionsIcon className="w-4 h-4" />
                        Collections
                      </NavLink>

                      
                      <hr className="my-1 border-[var(--border-secondary)]" />
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-2 text-[var(--text-primary)] hover:text-[var(--accent-hover)] transition-colors p-2 rounded-md cursor-pointer"
                >
                  <User className="w-6 h-6" />
                  <span className="text-lg">Sign In</span>
                </button>
              )}
              
            </div>

          </div>
          
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className="lg:hidden">
        <div className="fixed top-0 w-full  backdrop-blur-lg z-50 py-2 border-b-2 border-[var(--border-secondary)] bg-[var(--bg-primary)]/80">
          <div className="flex items-center justify-between px-4 h-16">
            <Link to="/" className="flex items-center space-x-1" onClick={closeMobileNav}>
              <MuseumOutlinedIcon  color='inherit'  style={{ color: '#d4af8c' }} sx={{ fontSize: 40 }} />
              <span className="text-lg font-bold text-[var(--text-primary)]">MuseoNet</span>
              <span className="text-lg font-bold text-[var(--text-primary)]">Virtual</span>
              <span className="text-lg font-bold text-[var(--text-primary)]">Museum</span>
            </Link>
            
            <button
              onClick={() => setIsMobOpen(!isMobOpen)}
              className="p-2 text-[var(--text-primary)] hover:text-[var(--accent-hover)] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobOpen ? <X  className='w-6 h-6'/> : <Menu className='w-6 h-6'/>}
            </button>
          </div>
        </div>

        {/* Mobile nav backdrop */}
        {isMobOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMobileNav}
          />
        )}

        {/* Mobile nav overlay */}
        <div
          className={`fixed top-0 right-0 z-50 h-full w-3/4 md:w-1/4 bg-[var(--bg-primary)] shadow-lg transform transition-transform ease-in-out duration-300 ${
            isMobOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <nav className='flex flex-col p-6 pt-20'>
            <NavLink
              to="/" 
              className={({ isActive }) => 
                `py-3 text-xl transition-colors ${isActive 
                  ? 'text-[var(--text-accent)]' 
                  : 'text-[var(--text-primary)] hover:text-[var(--accent-hover)]'
                }`
              }
              onClick={closeMobileNav}
            >
              Home
            </NavLink>
            
            <NavLink
              to="/showcase" 
              className={({ isActive }) => 
                `py-3 text-xl transition-colors ${isActive 
                  ? 'text-[var(--text-accent)]' 
                  : 'text-[var(--text-primary)] hover:text-[var(--accent-hover)]'
                }`
              }
              onClick={closeMobileNav}
            >
              Daily Showcase
            </NavLink>
            
            <NavLink 
              to="/browse"  
              className={({ isActive }) => 
                `py-3 text-xl transition-colors ${isActive 
                  ? 'text-[var(--text-accent)]' 
                  : 'text-[var(--text-primary)] hover:text-[var(--accent-hover)]'
                }`
              }
              onClick={closeMobileNav}
            >
              Search
            </NavLink>

            {isAuthenticated ? (
              <div className="flex flex-col space-y-3 mt-6 pt-6 border-t border-[var(--border-secondary)]">
                <div className="text-sm font-semibold text-[var(--text-secondary)] mb-2">
                  {user?.email}
                </div>
                
                <NavLink 
                  to="/dashboard/home" 
                  className="flex items-center gap-3 py-2 text-[var(--text-primary)] hover:text-[var(--accent-hover)] transition-colors"
                  onClick={closeMobileNav}
                >
                  <HomeIcon className="w-5 h-5" />
                  Dashboard
                </NavLink>
                
                <NavLink 
                  to="/dashboard/collections"  
                  className='flex items-center gap-3 py-2 text-[var(--text-primary)] hover:text-[var(--accent-hover)] transition-colors'
                  onClick={closeMobileNav}
                >
                  <CollectionsIcon className="w-5 h-5" />
                  Collections
                </NavLink>
                
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 py-2 text-[var(--text-primary)] hover:text-[var(--accent-hover)] transition-colors text-left"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowAuthModal(true);
                  closeMobileNav();
                }}
                className="flex items-center gap-3 py-3 mt-6 pt-6 border-t border-[var(--border-secondary)] text-[var(--text-primary)] hover:text-[var(--accent-hover)] transition-colors text-left"
              >
                <User className="w-5 h-5" />
                Sign In
              </button>
            )}

            <div className='mt-6 pt-6 border-t border-[var(--border-secondary)]'>
              <ThemeToggle />
           
              <Link to={'/help'} aria-label='help'>
                <HelpIcon style={{ color: '#d4af8c' }} sx={{ fontSize: 40 }} className='cursor-pointer ml-4'/>
              </Link>
            </div>
          </nav>
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)}/>
    </>
  )
}

export default Navigation;
