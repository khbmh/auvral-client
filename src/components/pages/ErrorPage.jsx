import { Link } from 'react-router-dom';
function ErrorPage() {
  return (
    <div className="flex flex-col gap-16 items-center justify-around py-28 h-screen text-center">
      <div className="flex flex-col gap-2 items-center justify-center">
        <img
          className="w-[80vw] max-w-[400px] grayscale"
          src="https://static-00.iconduck.com/assets.00/404-page-not-found-illustration-2048x998-yjzeuy4v.png"
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
