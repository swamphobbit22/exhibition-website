import { useState } from 'react';
import  useUserStore  from '../../store/useUserStore'
import UserFavourites from '../../components/UserFavourites';
import AddCollection from '../../components/AddCollection';
import UserCollectionsContent from '../../components/UserCollectionsContent'
import DeleteAccountButton from '../../components/DeleteAccountButton';

const UserHome = () => {
const { user, isAuthenticated} = useUserStore();
const [showFavourites, setShowfavourites] = useState(false);
const [showAddCollection, setShowAddCollection] = useState(false);
const [showCollections, setShowCollections] = useState(false);


  if (!isAuthenticated) return null;

  return (

    <section id="home" className='pt-28 pb-8 min-h-screen flex flex-col items-center bg-[var(--bg-primary)]'>
      <div className='mb-2 max-w-full'>
        <h2 className='md:text-2xl text-[var(--text-secondary)] italic text-center mb-4'>Hello {user?.email}</h2>
        <h3 className='text-3xl text-[var(--text-accent)] font-bold text-center mb-6'>Welcome to Your Dashboard</h3>
        <p className='mx-2 text-[var(--text-secondary)] text-center'>
          Here you can manage your account, 
          create and view your collections and change your settings
        </p>

        <hr className='bg-[var(--accent-secondary)] h-1 rounded-full w-4/8 mx-auto my-10'/>

        <div className='flex flex-col max-w-full md:flex-row gap-4 justify-center my-6'>
          {/* View collections */}
          <button
            onClick={() => setShowCollections(prev => !prev)}
            className='rounded-full  px-3 py-2 font-bold bg-[var(--accent-primary)] text-[var(--button-text)] hover:bg-[var(--accent-secondary)] cursor-pointer'
          >
            {showCollections? 'Hide Collections' : 'View Collections'} 
          </button>

          {/* Create a colleciton */}
          <button
            onClick={() => setShowAddCollection(prev => !prev)}
            className='rounded-full px-3 py-2 font-bold bg-[var(--accent-primary)] text-[var(--button-text)] hover:bg-[var(--accent-secondary)] cursor-pointer'
            >
            {showAddCollection? 'Hide Create Collection' : 'View Create Collection'} 
          </button>

          {/* Show/hide favouriets */}
          <button  
          onClick={() => setShowfavourites(prev => !prev)}
          className='rounded-full px-3 py-2 font-bold bg-[var(--accent-primary)] text-[var(--button-text)] hover:bg-[var(--accent-secondary)] cursor-pointer'
          >
          {showFavourites ? 'Hide Favourites' : 'View Favourites'}
          </button>
          
          {/* reset password */}
          {/* <button className='rounded-full px-3 py-2 font-bold bg-[var(--accent-primary)] text-[var(--button-text)] hover:bg-[var(--accent-secondary)] cursor-pointer'>
            Reset Password
          </button> */}

          {/* delete account */}
          <DeleteAccountButton />

        </div>
        <hr className='bg-[var(--accent-secondary)] h-1 rounded-full w-4/8 mx-auto my-10'/>
      </div>   

      {showAddCollection &&  
        <div className='relative flex max-w-full md:w-full md:max-w-md flex-col gap-4 rounded-lg border-2 border-[var(--border-accent)] bg-[var(--bg-primary)] p-6 mt-10'> 
        <AddCollection />    
        </div>
      }

      {showCollections && <UserCollectionsContent />}

      {showFavourites && <UserFavourites />}
    </section>  
  );
};

export default UserHome;


                  