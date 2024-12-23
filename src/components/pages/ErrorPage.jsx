import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  const [grayScale, setGrayScale] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGrayScale((prevState) => !prevState);
    }, 600);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col gap-16 items-center justify-around py-28 h-screen text-center">
      <div className="flex flex-col gap-2 items-center justify-center">
        <img
          className={`w-[80vw] max-w-[320px] ${
            grayScale ? 'blur-[2px]' : 'grayscale'
          }`}
          src="https://cdn3d.iconscout.com/3d/premium/thumb/robot-error-404-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--robotic-issue-technology-pack-science-illustrations-8973149.png"
          alt="Page not found"
        />
        <h1 className="text-pink-400 font-bold text-4xl">Page Not Found</h1>
      </div>
      <button className="btn mid">
        <Link to="/">Back to Home</Link>
      </button>
    </div>
  );
}

export default ErrorPage;
