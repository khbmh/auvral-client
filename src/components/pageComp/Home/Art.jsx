import { useContext } from 'react';
import { Link } from 'react-router';
import { DataContext } from '../../contexts/DataContext';

function Art() {
  const { data } = useContext(DataContext);
  // console.log(data);
  // Filter artifacts based on the search query
  const filteredData = data.filter((artifact, i) => i < 3);

  return (
    <div className="container mx-auto flex flex-col justify-center items-center">
      <h1 className="text-3xl lg:text-5xl text-center font-bold my-8">
        Check out the Artifacts
      </h1>
      <div className="grid mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {filteredData.map((artifact) => (
          <div key={artifact._id} className="card border max-w-[300px] border-green-400">
            <figure>
              <img
                src={artifact.artifactImage}
                alt={artifact.artifactName}
                className="h-[200px] object-cover w-[300px]"
              />
            </figure>
            <div className="card-body">
              <h2 className="text-xl font-bold">{artifact.artifactName}</h2>
              <p className='opacity-60'>{artifact.historicalContext.substring(0, 67)}...</p>
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
      <Link to="/all-artifacts" className="btn btn-outline btn-success my-6">
        All Artifacts
      </Link>
    </div>
  );
}

export default Art;
