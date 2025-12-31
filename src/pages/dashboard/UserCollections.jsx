import { useNaviagte } from 'react-router-dom';
import UserCollectionsContent from "../../components/UserCollectionsContent";

const UserCollections = () => {

  const navigate = useNaviagte();

  return (
    <section className='min-h-screen bg-[var(--bg-primary)] pb-10 pt-28'>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="mb-4 px-4 py-2 bg-[var(--accent-primary)] text-[var(--button-text)] hover:bg-[var(--accent-secondary)] rounded-full ml-10 cursor-pointer"
                >
                  Dashboard
                </button>
        <UserCollectionsContent />
      </section>
  )
}

export default UserCollections;
