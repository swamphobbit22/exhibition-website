import { useNavigate } from 'react-router-dom';
import UserCollectionsContent from "../../components/UserCollectionsContent";

const UserCollections = () => {

  const navigate = useNavigate();

  return (
    <section className='min-h-screen bg-[var(--bg-primary)] pb-10 pt-28'>
      <div className='justify-start'>
                <button 
                  onClick={() => navigate('/dashboard/home')}
                  className="mb-4 px-4 py-2 bg-[var(--accent-primary)] text-[var(--button-text)] hover:bg-[var(--accent-secondary)] rounded-full ml-10 cursor-pointer font-bold"
                >
                  Dashboard
                </button>
      </div>

        <UserCollectionsContent />
      </section>
  )
}

export default UserCollections;
