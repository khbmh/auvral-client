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
  const { data, setMongoData, isDark } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const { id } = useParams(); // Get the artifact ID from the URL

  // Fetch artifact details based on id
  const artifact = data.find((item) => item._id === id);
  // console.log(artifact);
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
    // <div className="container mx-auto px-4 lg:w-[70vw] mb-16">
    //   <h1 className="text-3xl lg:text-5xl text-center font-bold my-8">
    //     Artifact Details
    //   </h1>
    //   <div className="card border shadow-xl">
    //     <figure>
    //       <img src={artifact.artifactImage} alt={artifact.artifactName} />
    //     </figure>
    //     <div className="card-body">
    //       <h2 className="text-3xl font-bold text-center">
    //         {artifact.artifactName}
    //       </h2>
    //       <p>
    //         <strong>Type:</strong> {artifact.artifactType}
    //       </p>
    //       <p>
    //         <strong>Historical Context:</strong> {artifact.historicalContext}
    //       </p>
    //       <p>
    //         <strong>Created At:</strong> {artifact.createdAt}
    //       </p>
    //       <p>
    //         <strong>Discovered At:</strong> {artifact.discoveredAt}
    //       </p>
    //       <p>
    //         <strong>Discovered By:</strong> {artifact.discoveredBy}
    //       </p>
    //       <p>
    //         <strong>Present Location:</strong> {artifact.presentLocation}
    //       </p>

    //       <div className="card-actions justify-center">
    //         {!isLiked ? (
    //           <button
    //             onClick={() => handleLike(artifact)}
    //             className="btn btn-success mid px-8 text-md mt-6 lg:text-lg"
    //           >
    //             Like Artifact
    //           </button>
    //         ) : (
    //           <button
    //             onClick={handleRemoveLike}
    //             className="btn btn-error mid px-8 text-md mt-6 lg:text-lg"
    //           >
    //             Remove Like
    //           </button>
    //         )}
    //       </div>
    //       <p className="text-center mt-4">
    //         <strong>Like Count:</strong> {likeCount}
    //       </p>
    //     </div>
    //     <Toaster />
    //   </div>
    // </div>

    <div className="max-w-4xl mx-auto px-4 lg:px-8 mb-16">
      <h1 className="text-3xl lg:text-4xl font-bold text-center my-12 tracking-tight">
        Artifact Details
      </h1>

      <div
        className={`card border-none rounded-xl shadow-sm overflow-hidden ${
          isDark ? 'border-green-600' : 'border-green-300'
        }`}
      >
        {/* Image Section */}
        <figure className="aspect-video overflow-hidden">
          <img
            src={artifact.artifactImage}
            alt={artifact.artifactName}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </figure>

        {/* Content Section */}
        <div className="p-6 lg:p-8 space-y-6">
          {/* Title */}
          <div className="border-b pb-4">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-center">
              {artifact.artifactName}
            </h2>
            <div className="flex justify-center mt-2">
              <span
                className={`text-xs py-1 px-3 rounded-full ${
                  isDark ? 'bg-green-600' : 'bg-green-300'
                } font-medium`}
              >
                {artifact.artifactType}
              </span>
            </div>
          </div>

          {/* Historical Context */}
          <div className="prose max-w-none">
            <p className="text-gray-600 dark:text-gray-300">
              {artifact.historicalContext}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start space-x-2">
              <span className="text-gray-500 dark:text-gray-400">⏳</span>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Created</p>
                <p>{artifact.createdAt}</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <span className="text-gray-500 dark:text-gray-400">🔍</span>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Discovered</p>
                <p>
                  {artifact.discoveredAt} by {artifact.discoveredBy}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <span className="text-gray-500 dark:text-gray-400">📍</span>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Location</p>
                <p>{artifact.presentLocation}</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <span className="text-gray-500 dark:text-gray-400">👤</span>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Uploaded by</p>
                <p>{artifact.uploaderName}</p>
              </div>
            </div>
          </div>

          {/* Like Section */}
          <div className="pt-4 border-t">
            <div className="flex flex-col items-center space-y-3">
              <div className="flex items-center space-x-2">
                {!isLiked ? (
                  <button
                    onClick={() => handleLike(artifact)}
                    className="btn btn-success btn-sm px-6 gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                    Like Artifact
                  </button>
                ) : (
                  <button
                    onClick={handleRemoveLike}
                    className="btn btn-error btn-sm px-6 gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                    Remove Like
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {likeCount} {likeCount === 1 ? 'person likes' : 'people like'}{' '}
                this artifact
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default SingleArt;
