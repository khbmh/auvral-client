import { useContext } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import { DataContext } from '../contexts/DataContext';
import toast, { Toaster } from 'react-hot-toast';

function UpdateArt() {
  const artifactData = useLoaderData(); // Fetch the artifact data using React Router's loader
  const { user } = useContext(AuthContext);
  const { handleIncrement, setMongoData } = useContext(DataContext);

  // Handle form submission for updating the artifact
  const handleUpdateArtifact = (e) => {
    e.preventDefault();
    const formData = {
      artifactName: e.target.artifactName.value,
      artifactImage: e.target.artifactImage.value,
      artifactType: e.target.artifactType.value,
      historicalContext: e.target.historicalContext.value,
      createdAt: e.target.createdAt.value,
      discoveredAt: e.target.discoveredAt.value,
      discoveredBy: e.target.discoveredBy.value,
      presentLocation: e.target.presentLocation.value,
      uploader: user.email,
      uploaderName: user.displayName,
      timestamp: new Date().toISOString(),
    };

    // Send the updated data to the server
    fetch(`https://auvral-server.vercel.app/artifacts/${artifactData._id}`, {
      method: 'PUT', // Use PUT to update the artifact
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setMongoData(data);
        if (data.modifiedCount > 0) {
          toast.success('Updated successfully');
        }
        handleIncrement();
      })
      .catch((error) => {
        toast.error('Error:', error);
      });
  };

  return (
    <div className="container mx-auto px-4 lg:w-[70vw] mt-8 mb-16">
      <h1 className="text-3xl lg:text-5xl text-center font-bold">
        Update Artifact Details
      </h1>

      <form className="card-body" onSubmit={handleUpdateArtifact}>
        <div className="lg:grid lg:grid-cols-2 space-y-3 lg:space-y-0 gap-y-3 gap-x-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Artifact Image</span>
            </label>
            <input
              type="text"
              placeholder="Enter image URL"
              name="artifactImage"
              defaultValue={artifactData.artifactImage}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Artifact Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter artifact name"
              name="artifactName"
              defaultValue={artifactData.artifactName}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Artifact Type</span>
            </label>
            <select
              name="artifactType"
              defaultValue={artifactData.artifactType}
              className="select select-bordered"
              required
            >
              <option disabled>Select artifact type</option>
              <option>Tools</option>
              <option>Weapons</option>
              <option>Documents</option>
              <option>Writings</option>
              <option>Monuments</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Historical Context</span>
            </label>
            <textarea
              placeholder="Enter historical context"
              name="historicalContext"
              defaultValue={artifactData.historicalContext}
              className="textarea textarea-bordered"
              required
            ></textarea>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Created At</span>
            </label>
            <input
              type="text"
              placeholder="Enter creation date (e.g., 100 BC)"
              name="createdAt"
              defaultValue={artifactData.createdAt}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Discovered At</span>
            </label>
            <input
              type="text"
              placeholder="Enter discovery date (e.g., 1799)"
              name="discoveredAt"
              defaultValue={artifactData.discoveredAt}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Discovered By</span>
            </label>
            <input
              type="text"
              placeholder="Enter discoverer's name"
              name="discoveredBy"
              defaultValue={artifactData.discoveredBy}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Present Location</span>
            </label>
            <input
              type="text"
              placeholder="Enter present location"
              name="presentLocation"
              defaultValue={artifactData.presentLocation}
              className="input input-bordered"
              required
            />
          </div>
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-success">Update Artifact</button>
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default UpdateArt;
