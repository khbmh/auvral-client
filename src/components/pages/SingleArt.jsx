import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../contexts/DataContext';
import { useParams } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

function SingleArt() {
  const [likeCount, setLikeCount] = useState(0); // Initial like count state
  const [isLiked, setIsLiked] = useState(false); // Track if the artifact is liked
  const [likedArtifactId, setLikedArtifactId] = useState(null); // Track the likedArtifact _id
  const [refresh, setRefresh] = useState(false); // State to trigger re-render
  const { data, setMongoData } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const { id } = useParams(); // Get the artifact ID from the URL

  // Fetch artifact details based on id
  const artifact = data.find((item) => item._id === id);

  // Fetch like status and count
  useEffect(() => {
    if (artifact && user?.email) {
      fetch(
        `https://auvral-server.vercel.app/likedArtifacts/artId/${artifact._id}`,
      )
        .then((response) => response.json())
        .then((data) => {
          setLikeCount(data.length || 0); // Ensure like count is 0 if no likes
          // Check if the current user has already liked the artifact
          const userLike = data.find(
            (item) => item.likedByEmail === user.email,
          );
          if (userLike) {
            setIsLiked(true); // Set isLiked to true if the user has liked it
            setLikedArtifactId(userLike._id); // Set the likedArtifact _id
          } else {
            setIsLiked(false); // Set isLiked to false if the user hasn't liked it
            setLikedArtifactId(null); // Reset the likedArtifact _id
          }
        })
        .catch((error) => {
          console.error('Error fetching likes:', error);
          setLikeCount(0); // Set like count to 0 in case of an error
        });
    }
  }, [artifact, user?.email, refresh]); // Add refresh as a dependency

  const handleLike = (artifact) => {
    // Ensure the user is logged in before allowing them to like
    if (!user) {
      toast.error('Please log in to like this artifact');
      return;
    }

    // Optimistically update the like count
    setLikeCount((prevCount) => prevCount + 1); // Increment the like count locally
    setIsLiked(true); // Hide Like button and show Remove Like button

    const likedData = {
      ...artifact,
      artId: artifact._id, // Rename _id to artId
      likeCount: artifact.likeCount + 1, // Increment the like count
      likedByName: user.displayName,
      likedByEmail: user.email,
    };
    delete likedData._id;

    // Send the updated data to the server
    fetch('https://auvral-server.vercel.app/likedArtifacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(likedData),
    })
      .then((res) => res.json())
      .then((data) => {
        setMongoData(data); // Update the MongoDB data context
        toast.success('Artifact liked successfully');
        setLikedArtifactId(data._id); // Set the likedArtifact _id
        setRefresh((prev) => !prev); // Trigger re-render
      })
      .catch((error) => {
        // Revert the optimistic update in case of error
        setLikeCount((prevCount) => prevCount - 1);
        setIsLiked(false); // Re-enable the Like button
        toast.error('An error occurred while liking the artifact');
      });
  };

  // Handle removing a like
  const handleRemoveLike = () => {
    if (!likedArtifactId) {
      toast.error('No liked artifact ID found');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Optimistically update the like count
        setLikeCount((prevCount) => prevCount - 1); // Decrement the like count locally
        setIsLiked(false); // Hide Remove Like button and show Like button

        // Send the DELETE request to the server
        fetch(
          `https://auvral-server.vercel.app/likedArtifacts/${likedArtifactId}`,
          {
            method: 'DELETE',
          },
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: 'Removed!',
                text: 'Your like has been removed.',
                icon: 'success',
              });
              // Update the MongoDB data context
              setMongoData((prevData) =>
                prevData.filter((item) => item._id !== likedArtifactId),
              );
              setLikedArtifactId(null); // Reset the likedArtifact _id
              setRefresh((prev) => !prev); // Trigger re-render
            } else {
              Swal.fire({
                title: 'Error!',
                text: 'No documents were deleted.',
                icon: 'error',
              });
              // Revert the optimistic update if no documents were deleted
              setLikeCount((prevCount) => prevCount + 1);
              setIsLiked(true);
            }
          })
          .catch((error) => {
            console.error('Error removing like:', error);
            Swal.fire({
              title: 'Error!',
              text: 'An error occurred while removing the like.',
              icon: 'error',
            });
            // Revert the optimistic update in case of error
            setLikeCount((prevCount) => prevCount + 1);
            setIsLiked(true);
          });
      }
    });
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[30vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

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
            {!isLiked ? (
              <button
                onClick={() => handleLike(artifact)}
                className="btn btn-success mid px-8 text-md mt-6 lg:text-lg"
              >
                Like Artifact
              </button>
            ) : (
              <button
                onClick={handleRemoveLike}
                className="btn btn-error mid px-8 text-md mt-6 lg:text-lg"
              >
                Remove Like
              </button>
            )}
          </div>
          <p className="text-center mt-4">
            <strong>Like Count:</strong> {likeCount}
          </p>
        </div>
        <Toaster />
      </div>
    </div>
  );
}

export default SingleArt;
