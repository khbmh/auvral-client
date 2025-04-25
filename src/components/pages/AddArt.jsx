import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { DataContext } from '../contexts/DataContext';

function AddArt() {
  const { user, isDark } = useContext(AuthContext);
  const { handleIncrement, setMongoData } = useContext(DataContext);

  const handleAddArtifact = (e) => {
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
      likeCount: 0, // Initial like count
    };
    console.log(formData);

    fetch('https://auvral-server.vercel.app/artifacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setMongoData(data);
        console.log(data);
        toast.success('Artifact added successfully');
        handleIncrement();
        e.target.reset();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="container mx-auto px-4 lg:w-[70vw] mt-8 mb-16">
      <h1 className="text-3xl lg:text-5xl text-center font-bold">
        Add Artifact Details
      </h1>

      <form className="card-body" onSubmit={handleAddArtifact}>
        <div className="lg:grid lg:grid-cols-2 space-y-3 lg:space-y-0 gap-y-3 gap-x-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Artifact Image</span>
            </label>
            <input
              type="text"
              placeholder="Enter image URL"
              name="artifactImage"
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
              className="select select-bordered"
              required
            >
              <option disabled selected>
                Select artifact type
              </option>
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
              className="input input-bordered"
              required
            />
          </div>
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-success">Add Artifact</button>
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default AddArt;
