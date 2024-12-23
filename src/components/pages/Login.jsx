import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userLogin, setUser, handleGoogleLogin } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    userLogin(email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setUser(user);
        toast.success('Logged in successfully');
        navigate(location?.state ? location.state : '/profile');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorCode, ' ', errorMessage);
        // ..
      });
  };
  return (
    <div className="flex flex-col my-8 items-center justify-center min-h-[70vh]">
      <div className="card border mid w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleLogin}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <Link
                to="/forgotPassword"
                className="label-text text-xs link link-hover"
              >
                Forgot password?
              </Link>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-success">Login</button>
          </div>
          <Link to="/register" className="text-sm">
            Do not have an account? <span className="">Register here</span>
          </Link>
        </form>
        <p className="text-center -mt-4 mb-4">Or</p>
        <div
          onClick={handleGoogleLogin}
          className="flex flex-col items-center justify-center mb-10 google w-fit mx-auto rounded-full"
        >
          <button className="w-full flex items-center justify-center py-2 px-6 rounded-full">
            login with Google
            <p className="ml-2" aria-label="Google Sign-in">
              <FcGoogle />
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
