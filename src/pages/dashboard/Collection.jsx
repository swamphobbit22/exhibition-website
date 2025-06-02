import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import useCollectionStore from '../../store/useCollectionStore';
import useUserStore from '../../store/useUserStore';

const Collection = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useUserStore();
    const { 
        currentCollectionArtworks, 
        collectionsLoading, 
        fetchCollectionArtworks,
        collections 
    } = useCollectionStore();


    useEffect(() => {
        if (id) {
            fetchCollectionArtworks(id);
        }
    }, [id, fetchCollectionArtworks]);

    if (!isAuthenticated) {
        return <div>Please sign in to view collections</div>;
    }

    
    // Find the current collection info
    const currentCollection = collections.find(c => c.id === parseInt(id));

    return (
        <div className="min-h-screen pt-28 px-4 pb-10 bg-[var(--bg-primary)]">
            <div className="mb-6">
                <button 
                    onClick={() => navigate('/dashboard/collections')}
                    className="mb-4 px-4 py-2 bg-[var(--accent-primary)] text-[var(--button-text)] hover:bg-[var(--accent-secondary)] rounded-full ml-10"
                >
                    ← Back to Collections
                </button>
                
                <h1 className="text-3xl font-bold text-center text-[var(--text-primary)]">
                   <span className='font-medium text-[var(--text-secondary)]'>Collection:  </span> {currentCollection?.name || 'Collection'}
                </h1>
                
                {currentCollectionArtworks.length > 0 && (
                    <p className="text-center text-[var(--text-primary)] mt-2">
                        {currentCollectionArtworks.length} artwork{currentCollectionArtworks.length !== 1 ? 's' : ''}
                    </p>
                )}
            </div>
            <div >
            {collectionsLoading ? (
                <div className="text-center text-[var(--text-primary)]">Loading artworks...</div>
            ) : currentCollectionArtworks.length === 0 ? (
                <div className="text-center text-[var(--text-primary)]">
                    <p>This collection is empty</p>
                    <button 
                        onClick={() => navigate('/browse')}
                        className="mt-4 px-6 py-2 bg-[var(--accent-primary)] text-[var(--button-text)] rounded-full hover:bg-[var(--accent-secondary)]"
                    >
                        Browse Artworks to Add
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10">
                    {currentCollectionArtworks.map((artwork) => (
                        <div key={artwork.id} className="bg-[var(--bg-accent)] rounded-lg shadow-md overflow-hidden border-2 border-[var(--border-primary)]">
                            <Link to={`/detail/${artwork.id}?source=${artwork.source}&from=collections`}>
                            <img 
                                src={artwork.imageUrl} 
                                alt={artwork.title}
                                className="w-full h-72 object-cover transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 "
                            />
                            </Link>
                            <div className="p-4">
                                <h3 className="font-semibold text-lg truncate text-[var(--text-primary)]">{artwork.title}</h3>
                                <p className="text-[var(--text-primary)] truncate">{artwork.artist}</p>
                                <p className="text-sm italic text-[var(--text-primary)]">{artwork.repository}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>
    );
};

export default Collection;