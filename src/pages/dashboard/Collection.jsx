import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
        <div className="pt-28 px-4">
            <div className="mb-6">
                <button 
                    onClick={() => navigate('/dashboard/collections')}
                    className="mb-4 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
                >
                    ← Back to Collections
                </button>
                
                <h1 className="text-3xl font-bold text-center">
                    {currentCollection?.name || 'Collection'}
                </h1>
                
                {currentCollectionArtworks.length > 0 && (
                    <p className="text-center text-gray-400 mt-2">
                        {currentCollectionArtworks.length} artwork{currentCollectionArtworks.length !== 1 ? 's' : ''}
                    </p>
                )}
            </div>
            <div >
            {collectionsLoading ? (
                <div className="text-center">Loading artworks...</div>
            ) : currentCollectionArtworks.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p>This collection is empty</p>
                    <button 
                        onClick={() => navigate('/browse')}
                        className="mt-4 px-6 py-2 bg-amber-500 text-white rounded hover:bg-amber-700"
                    >
                        Browse Artworks to Add
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10">
                    {currentCollectionArtworks.map((artwork) => (
                        <div key={artwork.id} className="bg-amber-400 rounded-lg shadow-md overflow-hidden border-2 border-amber-400">
                            
                            <img 
                                src={artwork.imageUrl} 
                                alt={artwork.title}
                                className="w-full h-72 object-cover"
                            />
                            
                            <div className="p-4">
                                <h3 className="font-semibold text-lg truncate text-gray-600">{artwork.title}</h3>
                                <p className="text-gray-600 truncate">{artwork.artist}</p>
                                <p className="text-sm text-gray-500">{artwork.repository}</p>
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