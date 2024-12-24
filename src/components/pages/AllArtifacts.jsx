import { useContext, useState } from 'react';
// import { DataContext } from '../contexts/DataContext';
import { Link } from 'react-router-dom'; 
import { DataContext } from '../contexts/DataContext';

function AllArtifacts() {
  const {data} = useContext(DataContext)
  const [searchQuery, setSearchQuery] = useState('');
  // console.log(data);
  // Filter artifacts based on the search query
  const filteredData = data.filter((artifact) =>
    artifact.artifactName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-[30vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:w-[70vw] mb-16">
      <h1 className="text-3xl lg:text-5xl text-center font-bold my-8">
        All Artifacts
      </h1>
      <div className="mb-8 flex items-center justify-between">
        <label
          htmlFor="search"
          className="block text-lg font-medium"
        >
          Search Artifacts
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search by artifact name"
          className="input input-bordered w-1/2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8">
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
              <h2 className="text-2xl font-bold">{artifact.artifactName}</h2>
              <p>
                <strong>Type:</strong> {artifact.artifactType}
              </p>
              <p>
                <strong>Created At:</strong> {artifact.createdAt}
              </p>
              <p>
                <strong>Discovered At:</strong> {artifact.discoveredAt}
              </p>
              <div className="card-actions justify-end">
                <Link
                  to={`/artifact/${artifact._id}`}
                  className="btn btn-success"
                >
                  See Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllArtifacts;
