import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { DataContext } from '../contexts/DataContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'; // Ensure you are using react-router-dom

function MyAdded() {
  const { data, updateData, setMongoData, isDark } = useContext(DataContext);
  const { user } = useContext(AuthContext);

  // Handle delete functionality
  const handleDelete = (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedData = data.filter((artifact) => artifact._id !== _id);
        updateData(updatedData);

        // Send DELETE request to the server
        fetch(`https://auvral-server.vercel.app/artifacts/${_id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            setMongoData(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your artifact has been deleted.',
                icon: 'success',
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete the artifact.',
              icon: 'error',
            });
          });
      }
    });
  };

  // Filter artifacts added by the logged-in user
  const filteredData = data.filter(
    (artifact) => artifact.uploader === user.email,
  );

  // If no artifacts are found
  if (!filteredData.length) {
    return (
      <div className="container mx-auto px-4 lg:w-[70vw] my-16">
        <h1 className="text-3xl lg:text-5xl text-center font-bold my-8">
          My Added Artifacts
        </h1>
        <div className="w-full h-[50vh] flex flex-col items-center justify-around">
          <img
            className="max-w-[300px] w-[50vw] grayscale"
            src="https://cdni.iconscout.com/illustration/premium/thumb/nothing-found-illustration-download-in-svg-png-gif-file-formats--empty-not-fount-search-limerror-pack-design-development-illustrations-2815869.png?f=webp"
            alt="no data"
          />
          <p>You have not added any artifacts yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:w-[70vw] mb-16">
      <h1 className="text-3xl lg:text-5xl text-center font-bold my-8">
        My Added Artifacts
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8 pb-8">
        {filteredData.map((artifact) => (
          // <div key={artifact._id} className="card border border-green-400">
          //   <figure>
          //     <img
          //       src={artifact.artifactImage}
          //       alt={artifact.artifactName}
          //       className="h-[200px] bg-cover"
          //     />
          //   </figure>
          //   <div className="card-body">
          //     <h2 className="card-title">{artifact.artifactName}</h2>
          //     <p>
          //       <strong>Type:</strong> {artifact.artifactType}
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
          //     <div className="card-actions flex justify-between items-center mt-4">
          //       <Link
          //         to={`/update/${artifact._id}`}
          //         className="btn btn-success btnnn"
          //       >
          //         Update
          //       </Link>
          //       <button
          //         onClick={() => {
          //           handleDelete(artifact._id);
          //         }}
          //         className="btn btn-warning btnn"
          //       >
          //         Delete
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

              <div className="card-actions flex justify-between items-center mt-4">
                <Link
                  to={`/update/${artifact._id}`}
                  className="btn btn-success btnnn"
                >
                  Update
                </Link>
                <button
                  onClick={() => {
                    handleDelete(artifact._id);
                  }}
                  className="btn btn-warning btnn"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAdded;
