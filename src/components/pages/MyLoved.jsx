import { useContext, useEffect, useState } from 'react';
// import { DataContext } from '../contexts/DataContext';
import { AuthContext } from '../contexts/AuthContext';
import Swal from 'sweetalert2';

function MyLoved() {
  const { user } = useContext(AuthContext);
  const [likedArtifacts, setLikedArtifacts] = useState([]);

  // Fetch liked artifacts by user email
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:4000/likedArtifacts/email/${user.email}`)
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
        fetch(`http://localhost:4000/likedArtifacts/${_id}`, {
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
            className="max-w-[300px] w-[50vw]"
            src="https://cdni.iconscout.com/illustration/premium/thumb/boy-explaining-about-no-data-folder-illustration-download-in-svg-png-gif-file-formats--empty-state-results-pack-miscellaneous-illustrations-8881971.png"
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
          <div key={artifact._id} className="card border shadow-xl">
            <figure>
              <img
                src={artifact.artifactImage}
                alt={artifact.artifactName}
                className="h-[200px] bg-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="text-2xl font-bold">{artifact.artifactName}</h2>
              <p>
                <strong>Type:</strong> {artifact.artifactType}
              </p>
              <p>
                <strong>Historical Context:</strong>{' '}
                {artifact.historicalContext}
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
              <div className="card-actions justify-end">
                <button
                  onClick={() => handleRemoveLike(artifact._id)}
                  className="btn btn-warning mid"
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