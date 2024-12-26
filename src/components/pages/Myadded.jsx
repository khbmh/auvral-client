import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { DataContext } from '../contexts/DataContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'; // Ensure you are using react-router-dom

function MyAdded() {
  const { data, updateData, setMongoData } = useContext(DataContext);
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
        fetch(`http://localhost:4000/artifacts/${_id}`, {
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
  const filteredData = data.filter((artifact) => artifact.uploader === user.email);

  // If no artifacts are found
  if (!filteredData.length) {
    return (
      <div className="container mx-auto px-4 lg:w-[70vw] my-16">
        <h1 className="text-3xl lg:text-5xl text-center font-bold my-8">
          My Added Artifacts
        </h1>
        <div className="w-full h-[50vh] flex flex-col items-center justify-around">
          <img
            className="max-w-[300px] w-[50vw]"
            src="https://cdni.iconscout.com/illustration/premium/thumb/boy-explaining-about-no-data-folder-illustration-download-in-svg-png-gif-file-formats--empty-state-results-pack-miscellaneous-illustrations-8881971.png"
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
          <div key={artifact._id} className="card border shadow-xl">
            <figure>
              <img
                src={artifact.artifactImage}
                alt={artifact.artifactName}
                className="h-[200px] bg-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{artifact.artifactName}</h2>
              <p>
                <strong>Type:</strong> {artifact.artifactType}
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