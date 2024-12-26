import { useContext, useState } from 'react';
import { DataContext } from '../contexts/DataContext';
import { useParams } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

function SingleArt() {
  const { data, setMongoData } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const { id } = useParams(); // Use 'id' instead of 'url'

  // Find the artifact by ID
  const artifact = data.find((item) => item._id === id); // Use strict equality (===)

  // State to manage the like button
  const [isLiked, setIsLiked] = useState(false);

  // Handle the "Like" functionality
  const handleLike = (artifact) => {
    // Ensure the user is logged in before allowing them to like
    if (!user) {
      toast.error('Please log in to like this artifact');
      return;
    }

    // Prepare the updated artifact data
    const likedData = {
      ...artifact,
      artId: artifact._id, // Rename _id to artId
      likeCount: artifact.likeCount + 1, // Increment the like count
      likedByName: user.displayName,
      likedByEmail: user.email,
    };
    delete likedData._id;

    // Send the updated data to the server
    fetch(`http://localhost:4000/likedArtifacts`, {
      method: 'POST', // Use POST to save the liked artifact
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(likedData),
    })
      .then((res) => res.json())
      .then((data) => {
        setMongoData(data);
        toast.success('Artifact liked successfully');
        setIsLiked(true); // Disable the button and change the text
      })
      .catch((error) => {
        toast.error('An error occurred while liking the artifact');
      });
  };

  // Loading state
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[30vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // If artifact is not found
  if (!artifact) {
    return (
      <div className="flex items-center justify-center h-[30vh]">
        <h1 className="text-3xl font-bold">Artifact Not Found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:w-[70vw] mb-16">
      <h1 className="text-3xl lg:text-5xl text-center font-bold my-8">
        Artifact Details
      </h1>
      <div className="card border shadow-xl">
        <figure>
          <img src={artifact.artifactImage} alt={artifact.artifactName} />
        </figure>
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center">
            {artifact.artifactName}
          </h2>
          <p>
            <strong>Type:</strong> {artifact.artifactType}
          </p>
          <p>
            <strong>Historical Context:</strong> {artifact.historicalContext}
          </p>
          <p>
            <strong>Created At:</strong> {artifact.createdAt}
          </p>
          <p>
            <strong>Discovered At:</strong> {artifact.discoveredAt}
          </p>
          <p>
            <strong>Discovered By:</strong> {artifact.discoveredBy}
          </p>
          <p>
            <strong>Present Location:</strong> {artifact.presentLocation}
          </p>
          <div className="card-actions justify-center">
            <button
              onClick={() => handleLike(artifact)}
              className={`btn ${isLiked ? 'btn-disabled' : 'btn-success'} mid px-8 text-md mt-6 lg:text-lg`}
              disabled={isLiked} // Disable the button after liking
            >
              {isLiked ? 'Liked' : 'Like Artifact'}
            </button>
          </div>
          <p className="text-center mt-4">
            <strong>Like Count:</strong> {artifact.likeCount}
          </p>
        </div>
        <Toaster />
      </div>
    </div>
  );
}

export default SingleArt;