import { useContext, useState } from 'react';
// import { DataContext } from '../contexts/DataContext';
import { Link } from 'react-router-dom';
import { DataContext } from '../contexts/DataContext';

function AllArtifacts() {
  const { data, isDark } = useContext(DataContext);
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
        <label htmlFor="search" className="block text-lg font-medium">
          Search Artifacts
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search by artifact name"
          className={`input ${
            isDark ? 'text-gray-100 bg-gray-950' : 'text-black bg-gray-100'
          } input-bordered w-1/2`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8">
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
          //     <h2 className="text-xl font-bold">{artifact.artifactName}</h2>
          //     <p className="opacity-60">
          //       {artifact.historicalContext.substring(0, 72)}...
          //     </p>
          //     <div className="card-actions justify-end">
          //       <Link
          //         to={`/artifact/${artifact._id}`}
          //         className="btn btn-success"
          //       >
          //         See Details
          //       </Link>
          //     </div>
          //   </div>
          // </div>

          <div
            key={artifact._id}
            className={`card group shadow-xl hover:shadow-2xl transition-shadow duration-300 border-l-2 ${
              isDark ? 'border-green-600' : 'border-green-300'
            } overflow-hidden`}
          >
            <figure className="relative h-48 overflow-hidden">
              <img
                src={artifact.artifactImage}
                alt={artifact.artifactName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h2 className="text-xl font-bold text-white">
                  {artifact.artifactName}
                </h2>
              </div>
            </figure>

            <div className="card-body p-5">
              <div className="flex items-center mb-2">
                <span
                  className={`text-xs py-1 px-3 rounded-full ${
                    isDark ? 'bg-green-600' : 'bg-green-300'
                  }  mr-2 border-none`}
                >
                  {artifact.artifactType}
                </span>
                <span className="text-xs">{artifact.createdAt}</span>
              </div>

              <p className="line-clamp-2 mb-4">{artifact.historicalContext}</p>

              <div className="card-actions">
                <Link
                  to={`/artifact/${artifact._id}`}
                  className="btn btn-success btn-sm w-full md:w-auto"
                >
                  Explore Artifact
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
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
