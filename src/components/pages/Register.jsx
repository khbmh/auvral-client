import { useContext } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
function Register() {
  const { logOut, handleGoogleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const { createNewUser, setUser, updateUserProfile } = useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password == email) {
      return toast.error('same same');
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.{6,})/;
    if (!passwordRegex.test(password)) {
      return toast.error(
        'Password must have at least 1 uppercase letter, 1 lowercase letter, and be at least 6 characters long',
      );
    }

    createNewUser(email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setUser(user);
        updateUserProfile({ displayName: name, photoURL: image });
        toast.success('Account has been created');
        logOut();
        navigate('/login');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorCode, ' ', errorMessage);
      });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] pb-16">

<h1 className="text-3xl lg:text-5xl text-center font-bold my-8">
        Register for Auvral!
      </h1>

      <div className="card mid w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleRegister}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="your name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image url</span>
            </label>
            <input
              type="text"
              name="image"
              placeholder="your name"
              className="input input-bordered"
              required
            />
          </div>
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
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-success">Register</button>
          </div>
          <Link to="/login" className="text-sm">
            Already have an account?{' '}
            <span className="">Login here</span>
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

export default Register;
