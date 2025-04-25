import { useContext, useEffect, useState } from 'react';
// import { DataContext } from '../contexts/DataContext';
import { AuthContext } from '../contexts/AuthContext';
import Swal from 'sweetalert2';
import { DataContext } from '../contexts/DataContext';

function MyLoved() {
  const { user } = useContext(AuthContext);
  const { isDark } = useContext(DataContext);
  const [likedArtifacts, setLikedArtifacts] = useState([]);

  // Fetch liked artifacts by user email
  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://auvral-server.vercel.app/likedArtifacts/email/${user.email}`,
      )
        .then((res) => res.json())
        .then((data) => setLikedArtifacts(data))
        .catch((error) =>
          console.error('Error fetching liked artifacts:', error),
        );
    }
  }, [user]);

  // Handle removing a like
  const handleRemoveLike = (_id) => {
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
        fetch(`https://auvral-server.vercel.app/likedArtifacts/${_id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: 'Removed!',
                text: 'Your like has been removed.',
                icon: 'success',
              });
              // Update the liked artifacts list
              setLikedArtifacts((prev) =>
                prev.filter((artifact) => artifact._id !== _id),
              );
            } else {
              Swal.fire({
                title: 'Error!',
                text: 'No documents were deleted.',
                icon: 'error',
              });
            }
          })
          .catch((error) => {
            console.error('Error removing like:', error);
            Swal.fire({
              title: 'Error!',
              text: 'An error occurred while removing the like.',
              icon: 'error',
            });
          });
      }
    });
  };

  // If no liked artifacts are found
  if (!likedArtifacts.length) {
    return (
      <div className="container mx-auto px-4 lg:w-[70vw] my-16">
        <h1 className="text-3xl lg:text-5xl text-center font-bold my-8">
          My Loved Artifacts
        </h1>
        <div className="w-full h-[50vh] flex flex-col items-center justify-around">
          <img
            className="max-w-[300px] w-[50vw] grayscale"
            src="https://cdni.iconscout.com/illustration/premium/thumb/nothing-found-illustration-download-in-svg-png-gif-file-formats--empty-not-fount-search-limerror-pack-design-development-illustrations-2815869.png?f=webp"
            alt="no data"
          />
          <p>You have not liked any artifacts yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:w-[70vw] mb-16">
      <h1 className="text-3xl lg:text-5xl text-center font-bold my-8">
        My Loved Artifacts
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8">
        {likedArtifacts.map((artifact) => (
          // <div key={artifact._id} className="card border border-green-400">
          //   <figure>
          //     <img
          //       src={artifact.artifactImage}
          //       alt={artifact.artifactName}
          //       className="h-[200px] bg-cover"
          //     />
          //   </figure>
          //   <div className="card-body">
          //     <h2 className="text-2xl font-bold">{artifact.artifactName}</h2>
          //     <p>
          //       <strong>Type:</strong> {artifact.artifactType}
          //     </p>
          //     <p>
          //       <strong>Historical Context:</strong>{' '}
          //       {artifact.historicalContext}
          //     </p>
          //     <p>
          //       <strong>Created At:</strong> {artifact.createdAt}
          //     </p>
          //     <p>
          //       <strong>Discovered At:</strong> {artifact.discoveredAt}
          //     </p>
          //     <p>
          //       <strong>Discovered By:</strong> {artifact.discoveredBy}
          //     </p>
          //     <p>
          //       <strong>Present Location:</strong> {artifact.presentLocation}
          //     </p>
          //     <div className="card-actions justify-end">
          //       <button
          //         onClick={() => handleRemoveLike(artifact._id)}
          //         className="btn btn-warning mid"
          //       >
          //         Remove Like
          //       </button>
          //     </div>
          //   </div>
          // </div>

          <div
            key={artifact._id}
            className={`card overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${
              isDark ? 'border-green-600' : 'border-green-300'
            } border-l-4`}
          >
            <figure className="relative h-48 overflow-hidden">
              <img
                src={artifact.artifactImage}
                alt={artifact.artifactName}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <h2 className="text-2xl font-bold text-white">
                  {artifact.artifactName}
                </h2>
              </div>
            </figure>

            <div className="p-4 space-y-3">
              <span
                className={`text-xs ${
                  isDark ? 'bg-green-600' : 'bg-green-300'
                } border-none px-2 py-1 rounded-full`}
              >
                {artifact.artifactType}
              </span>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Created</p>
                  <p>{artifact.createdAt}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Discovered</p>
                  <p>{artifact.discoveredAt}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">By</p>
                  <p>{artifact.discoveredBy}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Location</p>
                  <p>{artifact.presentLocation}</p>
                </div>
              </div>

              <p className="text-sm line-clamp-2 opacity-80">
                {artifact.historicalContext}
              </p>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => handleRemoveLike(artifact._id)}
                  className={`btn btn-sm border-none ${
                    isDark
                      ? 'bg-yellow-600 hover:bg-yellow-700'
                      : 'bg-yellow-500 hover:bg-yellow-600'
                  } text-white`}
                >
                  Remove Like
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyLoved;
